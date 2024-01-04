import Image from 'next/image'
import style from './style.module.scss'

export default function Navbar() {
  return (
    <nav className={style.navbar}>
        <Image src="/assets/img/GoldenDuckLogo.png" width={100} height={87} alt='GoldenDuck Logo' />
        <ul>
            <li>
                <a href="#">LycoKat</a>
            </li>
            <li>
                <a href="#">Sobre Nosotros</a>
            </li>
            <li>
                <a href="#">App Móvil</a>
            </li>
            <li>
                <a href="#">Posibilidades</a>
            </li>
            <li>
                <a href="#">Sedes</a>
            </li>
        </ul>
        <button>Unete</button>
    </nav>
  )
}
