import { ChapterAyyami } from "@/components/site/chapter-ayyami";
import { ChapterQalbify } from "@/components/site/chapter-qalbify";
import { Contact } from "@/components/site/contact";
import { Faq } from "@/components/site/faq";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/site/hero";
import { Nav } from "@/components/site/nav";
import { Problem } from "@/components/site/problem";
import { Process } from "@/components/site/process";
import { Proof } from "@/components/site/proof";
import { Services } from "@/components/site/services";
import { Tagline } from "@/components/site/tagline";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Problem />
        <ChapterQalbify />
        <ChapterAyyami />
        <Tagline />
        <Services />
        <Process />
        <Proof />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
