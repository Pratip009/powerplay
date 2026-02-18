import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://turfpowerplay.in"), 

  title: {
    default: "PowerPlay Turf | Premium Multi-Sport Turf Facility",
    template: "%s | PowerPlay Turf",
  },

  description:
    "PowerPlay Turf is a premium multi-sport facility offering world-class football and cricket turfs, professional floodlit courts, academy training, and tournament-ready surfaces.",

  keywords: [
    "PowerPlay Turf",
    "Football Turf",
    "Cricket Turf",
    "Multi-Sport Facility",
    "Turf Near Me",
    "5-a-side Football",
    "Box Cricket",
    "Floodlit Turf",
    "Sports Arena",
  ],

  authors: [{ name: "PowerPlay Turf" }],
  creator: "PowerPlay Turf",
  publisher: "PowerPlay Turf",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: "PowerPlay Turf | Premium Multi-Sport Facility",
    description:
      "Experience professional-grade football & cricket turfs with LED floodlights and elite playing surfaces.",
    url: "https://turfpowerplay.in",
    siteName: "PowerPlay Turf",
    images: [
      {
        url: "/og-image.jpg", // add this image in public folder
        width: 1200,
        height: 630,
        alt: "PowerPlay Turf Multi-Sport Facility",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "PowerPlay Turf | Premium Multi-Sport Facility",
    description:
      "Premium football & cricket turfs with professional lighting and academy training.",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
