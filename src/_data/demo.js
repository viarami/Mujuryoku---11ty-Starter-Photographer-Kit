const fs = require("fs");
const path = require("path");

const DEMO_IMAGES_DIRECTORY = path.resolve(__dirname, "../../demo-images");

function toTitleCase(value) {
  return String(value)
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function inferCategory(fileName) {
  if (fileName.startsWith("portrait-")) return "Portrait";
  if (fileName.startsWith("event-")) return "Event";
  if (fileName.startsWith("wedding-")) return "Wedding";
  if (fileName.startsWith("blog-")) return "Blog";
  return "Demo";
}

function buildMediaGallery() {
  if (!fs.existsSync(DEMO_IMAGES_DIRECTORY)) {
    return [];
  }

  return fs
    .readdirSync(DEMO_IMAGES_DIRECTORY)
    .filter((fileName) => /\.(jpg|jpeg|png|webp|avif)$/i.test(fileName))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
    .map((fileName) => {
      const nameWithoutExtension = fileName.replace(/\.[^.]+$/, "");
      const readableName = toTitleCase(nameWithoutExtension.replace(/[-_]+/g, " "));

      return {
        src: `/assets/demo-images/${fileName}`,
        alt: `${readableName} demo image`,
        category: inferCategory(nameWithoutExtension),
      };
    });
}

module.exports = {
  seo: {
    title: "Mujuryoku - 11ty Photographer Starter Demo",
    description:
      "A free, open-source 11ty photography starter kit with six themes, starter pages, and an isolated demo experience.",
    image: "/assets/images/demo-og-image.jpg",
  },
  hero: {
    logo: "Mujuryoku",
    tagline: "Zero Gravity for your photography website setup.",
    description:
      "A free, open-source 11ty starter kit for photographers. Launch quickly, then customize with reusable components.",
    badges: [
      "6 Themes",
      "Fast Static Site",
      "Responsive",
      "Easy To Customize",
      "Open Source",
    ],
    actions: [
      {
        label: "View on GitHub",
        href: "https://github.com/viarami/mujuryoku",
        variant: "primary",
        className: "demo-action-primary",
      },
      {
        label: "View Starter Pages",
        href: "/portfolio/",
        variant: "outline",
        className: "demo-action-outline",
      },
    ],
  },
  intro: {
    title: "What is Mujuryoku?",
    paragraphs: [
      "Mujuryoku means Zero Gravity. It is designed to remove setup friction so you can focus on publishing your portfolio.",
      "The starter is built with Eleventy (11ty), Nunjucks templates, and plain CSS for easy onboarding.",
      "Demo-only templates, styles, and image assets are separated from starter pages so you can keep or remove the demo route cleanly.",
    ],
    badgeTitle: "Zero Gravity",
    badgeText: "Lightweight and Fast",
  },
  sections: {
    features: {
      title: "Features",
      description: "Everything needed for a complete photography starter site.",
    },
    themes: {
      title: "Theme Showcase",
      description: "Switch between six visual styles to match your brand.",
    },
    media: {
      title: "Demo Image Library",
      description:
        "Additional portrait, wedding, and event images integrated for demo presentation.",
    },
    quickStart: {
      title: "Quick Start",
      description: "From clone to publish in a few steps.",
    },
    pages: {
      title: "Starter Pages",
      description: "Prebuilt pages included in the kit.",
    },
    specs: {
      title: "Technical Overview",
      description: "Core stack and capabilities.",
    },
  },
  features: [
    {
      icon: "TH",
      iconClass: "demo-feature-icon-theme",
      title: "Theme Variants",
      description:
        "Six curated themes out of the box so you can start with a style close to your target look.",
    },
    {
      icon: "RS",
      iconClass: "demo-feature-icon-responsive",
      title: "Responsive Layout",
      description:
        "Layouts are mobile-first and optimized for desktop, tablet, and phone screens.",
    },
    {
      icon: "PF",
      iconClass: "demo-feature-icon-performance",
      title: "Fast Output",
      description:
        "Static generation with 11ty keeps pages lightweight and quick to load.",
    },
    {
      icon: "SEO",
      iconClass: "demo-feature-icon-seo",
      title: "SEO Ready",
      description:
        "Starter includes metadata structure and semantic HTML for better discoverability.",
    },
    {
      icon: "CMP",
      iconClass: "demo-feature-icon-components",
      title: "Reusable Components",
      description:
        "Page sections are easier to maintain with componentized Nunjucks templates.",
    },
    {
      icon: "MD",
      iconClass: "demo-feature-icon-content",
      title: "Markdown Blog",
      description:
        "Write posts in Markdown and publish automatically in the blog section.",
    },
  ],
  themes: [
    {
      name: "Swiss",
      slug: "swiss",
      description: "Clean, grid-driven typography for minimal and modern portfolios.",
      previewClass: "demo-theme-swiss",
      previewLabel: "Grid",
    },
    {
      name: "Bauhaus",
      slug: "bauhaus",
      description: "Geometric shapes, contrast, and strong compositional blocks.",
      previewClass: "demo-theme-bauhaus",
      previewLabel: "Shapes",
    },
    {
      name: "Dark Bold",
      slug: "dark-bold",
      description: "High-contrast dark presentation for dramatic visual work.",
      previewClass: "demo-theme-dark-bold",
      previewLabel: "Contrast",
    },
    {
      name: "Monochrome",
      slug: "monochrome",
      description: "Black and white aesthetics focused on imagery first.",
      previewClass: "demo-theme-monochrome",
      previewLabel: "Mono",
    },
    {
      name: "Newspaper",
      slug: "newspaper",
      description: "Editorial style inspired by classic print layouts.",
      previewClass: "demo-theme-newspaper",
      previewLabel: "Editorial",
    },
    {
      name: "In Your Face",
      slug: "inyourface",
      description: "Energetic, loud visuals for bold branding choices.",
      previewClass: "demo-theme-inyourface",
      previewLabel: "Bold",
    },
  ],
  mediaGallery: buildMediaGallery(),
  quickStart: {
    steps: [
      {
        title: "Clone Repository",
        description: "Clone this starter kit to your local machine.",
      },
      {
        title: "Install Dependencies",
        description: "Run npm install once to fetch dependencies.",
      },
      {
        title: "Run Dev Server",
        description: "Start local development with npm run dev.",
      },
      {
        title: "Customize Content",
        description:
          "Edit content files in src/_data and pages in src/pages with minimal template changes.",
      },
      {
        title: "Build",
        description: "Generate static output with npm run build.",
      },
    ],
    commandBlock: [
      "# Clone repository",
      "git clone https://github.com/viarami/mujuryoku.git",
      "",
      "# Enter project",
      "cd mujuryoku",
      "",
      "# Install dependencies",
      "npm install",
      "",
      "# Start development",
      "npm run dev",
      "",
      "# Production build",
      "npm run build",
    ].join("\n"),
  },
  samplePages: [
    {
      title: "Home",
      href: "/",
      icon: "HM",
      description: "Hero, featured work, services, and CTA.",
    },
    {
      title: "Portfolio",
      href: "/portfolio/",
      icon: "PF",
      description: "Filterable project gallery with lightbox.",
    },
    {
      title: "About",
      href: "/about/",
      icon: "AB",
      description: "Photographer bio and expertise sections.",
    },
    {
      title: "Services",
      href: "/services/",
      icon: "SV",
      description: "Detailed service offerings and process.",
    },
    {
      title: "Pricing",
      href: "/pricing/",
      icon: "PR",
      description: "Package cards and transparent pricing.",
    },
    {
      title: "Blog",
      href: "/blog/",
      icon: "BG",
      description: "Markdown posts with paginated listing.",
    },
    {
      title: "Contact",
      href: "/contact/",
      icon: "CT",
      description: "Contact details plus Formspree form.",
    },
  ],
  specs: [
    {
      title: "Stack",
      items: [
        { label: "Static Site Generator", value: "Eleventy (11ty)" },
        { label: "Template Engine", value: "Nunjucks" },
        { label: "Styling", value: "Plain CSS" },
        { label: "JavaScript", value: "Vanilla JS" },
      ],
    },
    {
      title: "Capabilities",
      items: [
        { label: "Themes", value: "6 Included" },
        { label: "Pages", value: "Home, Portfolio, About, Services, Pricing, Blog, Contact" },
        { label: "Blog", value: "Markdown Posts" },
        { label: "Deploy", value: "GitHub Pages Ready" },
      ],
    },
    {
      title: "Quality",
      items: [
        { label: "Responsive", value: "Yes" },
        { label: "SEO Meta", value: "Yes" },
        { label: "Open Graph", value: "Yes" },
        { label: "Structured Data", value: "Yes" },
      ],
    },
    {
      title: "License",
      items: [
        { label: "License", value: "MIT" },
        { label: "Codebase", value: "Open Source" },
        { label: "Beginner Friendly", value: "Yes" },
        { label: "Componentized Demo", value: "Yes" },
      ],
    },
  ],
  cta: {
    title: "Ready To Start Building?",
    description:
      "Use this starter as your base, then remove or keep the isolated demo route as needed.",
    actions: [
      {
        label: "Get Started",
        href: "https://github.com/viarami/mujuryoku",
        variant: "primary",
      },
      {
        label: "Browse Portfolio Demo",
        href: "/portfolio/",
        variant: "outline",
      },
    ],
  },
};
