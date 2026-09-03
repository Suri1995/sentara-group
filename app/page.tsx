
import CorporateOverview from "@/components/CorporateOverview";
import CtaSection from "@/components/CtaSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import FutureVentures from "@/components/FutureVentures";
import HeroSection from "@/components/HeroSection";
import LeadershipSection from "@/components/LeadershipSection";
import StatsBar from "@/components/StatsBar";
import { heroStats, projects, chairman, futureVentures, brand } from "@/lib/data";

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      <HeroSection tagline={brand.tagline} />
      <StatsBar stats={heroStats} />
      <CorporateOverview />
      <FeaturedProjects projects={projects} />
      <LeadershipSection chairman={chairman} />
      <FutureVentures ventures={futureVentures} />
      <CtaSection />
    </div>
  );
}