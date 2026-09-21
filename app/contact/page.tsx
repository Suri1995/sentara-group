import type { Metadata } from "next";
import ContactHero from "./components/contactHero";
import ContactSection from "./components/contactSection";

// Next.js requires this export to live in page.tsx
export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Sentara Group for project enquiries, site visits and investment opportunities across Hyderabad.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactSection />
    </>
  );
}