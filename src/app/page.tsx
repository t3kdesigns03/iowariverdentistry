import FirstVisit from "@/components/FirstVisit";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MeetBryn from "@/components/MeetBryn";
import StickyCall from "@/components/StickyCall";
import TheWork from "@/components/TheWork";
import Trust from "@/components/Trust";
import Visit from "@/components/Visit";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <MeetBryn />
        <FirstVisit />
        <TheWork />
        <Trust />
        <Visit />
      </main>
      <Footer />
      <StickyCall />
    </>
  );
}
