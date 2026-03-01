function joinUrl(base, path) {
  const normalizedBase = String(base || "").replace(/\/$/, "");
  const normalizedPath = String(path || "").replace(/^\//, "");
  return `${normalizedBase}/${normalizedPath}`;
}

function escapeAttr(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

module.exports = {
  title: "Demo",
  layout: "base.njk",
  permalink: "/demo/",
  eleventyExcludeFromCollections: true,
  showHeader: false,
  showFooter: false,
  includeTestimonialsScript: false,
  bodyClass: "demo-page",
  extraCss: ["/assets/css/demo.css"],
  eleventyComputed: {
    description: (data) => data.demo.seo.description,
    extraHead: (data) => {
      const pageUrl = joinUrl(data.metadata.url, "demo/");
      const imageUrl = joinUrl(data.metadata.url, data.demo.seo.image);
      const seoTitle = escapeAttr(data.demo.seo.title);
      const seoDescription = escapeAttr(data.demo.seo.description);

      const schemaData = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: data.metadata.title,
        alternateName: "Mujuryoku 11ty Starter Kit",
        description: data.demo.seo.description,
        url: pageUrl,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Web",
        author: {
          "@type": "Person",
          name: data.metadata.author,
        },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        softwareVersion: "1.0.0",
      };

      return [
        `<link rel=\"canonical\" href=\"${escapeAttr(pageUrl)}\">`,
        `<meta property=\"og:title\" content=\"${seoTitle}\">`,
        `<meta property=\"og:description\" content=\"${seoDescription}\">`,
        `<meta property=\"og:type\" content=\"website\">`,
        `<meta property=\"og:url\" content=\"${escapeAttr(pageUrl)}\">`,
        `<meta property=\"og:image\" content=\"${escapeAttr(imageUrl)}\">`,
        `<meta name=\"twitter:card\" content=\"summary_large_image\">`,
        `<meta name=\"twitter:title\" content=\"${seoTitle}\">`,
        `<meta name=\"twitter:description\" content=\"${seoDescription}\">`,
        `<meta name=\"twitter:image\" content=\"${escapeAttr(imageUrl)}\">`,
        `<script type=\"application/ld+json\">${JSON.stringify(schemaData)}</script>`,
      ].join("\n");
    },
  },
};
