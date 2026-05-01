import type { Metadata } from "next";
import { Inter, Playfair_Display, Space_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "@/components/shared/SmoothScrolling";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";

const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const fontSerif = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const fontMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dr. Rômulo Oliveira | Cirurgia de Coluna Minimamente Invasiva",
  description: "Especialista em cirurgia de coluna minimamente invasiva, ortopedia e traumatologia. Atendimento em Belo Horizonte, Betim e Contagem. Recupere sua qualidade de vida.",
  keywords: ["Cirurgia de Coluna", "Minimamente Invasiva", "Dr. Rômulo Oliveira", "Ortopedista Belo Horizonte", "Hérnia de Disco", "Dor nas Costas"],
  authors: [{ name: "Dr. Rômulo Oliveira" }],
  creator: "Dr. Rômulo Oliveira",
  publisher: "Dr. Rômulo Oliveira",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: "Dr. Rômulo Oliveira | Cirurgia de Coluna Minimamente Invasiva",
    description: "Especialista em cirurgia de coluna minimamente invasiva com foco em rápida recuperação.",
    url: "https://drromulocoluna.com.br",
    siteName: "Dr. Rômulo Oliveira",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/images/image-profile.png",
        width: 1200,
        height: 630,
        alt: "Dr. Rômulo Oliveira - Especialista em Coluna",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Rômulo Oliveira | Cirurgia de Coluna Minimamente Invasiva",
    description: "Recupere sua qualidade de vida com procedimentos modernos e minimamente invasivos.",
    images: ["/images/image-profile.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
        suppressHydrationWarning
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
