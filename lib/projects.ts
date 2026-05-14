export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  gradient: string;
  images?: string[];
  url?: string;
  services?: string[];
  caseStudy?: { heading?: string; text: string }[];
};

export const projects: Project[] = [
  {
    id: "moka-origins",
    title: "Moka Origins",
    category: "Brand Identity",
    description: "A full ecommerce overhaul for a specialty coffee brand. Built for speed, clarity, and a team that can actually use it.",
    gradient: "linear-gradient(135deg, #48949e 0%, #2a5a62 100%)",
    images: [
      "/sean-corey-design-moka-1.jpg",
      "/sean-corey-design-moka-2.jpg",
      "/sean-corey-design-moka-3.jpg",
      "/sean-corey-design-moka-4.jpg",
    ],
    url: "https://mokaorigins.com",
    services: ["Ecommerce", "UI Design", "Web Development", "Consulting", "Infrastructure"],
    caseStudy: [
      {
        heading: "The Challenge",
        text: "Moka Origins had outgrown their existing Shopify infrastructure. A code-heavy setup was limiting the team's ability to make updates independently and keeping the site from performing at the level the brand deserved.",
      },
      {
        heading: "The Approach",
        text: "I planned and designed the full site architecture, migrating to a modern theme with fast load times, an AJAX cart, and robust search. The bigger shift was moving from a code-based build to a visual page builder... giving their team real ownership over the site without needing a developer for every change.",
      },
      {
        heading: "Ongoing Support",
        text: "Eight-plus years in, the relationship continues. Campaign launches, page builds, and strategic technology consulting as the business evolves.",
      },
    ],
  },
  {
    id: "himalayan-institute",
    title: "Himalayan Institute",
    category: "Web Design",
    description: "Nine years of embedded partnership with one of North America's most respected yoga and wellness institutions. Strategy, design, and infrastructure at scale.",
    gradient: "linear-gradient(135deg, #3a3a3a 0%, #181818 100%)",
    images: [
      "/sean-corey-design-himalayan-1.jpg",
      "/sean-corey-design-himalayan-2.jpg",
      "/sean-corey-design-himalayan-3.jpg",
      "/sean-corey-design-himalayan-4.jpg",
    ],
    services: [
      "Web Design",
      "UX Strategy",
      "Platform Development",
      "Email Marketing",
      "Analytics",
      "Infrastructure",
      "Documentation",
    ],
    caseStudy: [
      {
        heading: "The Challenge",
        text: "Himalayan Institute needed more than a vendor. With multiple web properties, a growing online learning platform, and an organization-wide need for design consistency, they needed someone who could think and operate at a systems level.",
      },
      {
        heading: "The Approach",
        text: "Over five years of full-time embedded work, I led web design strategy across all of their digital properties. That included a full redesign of their main website, humanitarian site, online shop, and HI Online — their online learning platform.",
      },
      {
        heading: undefined,
        text: "HI Online was a significant build. I was part of the core team that architected, planned, designed, and developed the platform from the ground up. Beyond the platform itself, the work included email marketing templates, analytics configuration, conversion tracking, and a full restructure of site navigation across properties.",
      },
      {
        heading: undefined,
        text: "On the infrastructure side, I helped plan and execute a migration of 1,000+ posts between systems and led the move of all properties to a new web server. I also wrote internal documentation and helped standardize design and development workflows across the organization.",
      },
      {
        heading: "Ongoing",
        text: "Nine years in, the relationship continues. The work has evolved from full-time embedded leadership to focused strategic support as HI Online and their broader digital presence continues to grow.",
      },
    ],
  },
  {
    id: "sean-corey-yoga",
    title: "Sean Corey Yoga",
    category: "Brand Identity",
    description: "Placeholder description for Sean Corey Yoga.",
    gradient: "linear-gradient(135deg, #7a8a6e 0%, #3a4a2e 100%)",
    images: [
      "/sean-corey-design-sean-corey-yoga-1.jpg",
      "/sean-corey-design-sean-corey-yoga-2.jpg",
      "/sean-corey-design-sean-corey-yoga-3.jpg",
      "/sean-corey-design-sean-corey-yoga-4.jpg",
    ],
    services: ["Brand Identity", "Web Design"],
  },
  {
    id: "vishoka-meditation",
    title: "Vishoka Meditation",
    category: "Brand Identity",
    description: "Placeholder description for Vishoka Meditation.",
    gradient: "linear-gradient(135deg, #c4864a 0%, #7a4c22 100%)",
    images: [
      "/sean-corey-design-vishoka-1.jpg",
      "/sean-corey-design-vishoka-2.jpg",
      "/sean-corey-design-vishoka-3.jpg",
      "/sean-corey-design-vishoka-4.jpg",
    ],
    services: ["Brand Identity", "Packaging", "Web Design"],
  },
  {
    id: "sage-wisdom-wellness",
    title: "Sage Wisdom & Wellness",
    category: "Web Design",
    description: "Placeholder description for Sage Wisdom & Wellness.",
    gradient: "linear-gradient(135deg, #7a9a8a 0%, #3a5a4a 100%)",
    images: [
      "/sean-corey-design-sage-wisdom-1.jpg",
      "/sean-corey-design-sage-wisdom-2.jpg",
      "/sean-corey-design-sage-wisdom-3.jpg",
      "/sean-corey-design-sage-wisdom-4.jpg",
    ],
    services: ["Web Design", "Brand Identity"],
  },
  {
    id: "vadavas-by-lex",
    title: "Vadavas by Lex",
    category: "Design Direction",
    description: "Placeholder description for Vadavas by Lex.",
    gradient: "linear-gradient(135deg, #8b7355 0%, #4a3920 100%)",
    images: [
      "/sean-corey-design-vadavas-1.jpg",
      "/sean-corey-design-vadavas-2.jpg",
      "/sean-corey-design-vadavas-3.jpg",
      "/sean-corey-design-vadavas-4.jpg",
    ],
    services: ["Design Direction", "Brand Identity"],
  },
  {
    id: "yoga-dorri",
    title: "Yoga Dorri",
    category: "Web Design",
    description: "Placeholder description for Yoga Dorri.",
    gradient: "linear-gradient(135deg, #a09070 0%, #5a4a30 100%)",
    images: [
      "/sean-corey-design-yoga-dorri-1.jpg",
      "/sean-corey-design-yoga-dorri-2.jpg",
      "/sean-corey-design-yoga-dorri-3.jpg",
      "/sean-corey-design-yoga-dorri-4.jpg",
    ],
    services: ["Web Design", "Brand Identity"],
  },
  {
    id: "smokin-joes",
    title: "Smokin' Joes",
    category: "Web Design",
    description: "Placeholder description for Smokin' Joes.",
    gradient: "linear-gradient(135deg, #8b3a1a 0%, #3a1a08 100%)",
    images: [
      "/sean-corey-design-smokin-joes-1.jpg",
      "/sean-corey-design-smokin-joes-2.jpg",
      "/sean-corey-design-smokin-joes-3.jpg",
      "/sean-corey-design-smokin-joes-4.jpg",
    ],
    services: ["Web Design", "UI Design"],
  },
  {
    id: "yoga-hive",
    title: "Yoga Hive",
    category: "Web Design",
    description: "Placeholder description for Yoga Hive.",
    gradient: "linear-gradient(135deg, #5a7a7e 0%, #2d4a50 100%)",
    images: [
      "/sean-corey-design-yoga-hive-1.jpg",
      "/sean-corey-design-yoga-hive-2.jpg",
      "/sean-corey-design-yoga-hive-3.jpg",
      "/sean-corey-design-yoga-hive-4.jpg",
    ],
    services: ["Web Design", "UX Design"],
  },
];
