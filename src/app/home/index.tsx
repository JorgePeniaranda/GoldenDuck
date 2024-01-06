import Navbar from "@/components/organisms/navbar";
import HomeHeader from "@/components/pages/headers/HomeHeader";
import Footer from "@/components/organisms/footer";
import PossibilitiesSection from "@/components/pages/sections/PossibilitiesSection";
import LycokatSection from "@/components/pages/sections/LycokatSection";
import SedesSection from "@/components/pages/sections/SedesSection";
import style from "./styles.module.scss";
import AppMobileSection from "@/components/pages/sections/AppMobileSection";
import AboutUsSection from "@/components/pages/sections/AboutUsSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <HomeHeader />
      <main id="Home" className={style.Home}>
        <LycokatSection />
        <section id="waveSection">
          <AboutUsSection />
          <AppMobileSection />
        </section>
        <PossibilitiesSection/>
        <SedesSection/>
      </main>
      <Footer />
    </>
  );
}
