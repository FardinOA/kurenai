import { Creators } from "@/components/creators";
import { Footer, IssueOne } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Manifesto } from "@/components/manifesto";
import { Marquee } from "@/components/marquee";
import { Nav } from "@/components/nav";
import { PageOne } from "@/components/page-one";
import { Press } from "@/components/press";
import { Process } from "@/components/process";
import { RedPass } from "@/components/red-pass";
import { Series } from "@/components/series";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Manifesto />
        <PageOne />
        <Series />
        <Process />
        <Creators />
        <Press />
        <RedPass />
        <IssueOne />
      </main>
      <Footer />
    </>
  );
}
