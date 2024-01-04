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
            <a
              href="https://www.facebook.com/profile.php?id=100081120383944"
              target="_blank"
              rel="noreferrer"
              aria-label='Facebook'
            >
                <Image src="/assets/img/Facebook.svg" width={50} height={50} alt="Facebook logo" />
            </a>
            <a
              href="https://www.instagram.com/lycokat"
              target="_blank"
              rel="noreferrer"
              aria-label='Instagram'
            >
                <Image src="/assets/img/Instagram.svg" width={50} height={50} alt="Instagram logo" />
            </a>
            <a href="mailto:lycokat.co@gmail.Com" aria-label='Email'>
                <Image src="/assets/img/Mail.webp" width={50} height={50} alt="Email logo" />
            </a>
            <a
              href="https://www.linkedin.com/in/LycoKat"
              target="_blank"
              rel="noreferrer"
              aria-label='Linkedin'
            >
                <Image src="/assets/img/Linkedin.svg" width={50} height={50} alt="Linkedin logo" />
            </a>
            <a
              href="https://twitter.com/lycokat"
              target="_blank"
              rel="noreferrer"
              aria-label='Twitter'
            >
                <Image src="/assets/img/Twitter.svg" width={50} height={50} alt="Twitter logo" />
            </a>
        </div>
        <small>Lycokat™ 2022 | Todos los derechos reservados</small>
    </footer>
  )
}
