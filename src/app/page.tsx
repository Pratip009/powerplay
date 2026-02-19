import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Sports from "@/components/Sports";
import Facilities from "@/components/Facilities";
import Gallery from "@/components/Gallery";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Loader from "@/components/Loader";
import ScrollToTop from "@/components/Scrolltotop";

export default function Home() {
  return (
    <>
      <Loader />
      <ScrollReveal />
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <Sports />
        <Facilities />
        <Gallery />
        <About />
        <Contact />
        <ScrollToTop/>
      </main>
      <Footer />
    </>
  );
}