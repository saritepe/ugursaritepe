import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap", // Prevent render blocking
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ugursaritepe.com"),
  title: {
    default: "Uğur Sarıtepe - Developer & Data Engineer",
    template: "%s | Uğur Sarıtepe",
  },
  description: "Personal blog and portfolio showcasing data engineering projects, Python development, and technical insights from 8 years of experience in the data field.",
  keywords: ["developer", "data engineer", "Python", "blog", "portfolio", "data platforms"],
  authors: [{ name: "Uğur Sarıtepe" }],
  creator: "Uğur Sarıtepe",
  icons: {
    icon: "/avatar.png",
    apple: "/avatar.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Uğur Sarıtepe",
    title: "Uğur Sarıtepe - Developer & Data Engineer",
    description: "Personal blog and portfolio showcasing data engineering projects, Python development, and technical insights.",
    images: [
      {
        url: "/avatar.png",
        width: 800,
        height: 800,
        alt: "Uğur Sarıtepe",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Uğur Sarıtepe - Developer & Data Engineer",
    description: "Personal blog and portfolio showcasing data engineering projects and technical insights.",
    images: ["/avatar.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts"
          as="style"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-[#f9fafb] text-[#111827]`}
      >
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
