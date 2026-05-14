import { Hero } from "@/components/sections/Hero";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { ServicesStrip } from "@/components/sections/ServicesStrip";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { ContactCTA } from "@/components/sections/ContactCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <ServicesStrip />
      <FeaturedProjects />
      <TechMarquee />
      <ContactCTA />
    </>
  );
}
