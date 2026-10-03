"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { brand } from "@/lib/data";
import InfoCard from "./infoCard";

const cards = [
  {
    label: "Head Office",
    value: brand.addressHQ,
    Icon: MapPin,
    hint: "Open in Google Maps",
    // Opens the address in Google Maps
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(brand.addressHQ)}`,
    external: true,
    copyable: true,
  },
  {
    label: "Call Us",
    value: brand.phone,
    Icon: Phone,
    hint: "Tap to call our sales team",
    href: `tel:${brand.phoneRaw}`,
    copyable: true,
  },
  {
    label: "Email Us",
    value: brand.email,
    Icon: Mail,
    hint: "We reply within 24 hours",
    href: `mailto:${brand.email}`,
    copyable: true,
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