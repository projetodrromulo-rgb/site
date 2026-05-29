import Hero from "@/components/sections/hero";
import dynamic from "next/dynamic";

const About = dynamic(() => import("@/components/sections/about"), {
  loading: () => <div className="min-h-[50vh] animate-pulse bg-white/5" />
});

const Locations = dynamic(() => import("@/components/sections/locations"), {
  loading: () => <div className="min-h-[50vh] animate-pulse bg-white/5" />
});

const CTA = dynamic(() => import("@/components/sections/cta"), {
  loading: () => <div className="min-h-[30vh] animate-pulse bg-white/5" />
});

const Insurance = dynamic(() => import("@/components/sections/insurance").then(m => m.Insurance), {
  loading: () => <div className="min-h-[20vh] animate-pulse bg-white/5" />
});

const Procedures = dynamic(() => import("@/components/sections/procedures").then(m => m.Procedures), {
  loading: () => <div className="min-h-[50vh] animate-pulse bg-white/5" />
});

const BlogSection = dynamic(() => import("@/components/sections/blog"), {
  loading: () => <div className="min-h-[50vh] animate-pulse bg-white/5" />
});

const TestimonialsSection = dynamic(() => import("@/components/sections/testimonials"), {
  loading: () => <div className="min-h-[40vh] animate-pulse bg-white/5" />
});

const Footer = dynamic(() => import("@/components/sections/footer"), {
  loading: () => <div className="min-h-[20vh] animate-pulse bg-white/5" />
});
import { getHeroContent } from "@/components/sections/hero/data/get-hero-content";
import { getAboutContent } from "@/components/sections/about/data/get-about-content";
import { getLocationsContent } from "@/components/sections/locations/data/get-locations-content";
import { getCTAContent } from "@/components/sections/cta/data/get-content";
import { getInsuranceContent } from "@/components/sections/insurance/data/get-content";
import { getBlogContent } from "@/components/sections/blog/data/get-content";
import { getProceduresContent } from "@/components/sections/procedures/data/get-content";
import { getTestimonialsContent } from "@/components/sections/testimonials/data/get-content";
import { getFooterContent } from "@/components/sections/footer/data/get-content";
import { getParallaxContent } from "@/components/sections/parallax/data/get-content";
import { LocalBusinessSEO } from "@/components/seo/LocalBusinessSEO";

import ParallaxSection from "@/components/sections/parallax";

export default async function Home() {
  // Busca todos os conteúdos em paralelo para otimizar o TTFB e evitar timeouts
  const [
    heroContent,
    aboutContent,
    locationsContent,
    ctaContent,
    insuranceContent,
    proceduresContent,
    blogContent,
    testimonialsContent,
    footerContent,
    parallaxContent
  ] = await Promise.all([
    getHeroContent(),
    getAboutContent(),
    getLocationsContent(),
    getCTAContent(),
    getInsuranceContent(),
    getProceduresContent(),
    getBlogContent(),
    getTestimonialsContent(),
    getFooterContent(),
    getParallaxContent()
  ]);

  return (
    <main className="min-h-screen bg-primary-dark text-neutral-light relative selection:bg-accent/30 flex flex-col">
      <LocalBusinessSEO />
      <Hero content={heroContent} />
      <About content={aboutContent} />
      <Locations content={locationsContent} />
      <CTA content={ctaContent} />
      <Insurance content={insuranceContent} />
      <ParallaxSection content={parallaxContent} />
      <Procedures content={proceduresContent} />
      {/**<BlogSection content={blogContent} />*/}
      {/**  <TestimonialsSection content={testimonialsContent} />*/}
      <Footer content={footerContent} />
    </main>
  );
}
