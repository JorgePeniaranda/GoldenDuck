import React from 'react'
import type { Metadata } from 'next'
import style from './styles.module.scss'
import Text from '@/components/atoms/text/Text'
import ContainerWithNavbar from '@/components/pages/container-with-navbar'

export const metadata: Metadata = {
  title: 'Registrarse | Golden Duck'
} as const

function SignInContainer({ children }: { children: React.ReactNode }): React.ReactNode {
  return (
    <ContainerWithNavbar className={style.SignIn}>
      <Text tag="h1" size={'2.6rem'} weight="700">
        Registrarse
      </Text>
      {children}
    </ContainerWithNavbar>
  )
}

export default function RegisterLayout({
  children
}: {
  children: React.ReactNode
}): React.ReactNode {
  return <SignInContainer>{children}</SignInContainer>
}
