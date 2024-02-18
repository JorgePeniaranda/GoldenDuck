import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Términos y Condiciones | Golden Duck'
}

export default function TermsAndConditionsLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
