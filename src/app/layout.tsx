import type { Metadata } from "next";
import { Inter, Playfair_Display, Space_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "@/components/sections/insurance/_components/SmoothScrolling";
import MobileNav from "@/components/MobileNav";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";

const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fontSerif = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

const fontMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Dr. Rômulo - Cirurgia de Coluna Minimamente Invasiva",
  description: "Clínica especializada em cirurgia de coluna minimamente invasiva. Agende sua consulta.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} antialiased bg-primary-dark text-neutral-light`}
      >
        <SmoothScrolling>
          <div className="noise-bg"></div>
          {children}
          <Navbar />
          <WhatsAppButton />
        </SmoothScrolling>
      </body>
    </html>
  );
}
