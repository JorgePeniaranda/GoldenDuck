import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ingresar | Golden Duck',
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
