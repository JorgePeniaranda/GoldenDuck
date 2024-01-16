import type { Metadata } from 'next'
import style from './styles.module.scss'
import Text from '@/components/atoms/text/Text'
import ContainerCenteredItemsWithNavbar from '@/components/pages/container-centered-items-with-navbar'

export const metadata: Metadata = {
  title: 'Registrarse | Golden Duck',
}

const SignInContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <ContainerCenteredItemsWithNavbar className={style.SignIn}>
      <Text tag="h1" size={'2.6rem'} weight="700">
        Registrarse
      </Text>
      {children}
    </ContainerCenteredItemsWithNavbar>
  )
}

export default function SigninLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <SignInContainer>{children}</SignInContainer>
}
