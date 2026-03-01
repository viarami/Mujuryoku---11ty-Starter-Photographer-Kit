const fs = require("fs");
const path = require("path");

const DEMO_IMAGES_DIRECTORY = path.resolve(__dirname, "../../demo-images");
const REPOSITORY_URL = "https://github.com/viarami/mujuryoku";
const README_URL = `${REPOSITORY_URL}#readme`;
const DEMO_SOURCE_URL = `${REPOSITORY_URL}/tree/main/src/demo`;
const STARTER_PAGES_URL = `${REPOSITORY_URL}/tree/main/src/pages`;
const DATA_FILES_URL = `${REPOSITORY_URL}/tree/main/src/_data`;

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
    title: "Mujuryoku Demo Overview - 11ty Photographer Starter Kit",
    description:
      "Demo overview of a free, open-source 11ty photographer starter kit with six themes, starter pages, and modular demo files.",
    image: "/assets/images/demo-og-image.jpg",
  },
  hero: {
    logo: "Mujuryoku",
    tagline: "11ty Photographer Starter Kit",
    description:
      "A fast, themeable starter for portfolio websites. Use the overview below to inspect features, starter pages, and source structure.",
    badges: [
      "Open Source",
      "6 Themes",
      "Isolated /demo Route",
      "Responsive Layouts",
      "Fast Static Output",
    ],
    actions: [
      {
        label: "View Repository",
        href: REPOSITORY_URL,
        variant: "primary",
        className: "demo-action-primary",
      },
      {
        label: "Read Setup Guide",
        href: README_URL,
        variant: "outline",
        className: "demo-action-outline",
      },
      {
        label: "Open Portfolio Page",
        href: "/portfolio/",
        variant: "outline",
        className: "demo-action-outline",
      },
    ],
    jumpLinks: [
      { label: "Overview", href: "#overview" },
      { label: "Features", href: "#features" },
      { label: "Themes", href: "#themes" },
      { label: "Quick Start", href: "#quickstart" },
      { label: "Pages", href: "#pages" },
      { label: "Specs", href: "#specs" },
    ],
  },
  overview: [
    {
      value: "6",
      label: "Theme Variants",
      description: "Switch visual direction quickly without changing content files.",
    },
    {
      value: "7",
      label: "Starter Pages",
      description: "Core marketing and portfolio pages included out of the box.",
    },
    {
      value: "100%",
      label: "Static Output",
      description: "Eleventy generates fast, host-friendly static files.",
    },
    {
      value: "MIT",
      label: "License",
      description: "Commercial and personal use with permissive terms.",
    },
  ],
  intro: {
    title: "What This Demo Shows",
    paragraphs: [
      "The demo route is intentionally separate from starter pages so you can remove it without touching your production content.",
      "Content is data-driven from src/_data, page templates live in src/pages, and demo-only assets stay scoped to src/demo and demo-images.",
      "Theme previews, starter-page links, and technical notes below are designed as a quick onboarding checklist for new users.",
    ],
    badgeTitle: "Architecture",
    badgeText: "Demo and Starter are cleanly separated",
  },
  sections: {
    overview: {
      title: "Overview At a Glance",
      description: "Key project facts you usually need before cloning or customizing.",
    },
    features: {
      title: "Core Features",
      description: "Everything needed to launch and iterate on a photography starter site.",
    },
    themes: {
      title: "Theme Showcase",
      description: "Preview the six included visual directions.",
    },
    media: {
      title: "Demo Image Library",
      description:
        "Optional media from demo-images/ is automatically listed when files are present.",
    },
    structure: {
      title: "Project Structure",
      description: "Jump directly to the source folders used most during customization.",
    },
    quickStart: {
      title: "Quick Start",
      description: "From clone to local preview in a few steps.",
    },
    pages: {
      title: "Starter Pages",
      description: "Primary routes included in the starter site.",
    },
    specs: {
      title: "Technical Overview",
      description: "Stack details and implementation notes.",
    },
  },
  features: [
    {
      icon: "TH",
      iconClass: "demo-feature-icon-theme",
      title: "Theme Variants",
      description:
        "Six curated themes let you choose a strong base style before visual fine-tuning.",
    },
    {
      icon: "RS",
      iconClass: "demo-feature-icon-responsive",
      title: "Responsive Layout",
      description:
        "Mobile-first templates scale cleanly from phones to desktop screens.",
    },
    {
      icon: "PF",
      iconClass: "demo-feature-icon-performance",
      title: "Fast Output",
      description:
        "Static generation with Eleventy keeps pages lightweight and easy to host.",
    },
    {
      icon: "SEO",
      iconClass: "demo-feature-icon-seo",
      title: "SEO Ready",
      description:
        "Metadata structure and semantic markup are preconfigured for discoverability.",
    },
    {
      icon: "CMP",
      iconClass: "demo-feature-icon-components",
      title: "Reusable Components",
      description:
        "Nunjucks components reduce duplication and keep section updates predictable.",
    },
    {
      icon: "MD",
      iconClass: "demo-feature-icon-content",
      title: "Markdown Blog",
      description:
        "Create posts in Markdown and publish through the built-in blog listing.",
    },
  ],
  themes: [
    {
      name: "Swiss",
      slug: "swiss",
      description: "Grid-led typography for clean, modern portfolios.",
      previewClass: "demo-theme-swiss",
      previewLabel: "Grid",
    },
    {
      name: "Bauhaus",
      slug: "bauhaus",
      description: "Geometric composition with strong blocks and contrast.",
      previewClass: "demo-theme-bauhaus",
      previewLabel: "Shapes",
    },
    {
      name: "Dark Bold",
      slug: "dark-bold",
      description: "Dark, high-contrast presentation for dramatic visual work.",
      previewClass: "demo-theme-dark-bold",
      previewLabel: "Contrast",
    },
    {
      name: "Monochrome",
      slug: "monochrome",
      description: "Monochrome styling that keeps focus on image content.",
      previewClass: "demo-theme-monochrome",
      previewLabel: "Mono",
    },
    {
      name: "Newspaper",
      slug: "newspaper",
      description: "Editorial-inspired style referencing classic print layouts.",
      previewClass: "demo-theme-newspaper",
      previewLabel: "Editorial",
    },
    {
      name: "In Your Face",
      slug: "inyourface",
      description: "Energetic visuals for loud, high-impact branding.",
      previewClass: "demo-theme-inyourface",
      previewLabel: "Bold",
    },
  ],
  mediaGallery: buildMediaGallery(),
  projectStructure: [
    {
      title: "Demo Route Source",
      href: DEMO_SOURCE_URL,
      icon: "DM",
      description: "Templates for the isolated demo overview route.",
    },
    {
      title: "Starter Pages",
      href: STARTER_PAGES_URL,
      icon: "PG",
      description: "Production-ready page templates for site content.",
    },
    {
      title: "Data Files",
      href: DATA_FILES_URL,
      icon: "DT",
      description: "Centralized text/content settings and navigation data.",
    },
    {
      title: "README Guide",
      href: README_URL,
      icon: "RD",
      description: "Setup, deployment, and customization documentation.",
    },
  ],
  quickStart: {
    steps: [
      {
        title: "Clone Repository",
        description: "Copy the starter repository to your local machine.",
      },
      {
        title: "Install Dependencies",
        description: "Install required packages once with npm.",
      },
      {
        title: "Run Dev Server",
        description: "Start local development at localhost:8080.",
      },
      {
        title: "Customize Content",
        description:
          "Update metadata and content in src/_data, then adjust templates if needed.",
      },
      {
        title: "Build",
        description: "Generate static output for deployment.",
      },
    ],
    callout: {
      title: "Demo Isolation",
      paragraphs: [
        "Demo-only source lives in src/demo/, with demo data in src/_data/demo.js and demo styles in src/assets/css/demo.css.",
        "Starter pages remain in src/pages/, so removing or hosting the demo separately stays straightforward.",
      ],
    },
    commandBlock: [
      "# Clone repository",
      `git clone ${REPOSITORY_URL}.git`,
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
      title: "Demo Overview",
      href: "/demo/",
      icon: "DM",
      description: "Complete project overview, themes, and setup steps.",
    },
    {
      title: "Portfolio",
      href: "/portfolio/",
      icon: "PF",
      description: "Image gallery with categories and lightbox behavior.",
    },
    {
      title: "About",
      href: "/about/",
      icon: "AB",
      description: "Photographer story, profile, and experience.",
    },
    {
      title: "Services",
      href: "/services/",
      icon: "SV",
      description: "Service details and booking process overview.",
    },
    {
      title: "Pricing",
      href: "/pricing/",
      icon: "PR",
      description: "Package tiers and pricing comparison cards.",
    },
    {
      title: "Blog",
      href: "/blog/",
      icon: "BG",
      description: "Markdown-based posts with paginated listing.",
    },
    {
      title: "Contact",
      href: "/contact/",
      icon: "CT",
      description: "Contact details and starter Formspree integration.",
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
        { label: "Structured Data", value: "Included for /demo/" },
      ],
    },
    {
      title: "Project Notes",
      items: [
        { label: "License", value: "MIT" },
        { label: "Codebase", value: "Open Source" },
        { label: "Beginner Friendly", value: "Yes" },
        { label: "Demo Isolation", value: "Separate src/demo route" },
      ],
    },
  ],
  cta: {
    title: "Ready To Build Your Version?",
    description:
      "Use the starter as your base, then keep or remove the isolated demo route based on your project needs.",
    actions: [
      {
        label: "Use Repository",
        href: REPOSITORY_URL,
        variant: "primary",
      },
      {
        label: "Open Portfolio",
        href: "/portfolio/",
        variant: "outline",
      },
    ],
  },
};
