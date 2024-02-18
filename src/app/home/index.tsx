import Navbar from '@/components/organisms/navbar/home-navbar'
import HomeHeader from '@/components/pages/headers/header-home'
import Footer from '@/components/organisms/footer'
import PossibilitiesSection from '@/components/pages/sections/possibilities'
import LycokatSection from '@/components/pages/sections/about-lycokat'
import SedesSection from '@/components/pages/sections/sedes'
import style from './styles.module.scss'
import AppMobileSection from '@/components/pages/sections/app-mobile'
import AboutUsSection from '@/components/pages/sections/about-us'

export default function Home (): JSX.Element {
  return (
    <>
      <Navbar position="absolute" />
      <HomeHeader />
      <main id="Home" className={style.Home}>
        <LycokatSection />
        <section className={style.WaveSection}>
          <svg
            className={style.TopWave}
            version="1.2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 900 123"
          >
            <path
              fill="currentColor"
              d="m0 0h30c30 0 90 0 150 0q90 0 180 0 90 0 180 0 90 0 180 0c60 0 120 0 150 0h30v118l-30-1.3c-30-1.4-90-4-150-19.2-60-15.2-120-42.8-180-48-60-5.2-120 12.2-180 24-60 11.8-120 18.2-180 9.3-60-8.8-120-32.8-150-44.8l-30-12z"
            />
          </svg>
          <AboutUsSection />
          <AppMobileSection />
          <svg
            className={style.BottomWave}
            version="1.2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 900 101"
          >
            <path
              fill="currentColor"
              d="m0 30l50-7.8c50-7.9 150-23.5 250-12 100 11.5 200 50.1 300 66 100 15.8 200 8.8 250 5.3l50-3.5v24h-50c-50 0-150 0-250 0q-150 0-300 0c-100 0-200 0-250 0h-50z"
            />
          </svg>
        </section>
        <PossibilitiesSection />
        <SedesSection />
      </main>
      <Footer />
    </>
  )
}
