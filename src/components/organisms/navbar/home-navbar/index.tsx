import Image from 'next/image'
import style from './styles.module.scss'
import InternalLinkText from '@/components/atoms/text/InternalLinkText'
import BaseButton from '@/components/molecules/buttons/base-button'

interface Props {
  position?: 'fixed' | 'absolute' | 'relative' | 'static' | 'sticky'
}

export default function HomeNavbar ({ position }: Props): JSX.Element {
  return (
    <nav className={style.navbar} style={{ position }}>
      <Image
        src="/assets/img/logos/GoldenDuck.webp"
        width={100}
        height={87}
        alt="GoldenDuck Logo"
      />
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
          <InternalLinkText href="#Possibilities">
            Posibilidades
          </InternalLinkText>
        </li>
        <li>
          <InternalLinkText href="#Sedes">Sedes</InternalLinkText>
        </li>
      </ul>
      <BaseButton
        type="InternalLinkText"
        href="/login"
        backgroundColor="var(--details)"
        xPadding="1.3rem"
        fontSize="1.2rem"
        fontWeight="800"
        fontColor="var(--white)"
      >
        Unete
      </BaseButton>
    </nav>
  )
}
