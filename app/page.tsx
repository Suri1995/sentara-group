import CorporateOverview from "@/components/CorporateOverview";
import CtaSection from "@/components/CtaSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import FutureVentures from "@/components/FutureVentures";
import HeroSection from "@/components/HeroSection";
import OurTeamSection from "@/components/LeadershipSection";
import StatsBar from "@/components/StatsBar";
import { heroStats, projects, team, futureVentures, brand } from "@/lib/data";

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      <HeroSection tagline={brand.tagline} />
      <StatsBar stats={heroStats} />
      <CorporateOverview />
      <FeaturedProjects projects={projects} />
      <OurTeamSection members={team} />
      <FutureVentures ventures={futureVentures} />
      <CtaSection />
    </div>
  );
}