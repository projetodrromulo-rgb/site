import type { Metadata } from "next";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Inter, Playfair_Display, Space_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "@/components/shared/SmoothScrolling";
import Navbar from "@/components/Navbar";

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
  metadataBase: new URL("https://www.drromulocoluna.com.br"),
  alternates: {
    canonical: "/",
  },
  title: "Dr. Rômulo Oliveira | Cirurgia de Coluna Minimamente Invasiva",
  description: "Especialista em cirurgia de coluna minimamente invasiva, ortopedia e traumatologia. Atendimento em Belo Horizonte, Betim e Contagem. Recupere sua qualidade de vida.",
  keywords: ["Cirurgia de Coluna BH", "Cirurgia Minimamente Invasiva", "Dr. Rômulo Oliveira", "Especialista em Coluna Belo Horizonte", "Tratamento de Hérnia de Disco BH", "Cirurgia Endoscópica de Coluna", "Ortopedista em Betim", "Médico de Coluna Contagem"],
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
    url: "https://www.drromulocoluna.com.br",
    siteName: "Dr. Rômulo Oliveira",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/images/og-profile.webp",
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
    images: ["/images/og-profile.webp"],
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
  icons: {
    icon: [
      { url: "/icon.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className="dark">
      <head>
        <link rel="preconnect" href="https://www.drromulocoluna.com.br" />
        <link
          rel="preload"
          as="image"
          href="/images/hero-mobile.webp"
          media="(max-width: 767px)"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const stored = localStorage.getItem('theme');
                  if (stored === 'light') {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                  } else {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                  }
                } catch (_) {}
              })();
            `
          }}
        />
      </head>
      <body
        className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} antialiased bg-primary-dark text-neutral-light -mt-2`}
        suppressHydrationWarning
      >
        <SmoothScrolling>
          <div className="noise-bg"></div>
          {children}
          <Navbar />
        </SmoothScrolling>
        <SpeedInsights />
      </body>
    </html>
  );
}
