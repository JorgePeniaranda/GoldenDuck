import style from './styles.module.scss'
import InternalLinkText from '@/components/atoms/text/InternalLinkText'
import Text from '@/components/atoms/text/Text'
import Breadcrumb from '@/components/atoms/text/Breadcrumb'
import Image from 'next/image'
import React from 'react'
import ButtonWithPopover from '@/components/atoms/buttons/button-with-popover'
import ProfileButton from '@/components/molecules/buttons/profile-button'

const icons = {
  messages: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="m5 8.75l-2.75-3.1q-.425-.5-.162-1.075Q2.35 4 3 4h17q.825 0 1.413.588Q22 5.175 22 6v12q0 .825-.587 1.413Q20.825 20 20 20H7q-.825 0-1.412-.587Q5 18.825 5 18ZM9 13h9q.425 0 .712-.288Q19 12.425 19 12t-.288-.713Q18.425 11 18 11H9q-.425 0-.712.287Q8 11.575 8 12t.288.712Q8.575 13 9 13Zm0 3h6q.425 0 .713-.288Q16 15.425 16 15t-.287-.713Q15.425 14 15 14H9q-.425 0-.712.287Q8 14.575 8 15t.288.712Q8.575 16 9 16Zm0-6h9q.425 0 .712-.288Q19 9.425 19 9t-.288-.713Q18.425 8 18 8H9q-.425 0-.712.287Q8 8.575 8 9t.288.712Q8.575 10 9 10Z"
      />
    </svg>
  ),
  notifications: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M12 22c1.1 0 2-.9 2-2h-4a2 2 0 0 0 2 2m6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-1.29 1.29c-.63.63-.19 1.71.7 1.71h13.17c.89 0 1.34-1.08.71-1.71z"
      />
    </svg>
  ),
}

interface Props {
  children: React.ReactNode
}

export default function DashboardContainer({ children }: Props) {
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
          <details>
            <summary>Panel de control</summary>
            <InternalLinkText href="/dashboard">Tu dinero</InternalLinkText>
            <InternalLinkText href="/dashboard/expenses">
              Gastos
            </InternalLinkText>
            <InternalLinkText href="/dashboard/cards">
              Tus tarjetas
            </InternalLinkText>
          </details>
          <details>
            <summary>Servicios</summary>
            <InternalLinkText href="/dashboard/payment">Pagar</InternalLinkText>
            <InternalLinkText href="/dashboard/investments">
              Inverciones
            </InternalLinkText>
            <InternalLinkText href="/dashboard/transfers">
              Transferencias
            </InternalLinkText>
            <InternalLinkText href="dashboard/loans">
              Prestamos
            </InternalLinkText>
            <InternalLinkText href="/dashboard/fixed-terms">
              Plazos fijos
            </InternalLinkText>
          </details>
          <details>
            <summary>Soporte</summary>
            <InternalLinkText href="/dashboard/support-chat">
              Chat con soporte
            </InternalLinkText>
            <InternalLinkText href="/dashboard/faq">
              Preguntas frecuentes
            </InternalLinkText>
          </details>
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
          <ButtonWithPopover PopoverIcon={icons.messages} arialLabel="Mensajes">
            <h1>Mensajes</h1>
          </ButtonWithPopover>
          <ButtonWithPopover
            PopoverIcon={icons.notifications}
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
