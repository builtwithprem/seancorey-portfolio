import { Hero } from "@/components/sections/hero";
import { WorkGrid } from "@/components/sections/work-grid";
import { Services } from "@/components/sections/services";
import { Cta } from "@/components/sections/cta";

export default function Home() {
  return (
    <main>
      <Hero />
      <WorkGrid />
      <Services />
      <Cta />
    </main>
  );
}
