export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  gradient: string; // fallback when no image
  image?: string;   // optional: path relative to /public
  year: string;
};

export const projects: Project[] = [
  {
    id: "moka-origins",
    title: "Moka Origins",
    category: "Brand Identity",
    description: "Visual identity and digital presence for a premium specialty coffee brand rooted in Ethiopian origin stories.",
    gradient: "linear-gradient(135deg, #48949e 0%, #2a5a62 100%)",
    image: "/moka-project.jpg",
    year: "2025",
  },
  {
    id: "hawkridge",
    title: "Hawkridge",
    category: "Web Design",
    description: "E-commerce and brand redesign for a heritage outdoor goods company.",
    gradient: "linear-gradient(135deg, #a54711 0%, #5c2a08 100%)",
    year: "2025",
  },
  {
    id: "forma",
    title: "Forma Studio",
    category: "Product Design",
    description: "SaaS dashboard design for a 3D modeling and collaboration platform.",
    gradient: "linear-gradient(135deg, #3a3a3a 0%, #181818 100%)",
    year: "2024",
  },
  {
    id: "saltline",
    title: "Saltline",
    category: "Brand Identity",
    description: "Packaging and launch campaign for an artisanal coastal food brand.",
    gradient: "linear-gradient(135deg, #c4864a 0%, #7a4c22 100%)",
    year: "2024",
  },
  {
    id: "vantage",
    title: "Vantage",
    category: "Web Design",
    description: "Marketing site and visual system for a growth-stage B2B analytics startup.",
    gradient: "linear-gradient(135deg, #5a7a7e 0%, #2d4a50 100%)",
    year: "2024",
  },
  {
    id: "cedarwood",
    title: "Cedarwood",
    category: "Design Direction",
    description: "Creative direction for a residential architecture firm's rebrand and web presence.",
    gradient: "linear-gradient(135deg, #8b7355 0%, #4a3920 100%)",
    year: "2023",
  },
];
