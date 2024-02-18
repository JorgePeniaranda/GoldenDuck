import style from './styles.module.scss'
import Text from '@/components/atoms/text/Text'
import Breadcrumb from '@/components/molecules/breadcrumb'
import Image from 'next/image'
import React from 'react'
import ButtonWithPopover, {
  CardLinkPopover
} from '@/components/molecules/buttons/button-with-popover'
import ProfileButton from '@/components/molecules/buttons/profile-button'
import NavDisclosure from '@/components/molecules/disclosures/nav-disclosure'
import { AsideIcons, NavIcons, NavLinks } from '@/const/DashboardConst'
import CurrentLocation from '@/components/atoms/text/CurrentLocation'

interface Props {
  children: React.ReactNode
}

export default function DashboardLayout ({ children }: Props): JSX.Element {
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
          <NavDisclosure
            links={NavLinks.panel}
            category="Panel de control"
            icon={NavIcons.panel}
          />
          <NavDisclosure
            links={NavLinks.services}
            category="Servicios"
            icon={NavIcons.services}
          />
          <NavDisclosure
            links={NavLinks.support}
            category="Soporte"
            icon={NavIcons.support}
          />
        </div>
      </nav>
      <aside className={style.DashboardAside}>
        <article>
          <Breadcrumb />
          <Text tag="h1" size={'1.2rem'} weight="700">
            <CurrentLocation />
          </Text>
        </article>
        <div className={style.ButtonsAside}>
          <ButtonWithPopover
            PopoverIcon={AsideIcons.messages}
            className={style.MessagesButtonContainer}
            arialLabel="Mensajes"
            emptyText="No hay nuevos mensajes"
          >
            <CardLinkPopover href="/" className={style.MessagesButton}>
              <figure>
                <Image
                  src="/assets/img/misc/default-pfp.webp"
                  width={32}
                  height={32}
                  alt="Profile Picture"
                />
              </figure>
              <article>
                <Text tag="span" size=".8rem" weight="700">
                  Omar
                </Text>
                <Text size=".8rem">
                  Lorem ipsum dolor sit amet.ipsum dolor sit amet.ipsum dolor
                  sit amet.ipsum dolor sit amet.
                </Text>
              </article>
              <Text tag="span" size=".8rem">
                12:32
              </Text>
            </CardLinkPopover>
            <CardLinkPopover href="/" className={style.MessagesButton}>
              <figure>
                <Image
                  src="/assets/img/misc/default-pfp.webp"
                  width={32}
                  height={32}
                  alt="Profile Picture"
                />
              </figure>
              <article>
                <Text tag="span" size=".8rem" weight="700">
                  Omar
                </Text>
                <Text size=".8rem">
                  Lorem ipsum dolor sit amet.ipsum dolor sit amet.ipsum dolor
                  sit amet.ipsum dolor sit amet.
                </Text>
              </article>
              <Text tag="span" size=".8rem">
                12:32
              </Text>
            </CardLinkPopover>
            <CardLinkPopover href="/" className={style.MessagesButton}>
              <figure>
                <Image
                  src="/assets/img/misc/default-pfp.webp"
                  width={32}
                  height={32}
                  alt="Profile Picture"
                />
              </figure>
              <article>
                <Text tag="span" size=".8rem" weight="700">
                  Omar
                </Text>
                <Text size=".8rem">
                  Lorem ipsum dolor sit amet.ipsum dolor sit amet.ipsum dolor
                  sit amet.ipsum dolor sit amet.
                </Text>
              </article>
              <Text tag="span" size=".8rem">
                12:32
              </Text>
            </CardLinkPopover>
          </ButtonWithPopover>
          <ButtonWithPopover
            PopoverIcon={AsideIcons.notifications}
            className={style.NotificationsButtonContainer}
            arialLabel="Notificaciones"
            emptyText="No hay notificaciones"
          >
            <CardLinkPopover href="/" className={style.NotificationsButton}>
              <Text>CosoCosoCosoCosoCosoCosoCoso</Text>
              <Text tag="span" size=".8rem">
                12:32
              </Text>
            </CardLinkPopover>
            <CardLinkPopover href="/" className={style.NotificationsButton}>
              <Text>CosoCosoCosoCosoCosoCosoCoso</Text>
              <Text tag="span" size=".8rem">
                12:32
              </Text>
            </CardLinkPopover>
            <CardLinkPopover href="/" className={style.NotificationsButton}>
              <Text>CosoCosoCosoCosoCosoCosoCoso</Text>
              <Text tag="span" size=".8rem">
                12:32
              </Text>
            </CardLinkPopover>
          </ButtonWithPopover>
          <ButtonWithPopover
            PopoverIcon={<ProfileButton name="Omar" />}
            className={style.ProfileButtonContainer}
            arialLabel="Perfil"
          >
            <CardLinkPopover
              href="/dashboard/profile"
              className={style.ProfileButton}
            >
              Perfil
            </CardLinkPopover>
            <CardLinkPopover href="/dashboard/" className={style.ProfileButton}>
              Configuración
            </CardLinkPopover>
            <CardLinkPopover href="/" className={style.ProfileButton}>
              Cerrar Sesión
            </CardLinkPopover>
          </ButtonWithPopover>
        </div>
      </aside>
      <section className={style.Content}>{children}</section>
    </main>
  )
}
