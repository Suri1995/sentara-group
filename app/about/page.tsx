import type { Metadata } from "next";
import CompanyHero from "./components/CompanyHero";
import CompanyStory from "./components/CompanyStory";
import CompanyValues from "./components/CompanyValues";
import LegacyPortfolio from "./components/LegacyPortfolio";
import CtaSection from "@/components/CtaSection";
import ChairmanSpotlight from "./components/ChairmanSpotlight";

export const metadata: Metadata = {
  title: "About — Sentara Group",
  description:
    "Sentara Group is a professionally managed group delivering premium residential, healthcare and hospitality developments across Hyderabad's high-growth corridors, led by Chairman & Managing Director Rangu Rajendra Prasad.",
};

export default function AboutPage() {
  return (
    <>
      <CompanyHero />
      <CompanyStory />
      <CompanyValues />
      <LegacyPortfolio />
      {/* <ChairmanSpotlight /> */}
      <CtaSection />
    </>
  );
}