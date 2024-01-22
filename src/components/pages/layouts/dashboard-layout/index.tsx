import style from './styles.module.scss'
import Text from '@/components/atoms/text/Text'
import Breadcrumb from '@/components/atoms/text/Breadcrumb'
import Image from 'next/image'
import React from 'react'
import ButtonWithPopover from '@/components/molecules/buttons/button-with-popover'
import ProfileButton from '@/components/molecules/buttons/profile-button'
import NavDisclosure from '@/components/molecules/disclosures/nav-disclosure'
import { AsideIcons, NavIcons, NavLinks } from '@/const/DashboardConst'

interface Props {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
  return (
    <main className={style.Dashboard}>
      <nav className={style.DashboardNav}>
        <figure>
          <Image
            src={'/assets/img/logos/GoldenDuck.webp'}
            width={60}
            height={52.5}
            alt="Golden Duck Logo"
          />
          <Text tag="h1" size={'1.1rem'} weight="600">
            Golden Duck
          </Text>
        </figure>
        <hr />
        <div className={style.NavContainer}>
          <NavDisclosure links={NavLinks.panel} category='Panel de control' icon={NavIcons.panel}/>
          <NavDisclosure links={NavLinks.services} category='Servicios' icon={NavIcons.services}/>
          <NavDisclosure links={NavLinks.support} category='Soporte' icon={NavIcons.support}/>
        </div>
      </nav>
      <aside className={style.DashboardAside}>
        <article>
          <Breadcrumb />
          <Text tag="h1" size={'1.2rem'} weight="700">
            Dashboard
          </Text>
        </article>
        <div className={style.ButtonsAside}>
          <ButtonWithPopover PopoverIcon={AsideIcons.messages} arialLabel="Mensajes">
            <h1>Mensajes</h1>
          </ButtonWithPopover>
          <ButtonWithPopover
            PopoverIcon={AsideIcons.notifications}
            arialLabel="Notificaciones"
          >
            <h1>Notificaciones</h1>
          </ButtonWithPopover>
          <ButtonWithPopover
            PopoverIcon={<ProfileButton name="Omar" />}
            arialLabel="Perfil"
          >
            <h1>Profile</h1>
          </ButtonWithPopover>
        </div>
      </aside>
      <section className={style.Content}>{children}</section>
    </main>
  )
}
