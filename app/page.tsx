import { Hero } from "@/components/sections/hero";
import { WorkGrid } from "@/components/sections/work-grid";
import { Services } from "@/components/sections/services";
import { Philosophy } from "@/components/sections/philosophy";
import { Cta } from "@/components/sections/cta";

export default function Home() {
  return (
    <main>
      <Hero />
      <WorkGrid />
      <Services />
      <Philosophy />
      <Cta />
    </main>
  );
}
