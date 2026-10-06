import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// Set NEXT_PUBLIC_SITE_URL in .env.production (e.g. https://www.yourdomain.com)
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sentaragroup.com";
const siteName = "Sentara Group";
const tagline = "Where Land Meets Legacy";
const description =
  "Hyderabad-based real estate group delivering premium villas, healthcare and hospitality developments — Anvita Parkside, Landspace Elite and Arunjyothi Hospitals.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: `${siteName} | ${tagline}`,
    template: `%s | ${siteName}`,
  },
  description,
  keywords: [
    "Sentara Group",
    "Anvita Parkside",
    "Landspace Elite",
    "Arunjyothi Hospitals",
    "Rangu Rajendra Prasad",
    "Hyderabad real estate",
    "villas in Medchal",
    "premium villas Hyderabad",
  ],
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  category: "Real Estate",
  alternates: { canonical: "/" },
  formatDetection: { email: false, address: false, telephone: false },

  // Favicons: .ico for legacy browsers & Windows, PNGs for modern browsers,
  // apple-touch-icon for iOS/iPadOS/macOS Safari, manifest for Android/Chrome OS.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",

  // iOS "Add to Home Screen"
  appleWebApp: {
    capable: true,
    title: siteName,
    statusBarStyle: "default",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName,
    title: `${siteName} | ${tagline}`,
    description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${siteName} — ${tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | ${tagline}`,
    description,
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  // Uncomment and add your token after verifying in Google Search Console
  // verification: { google: "YOUR_GOOGLE_VERIFICATION_TOKEN" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff", // match your sand-50 hex if you want the browser UI tinted
  colorScheme: "light",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/android-chrome-512x512.png`,
  slogan: tagline,
  description,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    addressCountry: "IN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" className={`${jakarta.variable} bg-sand-50`}>
      <body className="flex min-h-screen flex-col bg-sand-50 font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}