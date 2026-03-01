const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const Image = require("@11ty/eleventy-img");
const path = require("path");
const fs = require("fs");
const sass = require("sass");

module.exports = function (eleventyConfig) {
  function normalizeBasePath(basePath = "/") {
    const withLeadingSlash = `/${String(basePath).replace(/^\/+|\/+$/g, "")}`;
    return withLeadingSlash === "/" ? "/" : withLeadingSlash;
  }

  const siteBasePath = normalizeBasePath(process.env.SITE_BASE_PATH || "/");

  function prefixRootUrl(url = "") {
    if (
      !url.startsWith("/") ||
      url.startsWith("//") ||
      siteBasePath === "/" ||
      url === siteBasePath ||
      url.startsWith(`${siteBasePath}/`)
    ) {
      return url;
    }

    return `${siteBasePath}${url}`.replace(/\/{2,}/g, "/");
  }

  // Shared helper to keep generated shortcode HTML safe.
  function escapeHtml(value = "") {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function sanitizeClassName(value = "") {
    return String(value).replace(/[^a-zA-Z0-9_\-\s]/g, "").trim();
  }

  function sanitizeTone(value = "info") {
    const allowedTones = new Set(["info", "tip", "warning"]);
    return allowedTones.has(value) ? value : "info";
  }

  function resolveImageInputPath(src = "") {
    const cleanSrc = String(src).split(/[?#]/)[0];
    const normalizedSrc = cleanSrc.replace(/^\/+/, "");

    const candidates = [
      path.join("src", normalizedSrc),
      normalizedSrc,
    ];

    if (normalizedSrc.startsWith("assets/demo-images/")) {
      candidates.push(path.join("demo-images", normalizedSrc.replace(/^assets\/demo-images\//, "")));
    }

    return candidates.find((candidate) => fs.existsSync(candidate));
  }

  // Plugins
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // Layout aliases
  eleventyConfig.addLayoutAlias("base", "layouts/base.njk");
  eleventyConfig.addLayoutAlias("page", "layouts/page.njk");
  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

  // Passthrough copy
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/fonts");
  eleventyConfig.addPassthroughCopy({ "demo-images": "assets/demo-images" });

  // Process SCSS files
  eleventyConfig.addTemplateFormats("scss");
  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css",
    compile: async function (inputContent, inputPath) {
      // Skip partials
      if (path.basename(inputPath).startsWith("_")) {
        return;
      }

      let result = sass.compileString(inputContent, {
        loadPaths: [path.dirname(inputPath)],
      });

      return async () => {
        return result.css;
      };
    },
  });

  // Collections
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md");
  });

  // ============================================
  // ADVANCED IMAGE OPTIMIZATION SHORTCODES
  // ============================================

  // Default image options for responsive images
  const defaultImageOptions = {
    widths: [400, 800, 1200, 1600],
    formats: ["avif"],
    outputDir: "_site/assets/images/optimized",
    urlPath: "/assets/images/optimized/",
    sharpOptions: {
      animated: true,
    },
    sharpAvifOptions: {
      quality: 75,
      effort: 4,
    },
  };

  function getImageProcessingOptions(overrides = {}) {
    const imageOptions = { ...defaultImageOptions };

    if (Array.isArray(overrides.widths) && overrides.widths.length > 0) {
      imageOptions.widths = overrides.widths;
    }

    if (Array.isArray(overrides.formats) && overrides.formats.length > 0) {
      imageOptions.formats = overrides.formats;
    }

    return imageOptions;
  }

  function buildHtmlAttributes(attributes = {}) {
    return Object.entries(attributes)
      .filter(([, value]) => value !== undefined && value !== null && value !== "")
      .map(([key, value]) => `${key}="${escapeHtml(String(value))}"`)
      .join(" ");
  }

  function renderFallbackImage(src, attributes = {}) {
    return `<img ${buildHtmlAttributes({ src, ...attributes })}>`;
  }

  function renderAvifPicture(metadata, fallbackSrc, attributes = {}) {
    const avifEntries = Array.isArray(metadata.avif) ? metadata.avif : [];
    if (avifEntries.length === 0) {
      return renderFallbackImage(fallbackSrc, attributes);
    }

    const sortedEntries = [...avifEntries].sort((a, b) => a.width - b.width);
    const srcset = sortedEntries
      .map((entry) => `${entry.url} ${entry.width}w`)
      .join(", ");
    const largestEntry = sortedEntries[sortedEntries.length - 1];

    const { sizes, ...imgAttributes } = attributes;
    const fallbackAttributes = {
      ...imgAttributes,
      src: fallbackSrc || largestEntry.url,
    };

    if (largestEntry.width && largestEntry.height) {
      fallbackAttributes.width = largestEntry.width;
      fallbackAttributes.height = largestEntry.height;
    }

    return `<picture><source type="image/avif" srcset="${escapeHtml(srcset)}" sizes="${escapeHtml(
      String(sizes || "100vw")
    )}"><img ${buildHtmlAttributes(fallbackAttributes)}></picture>`;
  }

  // Generic responsive image shortcode
  eleventyConfig.addNunjucksAsyncShortcode(
    "responsiveImage",
    async function (src, alt, sizes, options = {}) {
      if (!src) {
        console.warn("responsiveImage shortcode: src is required");
        return "";
      }

      const inputPath = resolveImageInputPath(src);
      const imageOptions = getImageProcessingOptions(options);

      // Check if file exists
      if (!inputPath) {
        console.warn(`Image not found: ${src}`);
        // Return fallback
        return renderFallbackImage(src, {
          alt: alt || "",
          loading: options.loading || "lazy",
          decoding: "async",
          class: options.class || "",
        });
      }

      try {
        let metadata = await Image(inputPath, imageOptions);

        let imageAttributes = {
          alt: alt || "",
          sizes: sizes || "100vw",
          loading: options.loading || "lazy",
          decoding: "async",
          class: options.class || "",
        };

        return renderAvifPicture(metadata, src, imageAttributes);
      } catch (error) {
        console.warn(`Error processing image ${src}:`, error.message);
        // Fallback to original image
        return renderFallbackImage(src, {
          alt: alt || "",
          loading: options.loading || "lazy",
          decoding: "async",
          class: options.class || "",
        });
      }
    }
  );

  // Portfolio gallery image shortcode - optimized for grid display
  eleventyConfig.addNunjucksAsyncShortcode(
    "galleryImage",
    async function (src, alt, index) {
      if (!src) return "";

      const inputPath = resolveImageInputPath(src);

      // Check if file exists
      if (!inputPath) {
        console.warn(`Gallery image not found: ${src}`);
        return renderFallbackImage(src, {
          alt: alt || "",
          loading: "lazy",
          decoding: "async",
          class: "gallery-image",
          "data-index": index || "",
        });
      }

      const galleryOptions = getImageProcessingOptions({
        widths: [400, 800, 1200, 1600],
      });

      try {
        let metadata = await Image(inputPath, galleryOptions);

        let imageAttributes = {
          alt: alt || "",
          sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
          loading: "lazy",
          decoding: "async",
          class: "gallery-image",
          "data-index": index || "",
        };

        return renderAvifPicture(metadata, src, imageAttributes);
      } catch (error) {
        console.warn(`Error processing gallery image ${src}:`, error.message);
        return renderFallbackImage(src, {
          alt: alt || "",
          loading: "lazy",
          decoding: "async",
          class: "gallery-image",
          "data-index": index || "",
        });
      }
    }
  );

  // Featured image shortcode for blog posts - eager loading for above-fold
  eleventyConfig.addNunjucksAsyncShortcode(
    "featuredImage",
    async function (src, alt) {
      if (!src) return "";

      const inputPath = resolveImageInputPath(src);

      // Check if file exists
      if (!inputPath) {
        console.warn(`Featured image not found: ${src}`);
        return renderFallbackImage(src, {
          alt: alt || "",
          loading: "eager",
          decoding: "async",
          class: "featured-image",
          fetchpriority: "high",
        });
      }

      const featuredOptions = getImageProcessingOptions({
        widths: [600, 1200, 1800, 2400],
      });

      try {
        let metadata = await Image(inputPath, featuredOptions);

        let imageAttributes = {
          alt: alt || "",
          sizes: "100vw",
          loading: "eager",
          decoding: "async",
          class: "featured-image",
          fetchpriority: "high",
        };

        return renderAvifPicture(metadata, src, imageAttributes);
      } catch (error) {
        console.warn(`Error processing featured image ${src}:`, error.message);
        return renderFallbackImage(src, {
          alt: alt || "",
          loading: "eager",
          decoding: "async",
          class: "featured-image",
          fetchpriority: "high",
        });
      }
    }
  );

  // Avatar/profile image shortcode
  eleventyConfig.addNunjucksAsyncShortcode(
    "avatarImage",
    async function (src, alt) {
      if (!src) return "";

      const inputPath = resolveImageInputPath(src);

      // Check if file exists
      if (!inputPath) {
        console.warn(`Avatar image not found: ${src}`);
        return renderFallbackImage(src, {
          alt: alt || "",
          loading: "lazy",
          decoding: "async",
          class: "avatar-image",
        });
      }

      const avatarOptions = getImageProcessingOptions({
        widths: [64, 128, 192, 256],
      });

      try {
        let metadata = await Image(inputPath, avatarOptions);

        let imageAttributes = {
          alt: alt || "",
          sizes: "128px",
          loading: "lazy",
          decoding: "async",
          class: "avatar-image",
        };

        return renderAvifPicture(metadata, src, imageAttributes);
      } catch (error) {
        console.warn(`Error processing avatar image ${src}:`, error.message);
        return renderFallbackImage(src, {
          alt: alt || "",
          loading: "lazy",
          decoding: "async",
          class: "avatar-image",
        });
      }
    }
  );

  // Lightbox image shortcode - generates high-res version for lightbox
  eleventyConfig.addNunjucksAsyncShortcode(
    "lightboxImage",
    async function (src, alt) {
      if (!src) return "";

      const inputPath = resolveImageInputPath(src);

      // Check if file exists
      if (!inputPath) {
        console.warn(`Lightbox image not found: ${src}`);
        return src;
      }

      const lightboxOptions = getImageProcessingOptions({
        widths: [800, 1200, 1600, 2400],
      });

      try {
        let metadata = await Image(inputPath, lightboxOptions);

        // Return the highest-res AVIF URL.
        const highRes = metadata.avif && metadata.avif[metadata.avif.length - 1];
        return highRes ? highRes.url : src;
      } catch (error) {
        console.warn(`Error processing lightbox image ${src}:`, error.message);
        return src;
      }
    }
  );

  // Legacy image shortcode for backward compatibility
  eleventyConfig.addNunjucksAsyncShortcode(
    "image",
    async function (src, alt, sizes, options = {}) {
      // Forward to responsiveImage
      const inputPath = resolveImageInputPath(src);
      const imageOptions = getImageProcessingOptions(options);

      if (!inputPath) {
        return renderFallbackImage(src, {
          alt: alt || "",
          loading: options.loading || "lazy",
          decoding: "async",
          class: options.class || "",
        });
      }

      try {
        let metadata = await Image(inputPath, imageOptions);

        let imageAttributes = {
          alt: alt || "",
          sizes: sizes || "100vw",
          loading: options.loading || "lazy",
          decoding: "async",
          class: options.class || "",
        };

        return renderAvifPicture(metadata, src, imageAttributes);
      } catch (error) {
        console.warn(`Error processing image ${src}:`, error.message);
        return renderFallbackImage(src, {
          alt: alt || "",
          loading: options.loading || "lazy",
          decoding: "async",
          class: options.class || "",
        });
      }
    }
  );

  // ============================================
  // STARTER SHORTCODES (Beginner Friendly)
  // ============================================

  // Render a consistent call-to-action button without repeating classes.
  eleventyConfig.addNunjucksShortcode(
    "uiButton",
    function (label, href = "#", variant = "primary", extraClass = "") {
      const safeLabel = escapeHtml(label || "Learn more");
      const safeHref = escapeHtml(href || "#");
      const variantClassMap = {
        primary: "btn-primary",
        outline: "btn-outline",
      };
      const variantClass = variantClassMap[variant] || variantClassMap.primary;
      const customClass = sanitizeClassName(extraClass);
      const className = ["btn", variantClass, customClass].filter(Boolean).join(" ");
      return `<a href="${safeHref}" class="${className}">${safeLabel}</a>`;
    }
  );

  // Render compact badges/tags.
  eleventyConfig.addNunjucksShortcode("uiBadge", function (label, extraClass = "") {
    const safeLabel = escapeHtml(label || "");
    const customClass = sanitizeClassName(extraClass);
    const className = ["ui-badge", customClass].filter(Boolean).join(" ");
    return `<span class="${className}">${safeLabel}</span>`;
  });

  // Render a reusable section heading block.
  eleventyConfig.addNunjucksShortcode(
    "uiSectionHeader",
    function (title, description = "", extraClass = "") {
      const safeTitle = escapeHtml(title || "");
      const safeDescription = description ? escapeHtml(description) : "";
      const customClass = sanitizeClassName(extraClass);
      const className = ["ui-section-header", customClass].filter(Boolean).join(" ");
      const descriptionHtml = safeDescription
        ? `<p class="ui-section-description">${safeDescription}</p>`
        : "";

      return `
        <div class="${className}">
          <h2 class="ui-section-title">${safeTitle}</h2>
          ${descriptionHtml}
        </div>
      `;
    }
  );

  // Render lightweight highlighted notes for guides/docs pages.
  eleventyConfig.addPairedNunjucksShortcode(
    "uiCallout",
    function (content, title = "Note", tone = "info") {
      const safeTitle = escapeHtml(title || "Note");
      const safeTone = sanitizeTone(tone);
      return `
        <aside class="ui-callout ui-callout-${safeTone}">
          <h3 class="ui-callout-title">${safeTitle}</h3>
          <div class="ui-callout-content">${content}</div>
        </aside>
      `;
    }
  );

  // Render a terminal-styled command snippet.
  eleventyConfig.addPairedNunjucksShortcode(
    "uiTerminal",
    function (content, title = "Terminal") {
      const safeTitle = escapeHtml(title || "Terminal");
      const safeContent = escapeHtml((content || "").trim());
      return `
        <div class="ui-terminal">
          <div class="ui-terminal-header">${safeTitle}</div>
          <pre class="ui-terminal-content"><code>${safeContent}</code></pre>
        </div>
      `;
    }
  );

  // ============================================
  // FILTERS
  // ============================================

  // Date filter
  eleventyConfig.addFilter("date", function (date, format) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  });

  // Reading time filter
  eleventyConfig.addFilter("readingTime", function (content) {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  });

  // Slice filter for arrays
  eleventyConfig.addFilter("slice", function (array, start, end) {
    return array.slice(start, end);
  });

  // Range function for loops
  eleventyConfig.addNunjucksGlobal("range", function (start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  });

  // Build time
  eleventyConfig.addGlobalData("site", {
    buildTime: new Date(),
    basePath: siteBasePath,
    isDev: process.env.ELEVENTY_RUN_MODE === "serve",
    isDemoBuild: process.env.DEMO_SITE === "true",
    github: {
      owner: "viarami",
      repository: "mujuryoku",
      pagesUrl: "https://viarami.github.io/Mujuryoku---11ty-Starter-Photographer-Kit",
    },
  });

  // Watch targets
  eleventyConfig.addWatchTarget("src/assets/css/");
  eleventyConfig.addWatchTarget("demo-images/");

  // Prefix root-relative URLs when deploying under a GitHub Pages project path.
  if (siteBasePath !== "/") {
    eleventyConfig.addTransform("prefix-root-urls", function (content, outputPath) {
      if (!outputPath || !outputPath.endsWith(".html")) {
        return content;
      }

      let transformed = content.replace(
        /\b(href|src|action|poster|content)=("|')([^"']+)\2/g,
        (match, attr, quote, value) => {
          if (!value.startsWith("/") || value.startsWith("//")) {
            return match;
          }

          return `${attr}=${quote}${prefixRootUrl(value)}${quote}`;
        }
      );

      transformed = transformed.replace(/\bsrcset=("|')([^"']+)\1/g, (match, quote, srcset) => {
        const updatedSrcset = srcset
          .split(",")
          .map((entry) => {
            const trimmed = entry.trim();
            if (!trimmed) return trimmed;

            const firstSpaceIndex = trimmed.indexOf(" ");
            const rawUrl = firstSpaceIndex === -1 ? trimmed : trimmed.slice(0, firstSpaceIndex);
            const descriptor = firstSpaceIndex === -1 ? "" : trimmed.slice(firstSpaceIndex);

            if (!rawUrl.startsWith("/") || rawUrl.startsWith("//")) {
              return trimmed;
            }

            return `${prefixRootUrl(rawUrl)}${descriptor}`;
          })
          .join(", ");

        return `srcset=${quote}${updatedSrcset}${quote}`;
      });

      transformed = transformed.replace(
        /url\((['"]?)(\/[^)'"]+)\1\)/g,
        (match, quote, value) => `url(${quote}${prefixRootUrl(value)}${quote})`
      );

      return transformed;
    });
  }

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_includes/layouts",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
