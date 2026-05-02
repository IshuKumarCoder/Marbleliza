import type { Metadata } from "next";
import { Average_Sans, Rufina } from "next/font/google";
import "./globals.css";

const averageSans = Average_Sans({
  variable: "--font-average-sans",
  subsets: ["latin"],
  weight: "400",
});

const rufina = Rufina({
  variable: "--font-rufina",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "MARBLIZA MARBLE | Premium Finishing",
  description:
    "Premium marble, granite, and stone — MARBLIZA MARBLE. Get a quote for your project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${averageSans.variable} ${rufina.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
