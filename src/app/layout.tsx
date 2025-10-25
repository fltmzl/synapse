import ClientProviders from "@/providers/client-providers";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";
import Footer from "./footer";
import Header from "./header";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Synapse",
  description: "Synapse"
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geist.variable} ${geistMono.variable} antialiased bg-body`}
      >
        <ClientProviders>{children}</ClientProviders>
        <Footer />
        <Toaster position="bottom-right" richColors={true} />
        <Script src="https://player.vimeo.com/api/player.js" />
      </body>
    </html>
  );
}
