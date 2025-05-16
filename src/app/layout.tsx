import type { Metadata } from "next";
import { Geist, Geist_Mono, Metal_Mania } from "next/font/google";
import "./globals.css";
import { poppins } from "./fonts/poppins";
import LayoutWrapper from "./LayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const metalMania = Metal_Mania({
  variable: "--font-metal-mania",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "AgreSports | AGR Gaming, Esports News & Kerala's Top Esports Team",
  description:
    "AgreSports is the ultimate esports platform for AGR fans. Explore esports news, Valorant updates, tournaments, and Kerala's best gaming community.",
  keywords: [
    "AgreSports", "agresports", "AGR", "AGR Esports", "AGR Gaming", "agr esports", "agr valorant", "agr valo",
    "agr esports kerala valorant team", "what is agr esports", "how to join agr gaming team", 
    "kerala esports tournaments 2025", "esports community in kerala", "agresports official website", 
    "agr gaming community", "agr gaming team valorant", "join agr esports", "agr kerala gaming",
    "esports malayalam", "valorant malayalam", "kerala esports", "kerala gaming community",
    "best malayalam gaming community", "top esports team in Kerala", "AGR Esports Kerala",
    "AGR India", "Indian esports", "e sports in India", "esports gaming", "gaming news",
    "gaming tournaments", "esports tournaments", "AGR tournaments", "gaming competitions",
    "tournament app", "AGR Valorant", "valorant AGR", "Malayalam esports team",
    "esports full form", "esports meaning", "e-sports games", "esports games", "live esports",
    "League of Legends esports", "LOL AGR", "AGR LOL team", "AGR gaming news", "esports world cup",
    "gaming sports", "AGR esports live", "esport app", "e-sports app", "AGR esports tournaments"
  ],
  authors: [{ name: "AgreSports Team", url: "https://agresports.org" }],
  themeColor: "#4A90E2",
  openGraph: {
    title: "AgreSports | AGR Gaming, Esports News & Kerala's Top Esports Team",
    description:
      "Join AGR Gaming and the AgreSports community for all things esports. From Valorant to tournaments, get the latest in gaming from Kerala to the world.",
    url: "https://agresports.org",
    siteName: "AgreSports",
    images: [
      {
        url: "https://agresports.org/logo.png",
        width: 1200,
        height: 630,
        alt: "AgreSports - AGR Esports & Gaming Community",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AgreSports | AGR Esports & Gaming News",
    description:
      "Stay updated with AGR esports news, gaming tournaments, and Valorant highlights. AgreSports is Kerala’s leading esports platform.",
    images: ["https://agresports.org/logo.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${metalMania.variable}`}
    >
      <body className={poppins.className}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
