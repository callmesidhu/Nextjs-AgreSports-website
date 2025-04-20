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
  keywords: ["sports", "videos", "news", "events", "AgreSports"],
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