import type { Metadata } from "next";
import { Geist, Geist_Mono, Metal_Mania } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/ui/resizable-navbar";
import Header from "./Header/header";
import Footer from "./Footer/footer";

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
  weight: "400"
});

export const metadata: Metadata = {
  title: "AgreSports - Your Ultimate Sports Hub",
  description: "Stay updated with the latest sports news, videos, and events. AgreSports is your one-stop destination for all things sports.",
  keywords: [
    "AgreSports", "agr esports", "agr valorant", "agr valo", "agr gaming",
    "esports malayalam", "valorant malayalam", "valo malayalam",
    "best malayalam gaming community", "best esports in kerala",
    "kerala gaming tournament", "kerala gaming community",
    "eagle gaming", "best esports community in kerala",
    "esports in india", "esports india", "esports world cup", "indian esports",
    "e sports in india", "esports gaming", "e sports game", "esports game", "esports games",
    "league of legends esports", "lol esports", "lol championship",
    "esports live", "live esports", "esports lol",
    "tournament app", "e sports tournament", "esports tournament", "esports tournaments",
    "what are esports", "what is esports", "esports meaning", "what's e sports",
    "gaming tournament", "gaming sports", "gaming tournaments",
    "games tournament", "game tournaments", "video gaming tournaments",
    "esports full form", "e sports full form",
    "esport app", "esports tournament app", "gaming competition", "e-sports app"
  ],
  authors: [{ name: "AgreSports Team", url: "https://agresports.org" }],
  themeColor: "#4A90E2",
  openGraph: {
    title: "AgreSports - Your Ultimate Sports Hub",
    description: "Stay updated with the latest sports news, videos, and events. AgreSports is your one-stop destination for all things sports.",
    url: "https://agresports.org",
    siteName: "AgreSports",
    images: [
      {
        url: "https://agresports.org/logo.png",
        width: 1200,
        height: 630,
        alt: "AgreSports - Your Ultimate Sports Hub",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AgreSports - Your Ultimate Sports Hub",
    description: "Stay updated with the latest sports news, videos, and events. AgreSports is your one-stop destination for all things sports.",
    images: ["https://agresports.org/logo.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} `}>
      <head>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      
        <meta property="og:image" content="https://agresports.org/logo.png" />
        <meta property="og:url" content="https://agresports.org" />
        <meta property="og:type" content="website" />
      </head>
      <body className="font-sans">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}