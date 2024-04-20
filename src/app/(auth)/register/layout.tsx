import React from 'react'
import type { Metadata } from 'next'
import style from './styles.module.scss'
import Text from '@/components/atoms/text/Text'
import ContainerWithNavbar from '@/components/pages/container-with-navbar'

export const metadata: Metadata = {
  title: 'Registrarse | Golden Duck'
}

const SignInContainer = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <ContainerWithNavbar className={style.SignIn}>
      <Text tag="h1" size={'2.6rem'} weight="700">
        Registrarse
      </Text>
      {children}
    </ContainerWithNavbar>
  )
}

export default function SigninLayout ({ children }: { children: React.ReactNode }): JSX.Element {
  return <SignInContainer>{children}</SignInContainer>
}
