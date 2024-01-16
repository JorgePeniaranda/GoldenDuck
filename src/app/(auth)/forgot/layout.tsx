import style from './styles.module.scss'
import Text from '@/components/atoms/text/Text'
import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Cambiar contraseña | Golden Duck',
}

const ForgotContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className={style.Forgot}>
      <section>
        <article>
          <Image
            src="/assets/img/logos/GoldenDuck.webp"
            alt="Logo"
            width={100}
            height={100}
          />
          <Text tag="h1" size={'1.6rem'} weight="700">
            Cambiar Contraseña
          </Text>
          {children}
        </article>
      </section>
    </main>
  )
}

export default function ForgotLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ForgotContainer>{children}</ForgotContainer>
}
