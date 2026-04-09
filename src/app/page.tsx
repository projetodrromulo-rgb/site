import About from "@/components/sections/about";
import CTA from "@/components/sections/cta";
import Locations from "@/components/sections/locations";
import TestimonialsSection from "@/components/sections/testimonials";
import Hero from "@/components/sections/hero";
import { getHeroContent } from "@/components/sections/hero/data/get-hero-content";
import { getAboutContent } from "@/components/sections/about/data/get-about-content";
import { getLocationsContent } from "@/components/sections/locations/data/get-locations-content";
import { getCTAContent } from "@/components/sections/cta/data/get-content";
import { getInsuranceContent } from "@/components/sections/insurance/data/get-content";
import { getBlogContent } from "@/components/sections/blog/data/get-content";
import { getProceduresContent } from "@/components/sections/procedures/data/get-content";
import { getTestimonialsContent } from "@/components/sections/testimonials/data/get-content";
import { LocalBusinessSEO } from "@/components/seo/LocalBusinessSEO";
import { Insurance } from "@/components/sections/insurance";
import { Procedures } from "@/components/sections/procedures";
import BlogSection from "@/components/sections/blog";
import Footer from "@/components/sections/footer";
import { getFooterContent } from "@/components/sections/footer/data/get-content";

export default async function Home() {
  const heroContent = await getHeroContent();
  const aboutContent = await getAboutContent();
  const locationsContent = await getLocationsContent();
  const ctaContent = await getCTAContent();
  const insuranceContent = await getInsuranceContent();
  const proceduresContent = await getProceduresContent();
  const blogContent = await getBlogContent();
  const testimonialsContent = await getTestimonialsContent();
  const footerContent = await getFooterContent();

  return (
    <main className="min-h-screen bg-primary-dark text-neutral-light relative selection:bg-accent/30 flex flex-col">
      <LocalBusinessSEO />
      <Hero content={heroContent} />
      <About content={aboutContent} />
      <Locations content={locationsContent} />
      <CTA content={ctaContent} />
      <Insurance content={insuranceContent} />
      <Procedures content={proceduresContent} />
      <BlogSection content={blogContent} />
      <TestimonialsSection content={testimonialsContent} />
      <Footer content={footerContent} />
    </main>
  );
}
