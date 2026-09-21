import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

export default function EnquiryPanel() {
  return (
    <Reveal
      delay={100}
      className="relative overflow-hidden card-premium p-8 sm:p-12 lg:col-span-2"
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-green-500 via-navy-500 to-navy-900"
      />
      {/* Same glow as the hero, dimmed so it never competes with the form */}
      <div
        aria-hidden
        className="luxury-gradient pointer-events-none absolute inset-0 opacity-40"
      />

      <div className="relative">
        <SectionHeading
          title="Send Us an Enquiry"
          description="Fill in your details and our sales team will get back to you within 24 hours."
        />
        <div className="mt-10">
          <ContactForm />
        </div>
      </div>
    </Reveal>
  );
}