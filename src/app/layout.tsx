import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ICE DRILL — Lunar Ice Mining",
  description: "Mine ice on the moon, ship to Mars, become the biggest water supplier in the solar system",
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
