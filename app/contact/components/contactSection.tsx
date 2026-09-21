import ContactInfoCards from "./contactInfoCards";
import EnquiryPanel from "./enquiryPanel";


/**
 * Two-column layout: contact details on the left, enquiry form on the right.
 * The negative top margin lets the cards overlap the hero's lower edge.
 */
export default function ContactSection() {
  return (
    <section className="relative -mt-24 pb-20 sm:-mt-28 sm:pb-28">
      <div className="container-page relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
        <div className="space-y-5 lg:col-span-1">
          <ContactInfoCards />
        </div>
        <EnquiryPanel />
      </div>
    </section>
  );
}