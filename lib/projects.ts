export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  gradient: string;    // grid card fallback when no images
  images?: string[];   // array — [0] is the grid thumbnail, all shown in modal
  url?: string;        // optional external link shown as CTA in the modal
  year: string;
};

export const projects: Project[] = [
  {
    id: "moka-origins",
    title: "Moka Origins",
    category: "Brand Identity",
    description: "Visual identity and digital presence for a premium specialty coffee brand rooted in Ethiopian origin stories.",
    gradient: "linear-gradient(135deg, #48949e 0%, #2a5a62 100%)",
    images: ["/movie-sample.mov", "/moka-project.jpg", "/moka-detail-1.jpg", "/moka-detail-2.jpg", "/moka-detail-3.jpg"],
    url: "https://mokaorigins.com",
    year: "2025",
  },
  {
    id: "hi-online",
    title: "H.I. Online",
    category: "Web Design",
    description: "E-commerce and brand redesign for a heritage outdoor goods company.",
    gradient: "linear-gradient(135deg, #a54711 0%, #5c2a08 100%)",
    images: ["/hi-online-transparent.png"],
    year: "2025",
  },
  {
    id: "himalayan-institute",
    title: "Himalayan Institute",
    category: "Product Design",
    description: "SaaS dashboard design for a 3D modeling and collaboration platform.",
    gradient: "linear-gradient(135deg, #3a3a3a 0%, #181818 100%)",
    images: ["/himalayan-transparent.png"],
    year: "2024",
  },
  {
    id: "vishoka-meditation",
    title: "Vishoka Meditation",
    category: "Brand Identity",
    description: "Packaging and launch campaign for an artisanal coastal food brand.",
    gradient: "linear-gradient(135deg, #c4864a 0%, #7a4c22 100%)",
    images: ["/vishoka-transparent.png"],
    year: "2024",
  },
  {
    id: "yoga-dorri",
    title: "Yoga Dorri",
    category: "Web Design",
    description: "Marketing site and visual system for a growth-stage B2B analytics startup.",
    gradient: "linear-gradient(135deg, #5a7a7e 0%, #2d4a50 100%)",
    images: ["/yoga-dorri-transparent.png"],
    year: "2024",
  },
  {
    id: "vadavas-by-lex",
    title: "Vadavas by Lex",
    category: "Design Direction",
    description: "Creative direction for a residential architecture firm's rebrand and web presence.",
    gradient: "linear-gradient(135deg, #8b7355 0%, #4a3920 100%)",
    images: ["/vadavas-transparent.png"],
    year: "2023",
  },
];
