import Hero from "@/components/Hero";
import About from "@/components/sections/about";
import { Procedimentos } from "@/components/sections/procedimentos";
import { Convenios } from "@/components/sections/convenios";
import { PostsRecentes } from "@/components/sections/posts-recentes";
import CTA from "@/components/sections/cta";
import Locations from "@/components/sections/locations";
import Depoimentos from "@/components/sections/depoimentos";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-primary-dark text-neutral-light relative selection:bg-accent/30 flex flex-col">
      <Hero />
      <About />
      <Locations />
      <CTA />
      <Convenios />
      <Procedimentos />
      <PostsRecentes />
      <Depoimentos />
      <Footer />
    </main>
  );
}
