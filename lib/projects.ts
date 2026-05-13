export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  gradient: string;    // modal fallback when no images provided
  images?: string[];   // [0] is the grid thumbnail, all shown in modal
  url?: string;        // optional CTA link shown in modal
};

export const projects: Project[] = [
  {
    id: "moka-origins",
    title: "Moka Origins",
    category: "Brand Identity",
    description: "Placeholder description for Moka Origins.",
    gradient: "linear-gradient(135deg, #48949e 0%, #2a5a62 100%)",
    images: [
      "/sean-corey-design-moka-1.jpg",
      "/sean-corey-design-moka-2.jpg",
      "/sean-corey-design-moka-3.jpg",
      "/sean-corey-design-moka-4.jpg",
    ],
    url: "https://mokaorigins.com",
  },
  {
    id: "himalayan-institute",
    title: "Himalayan Institute",
    category: "Web Design",
    description: "Placeholder description for Himalayan Institute.",
    gradient: "linear-gradient(135deg, #3a3a3a 0%, #181818 100%)",
    images: [
      "/sean-corey-design-himalayan-1.png",
      "/sean-corey-design-himalayan-2.jpg",
      "/sean-corey-design-himalayan-3.jpg",
      "/sean-corey-design-himalayan-4.jpg",
    ],
  },
  {
    id: "vishoka-meditation",
    title: "Vishoka Meditation",
    category: "Brand Identity",
    description: "Placeholder description for Vishoka Meditation.",
    gradient: "linear-gradient(135deg, #c4864a 0%, #7a4c22 100%)",
    images: [
      "/sean-corey-design-vishoka-1.png",
      "/sean-corey-design-vishoka-2.jpg",
      "/sean-corey-design-vishoka-3.jpg",
      "/sean-corey-design-vishoka-4.jpg",
    ],
  },
  {
    id: "yoga-hive",
    title: "Yoga Hive",
    category: "Web Design",
    description: "Placeholder description for Yoga Hive.",
    gradient: "linear-gradient(135deg, #5a7a7e 0%, #2d4a50 100%)",
    images: [
      "/sean-corey-design-yoga-hive-1.png",
      "/sean-corey-design-yoga-hive-2.jpg",
      "/sean-corey-design-yoga-hive-3.jpg",
      "/sean-corey-design-yoga-hive-4.jpg",
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
  },
  {
    id: "vadavas-by-lex",
    title: "Vadavas by Lex",
    category: "Design Direction",
    description: "Placeholder description for Vadavas by Lex.",
    gradient: "linear-gradient(135deg, #8b7355 0%, #4a3920 100%)",
    images: [
      "/sean-corey-design-vadavas-1.png",
      "/sean-corey-design-vadavas-2.jpg",
      "/sean-corey-design-vadavas-3.jpg",
      "/sean-corey-design-vadavas-4.jpg",
    ],
  },
];
