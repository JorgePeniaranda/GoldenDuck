import type React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Términos y Condiciones | Golden Duck'
} as const

export default function TermsAndConditionsLayout ({
  children
}: {
  children: React.ReactNode
}): React.ReactNode {
  return children
}
