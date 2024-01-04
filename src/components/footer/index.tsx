import Image from 'next/image'
import styles from './styles.module.scss'
import { Cursor, useTypewriter } from "react-simple-typewriter";

export default function Footer() {
  const [text] = useTypewriter({
    words: [
      "Fortuna y seguridad, en un solo lugar"
    ],
    autoStart: true,
    loop: 0,
    typeSpeed: 50,
    deleteSpeed: 30,
    delaySpeed: 1000,
  });
  return (
    <footer className={styles.footer}>
        <Image src="/assets/img/Lycokat-Logo.png" width={150} height={150} alt='Lycokat Logo'/>
        <p>
            {text}
            <Cursor cursorStyle="|" />
        </p>
        <div id='SocialMedia'>
            <a href="#">
                <Image src="/assets/img/" width={50} height={50} alt="" />
            </a>
            <a href="#">
                <Image src="/assets/img/" width={50} height={50} alt="" />
            </a>
            <a href="#">
                <Image src="/assets/img/" width={50} height={50} alt="" />
            </a>
            <a href="#">
                <Image src="/assets/img/" width={50} height={50} alt="" />
            </a>
            <a href="#">
                <Image src="/assets/img/" width={50} height={50} alt="" />
            </a>
        </div>
        <small>Lycokat™ 2022 | Todos los derechos reservados</small>
    </footer>
  )
}
