import React from 'react'
import Text from '@/components/atoms/text/Text'
import Image from 'next/image'
import style from './styles.module.scss'
import TypewriterText from '@/components/atoms/text/TypewriterText'

const TypewriterWords = [
  ' Confianza',
  ' Tranferencias',
  ' Seguridad',
  ' Confort',
  ' Inversiones',
  ' Servicios',
  ' Todos',
  ' Plazos Fijos',
  ' Prestamos',
  ' Ingresos',
  ' Agilidad',
  ' Rapidez',
  ' Emprendedores',
  ' Productividad'
]

export default function HomeHeader (): JSX.Element {
  return (
    <header className={style.header}>
      <article className={style.text}>
        <Text tag="h1" size={'4.5rem'} weight="700">
          Golden Duck
        </Text>
        <Text tag="p" size={'1.4rem'} weight="400">
          Tu banca online de{' '}
          <Text tag="span" size={'1.4rem'} weight="800">
            <TypewriterText words={TypewriterWords} />
          </Text>
        </Text>
      </article>
      <figure className={style.laptop}>
        <Image
          src="/assets/img/patterns/blob-laptop-header.webp"
          className={style.blob}
          width={360}
          height={360}
          alt="blob"
        />
        <picture>
          <source
            srcSet="/assets/img/mockups/laptop-dark.webp"
            media="(prefers-color-scheme: dark)"
          />
          <Image
            src="/assets/img/mockups/laptop.webp"
            width={1000}
            height={506}
            alt="laptop-with-golden-duck"
          />
        </picture>
      </figure>
      <figure className={style.waves}>
        <div className={style.wave} />
        <div className={style.wave} />
        <div className={style.wave} />
        <div className={style.wave} />
      </figure>
    </header>
  )
}
