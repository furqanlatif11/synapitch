// src/app/layout.tsx
import type { Metadata } from "next";
import './globals.css';

export const metadata: Metadata = {
  title: "Synapitch | Smart AI-Powered Proposal Generator for Freelancers",
  description:
    "Generate professional, tailored job proposals instantly with Synapitch — the AI-powered proposal generator for freelancers on Upwork, Fiverr, and beyond.",
  keywords: [
    "AI proposal generator",
    "freelancer proposal tool",
    "Upwork AI proposals",
    "Fiverr proposal writer",
    "automated job proposals",
    "smart pitch generator",
    "Synapitch",
    "AI for freelancers",
    "proposal automation",
    "proposal writing assistant",
  ],
  openGraph: {
    title: "Synapitch | Smart AI-Powered Proposal Generator for Freelancers",
    description:
      "Synapitch helps freelancers craft perfect proposals in seconds using AI — personalized, precise, and professional.",
    url: "https://synapitch.com/",
    siteName: "Synapitch",
    images: [
      {
        url: "/assets/images/synapitch-og-image.webp",
        width: 1200,
        height: 630,
        alt: "Synapitch — AI Proposal Generator for Freelancers",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Synapitch | Smart AI-Powered Proposal Generator for Freelancers",
    description:
      "Craft proposals that win. Synapitch uses AI to write professional job proposals tailored to your experience.",
    images: ["/assets/images/synapitch-og-image.webp"],
  },
  icons: {
    icon: "/assets/icons/favicon.svg",
  },
  alternates: {
    canonical: "https://synapitch.com/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
