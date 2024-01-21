import style from './styles.module.scss'
import InternalLinkText from '@/components/atoms/text/InternalLinkText'
import Image from 'next/image'
import React from 'react'

interface Props {
    children: React.ReactNode
}

export default function DashboardContainer({children}: Props) {
  return (
    <main className={style.Dashboard}>
        <nav className={style.DashboardNav}>
            <figure>
                <Image src={"/assets/img/logos/GoldenDuck.webp"} width={240} height={240} alt='Golden Duck Logo'/>
                <h1>Golden Duck</h1>
            </figure>
            <div className={style.NavContainer}>
                <details>
                    <summary>Panel de control</summary>
                    <InternalLinkText href='/dashboard'>Tu dinero</InternalLinkText>
                    <InternalLinkText href='/dashboard/expenses'>Gastos</InternalLinkText>
                    <InternalLinkText href='/dashboard/cards'>Tus tarjetas</InternalLinkText>
                </details>
                <details>
                    <summary>Servicios</summary>
                    <InternalLinkText href='/dashboard/payment'>Pagar</InternalLinkText>
                    <InternalLinkText href='/dashboard/investments'>Inverciones</InternalLinkText>
                    <InternalLinkText href='/dashboard/transfers'>Transferencias</InternalLinkText>
                    <InternalLinkText href='dashboard/loans'>Prestamos</InternalLinkText>
                    <InternalLinkText href='/dashboard/fixed-terms'>Plazos fijos</InternalLinkText>
                </details>
                <details>
                    <summary>Soporte</summary>
                    <InternalLinkText href='/dashboard/support-chat'>Chat con soporte</InternalLinkText>
                    <InternalLinkText href='/dashboard/faq'>Preguntas frecuentes</InternalLinkText>
                </details>
            </div>
        </nav>
        <aside className={style.DashboardAside}>
            <button>Coso</button>
        </aside>
        <section className={style.Content}>
            {children}
        </section>
    </main>
  )
}
