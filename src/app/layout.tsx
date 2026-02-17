import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PowerPlay Turf | Premium Multi-Sport Facility",
  description: "PowerPlay is a premium multi-sport turf facility offering world-class football and cricket surfaces, floodlit courts, and professional training environments.",
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