import { HeroGroup } from "@/components/sections/hero-group";
import { WorkGrid } from "@/components/sections/work-grid";
import { Services } from "@/components/sections/services";
import { Cta } from "@/components/sections/cta";

export default function Home() {
  return (
    <main>
      {/*
        HeroGroup contains:
          - Hero section (100vh)
          - Transition div (75vh, margin-top -8em, margin-bottom -11em)
        Both fade to 0 together, revealing the dark body beneath.
        The -11em margin-bottom on the transition div naturally pulls
        WorkGrid upward, creating the seamless overlap into the dark zone.
      */}
      <HeroGroup />
      <WorkGrid />
      <Services />
      <Cta />
    </main>
  );
}
