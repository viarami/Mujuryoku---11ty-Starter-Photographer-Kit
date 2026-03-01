module.exports = {
  hero: {
    title: "Photography Services",
    description:
      "Professional photography solutions tailored to capture your unique story. From intimate portraits to grand celebrations, I deliver exceptional imagery that exceeds expectations.",
    badges: ["Portrait", "Events", "Commercial", "Weddings", "Retouching"],
  },
  items: [
    {
      imageLabel: "Portrait Photography",
      image: "/assets/images/service-portrait.jpg",
      title: "Portrait Photography",
      description:
        "Professional portrait photography that captures personality, emotion, and character. Whether you need corporate headshots, family portraits, or creative individual portraits, I create images that tell your story.",
      included: [
        "Professional lighting setup",
        "Multiple outfit changes",
        "Pose guidance and direction",
        "Natural and posed shots",
        "Retouching and color correction",
        "Online gallery with download access",
      ],
      perfectFor: [
        "Corporate headshots and LinkedIn profiles",
        "Family portraits and reunions",
        "Senior portraits",
        "Actor/Model comp cards",
        "Creative/artistic portraits",
      ],
      actions: [
        { label: "View Pricing", href: "/pricing/#portrait-sessions", variant: "primary" },
        { label: "Book Session", href: "/contact/", variant: "outline" },
      ],
    },
    {
      imageLabel: "Event Photography",
      image: "/assets/images/service-event.jpg",
      title: "Event Photography",
      description:
        "Comprehensive event photography coverage for corporate events, parties, conferences, and special occasions. I capture the energy, emotions, and key moments that make your event memorable.",
      included: [
        "Flexible coverage hours",
        "Candid and posed photography",
        "Keynote and presentation coverage",
        "Guest interactions and networking",
        "Group and team photos",
        "Fast turnaround for quick delivery",
      ],
      perfectFor: [
        "Corporate conferences and seminars",
        "Product launches",
        "Galas and charity events",
        "Birthday parties",
        "Reunions and celebrations",
      ],
      actions: [
        { label: "View Pricing", href: "/pricing/#event-photography", variant: "primary" },
        { label: "Book Event", href: "/contact/", variant: "outline" },
      ],
      reverse: true,
      muted: true,
    },
    {
      imageLabel: "Commercial Photography",
      image: "/assets/images/service-commercial.jpg",
      title: "Commercial Photography",
      description:
        "High-impact commercial and product photography that elevates your brand. From e-commerce product shots to lifestyle campaigns, I deliver images that drive engagement and conversions.",
      included: [
        "Professional studio or on-location",
        "White background and lifestyle setups",
        "Advanced retouching and compositing",
        "Multiple angles and variations",
        "Web and print optimization",
        "Commercial usage rights",
      ],
      perfectFor: [
        "E-commerce product photography",
        "Brand photography and campaigns",
        "Food and restaurant photography",
        "Real estate and architecture",
        "Corporate branding and marketing",
      ],
      actions: [
        { label: "View Pricing", href: "/pricing/#commercial-product", variant: "primary" },
        { label: "Get Quote", href: "/contact/", variant: "outline" },
      ],
    },
    {
      imageLabel: "Wedding Photography",
      image: "/assets/images/service-wedding.jpg",
      title: "Wedding Photography",
      description:
        "Beautiful wedding photography that captures every precious moment of your special day. From the quiet anticipation of getting ready to the joyful celebration at reception, I document your love story with artistry and sensitivity.",
      included: [
        "Full-day or partial day coverage",
        "Second photographer option",
        "Getting ready and ceremony coverage",
        "Family formals and group shots",
        "Couple's portrait session",
        "Reception coverage and dancing",
        "Professional wedding album",
      ],
      perfectFor: [
        "Full-day wedding coverage",
        "Elopements and intimate ceremonies",
        "Destination weddings",
        "Same-day edits and preview",
        "Engagement sessions included",
      ],
      actions: [
        { label: "View Pricing", href: "/pricing/#wedding-packages", variant: "primary" },
        { label: "Inquire Now", href: "/contact/", variant: "outline" },
      ],
      reverse: true,
      muted: true,
    },
    {
      imageLabel: "Photo Editing & Retouching",
      image: "/assets/images/service-fineart.jpg",
      title: "Photo Editing & Retouching",
      description:
        "Professional photo editing and retouching services to enhance your existing photos. Whether you need batch processing for event photos or detailed retouching for portraits, I deliver polished results.",
      included: [
        "Color correction and grading",
        "Exposure and contrast adjustments",
        "Skin retouching (portraits)",
        "Background removal and replacement",
        "Object removal and manipulation",
        "Batch processing for events",
      ],
      perfectFor: [
        "Event photo enhancement",
        "Portrait retouching",
        "Product photo optimization",
        "Old photo restoration",
        "Archive photo enhancement",
      ],
      actions: [
        { label: "Request Quote", href: "/contact/", variant: "primary" },
      ],
    },
  ],
  process: {
    title: "My Process",
    steps: [
      {
        title: "Consultation",
        description:
          "We discuss your vision, requirements, and preferences to create a personalized plan for your shoot.",
      },
      {
        title: "Preparation",
        description:
          "Location scouting, equipment preparation, and detailed planning to ensure a smooth session.",
      },
      {
        title: "The Shoot",
        description:
          "A comfortable, relaxed session where I capture authentic moments while guiding you through poses.",
      },
      {
        title: "Delivery",
        description:
          "Professional editing and curation, with your images delivered through a beautiful online gallery.",
      },
    ],
  },
  cta: {
    title: "Ready to Work Together?",
    description:
      "Let's discuss your photography needs and create something beautiful. I'm here to help bring your vision to life.",
    actions: [
      { label: "Get in Touch", href: "/contact/", variant: "primary" },
      { label: "View Pricing", href: "/pricing/", variant: "outline" },
    ],
  },
};
