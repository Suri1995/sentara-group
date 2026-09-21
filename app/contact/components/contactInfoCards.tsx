import { Mail, MapPin, Phone } from "lucide-react";
import { brand } from "@/lib/data";
import InfoCard from "./infoCard";

const cards = [
  {
    label: "Head Office",
    value: brand.addressHQ,
    Icon: MapPin,
    // Opens the address in Google Maps
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(brand.addressHQ)}`,
    external: true,
  },
  {
    label: "Call Us",
    value: brand.phone,
    Icon: Phone,
    href: `tel:${brand.phoneRaw}`,
  },
  {
    label: "Email Us",
    value: brand.email,
    Icon: Mail,
    href: `mailto:${brand.email}`,
  },
];

/** Renders the cards as siblings so the parent controls spacing. */
export default function ContactInfoCards() {
  return (
    <>
      {cards.map((card, i) => (
        <InfoCard key={card.label} {...card} delay={i * 100} />
      ))}
    </>
  );
}