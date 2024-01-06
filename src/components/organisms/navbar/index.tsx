import Image from 'next/image'
import style from './style.module.scss'
import InternalLinkText from '@/components/atoms/text/InternalLinkText'

export default function Navbar() {
  return (
    <nav className={style.navbar}>
        <Image src="/assets/img/logos/GoldenDuck.png" width={100} height={87} alt='GoldenDuck Logo' />
        <ul>
            <li>
                <InternalLinkText href="#Lycokat">LycoKat</InternalLinkText>
            </li>
            <li>
                <InternalLinkText href="#AboutUs">Sobre Nosotros</InternalLinkText>
            </li>
            <li>
                <InternalLinkText href="#AppMobile">App Móvil</InternalLinkText>
            </li>
            <li>
                <InternalLinkText href="#Possibilities">Posibilidades</InternalLinkText>
            </li>
            <li>
                <InternalLinkText href="#Sedes">Sedes</InternalLinkText>
            </li>
        </ul>
        <InternalLinkText href='/login'>Unete</InternalLinkText>
    </nav>
  )
}
