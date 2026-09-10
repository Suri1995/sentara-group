import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Sentara Group | Where Land Meets Legacy",
    template: "%s | Sentara Group",
  },
  description:
    "Sentara Group is a Hyderabad-based real estate and infrastructure group delivering premium residential, healthcare and hospitality developments — including Anvita Parkside Villas, Landspace Elite and Arunjyothi Hospitals.",
  keywords: [
    "Sentara Group",
    "Anvita Parkside",
    "Landspace Elite",
    "Rangu Rajendra Prasad",
    "Hyderabad real estate",
    "villas Medchal",
    "premium villas Hyderabad",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} bg-sand-50`}>
      <body className="flex min-h-screen flex-col bg-sand-50 font-sans antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
