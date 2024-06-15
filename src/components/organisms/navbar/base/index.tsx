import React from 'react'
import InternalLinkText from '@/components/atoms/text/InternalLinkText'
import Image from 'next/image'
import style from './styles.module.scss'

export default function Navbar(): React.ReactNode {
  return (
    <nav className={style.nav}>
      <Image
        src="/assets/img/logos/GoldenDuck.webp"
        width={100}
        height={87}
        alt="GoldenDuck Logo"
      />
      <InternalLinkText href="/" arialLabel="Go Home">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="m12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81zM12 3L2 12h3v8h6v-6h2v6h6v-8h3"
          />
        </svg>
      </InternalLinkText>
    </nav>
  )
}
