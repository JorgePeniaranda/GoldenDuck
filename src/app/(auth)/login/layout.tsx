import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ingresar | Golden Duck'
} as const

export default function LoginLayout ({ children }: { children: React.ReactNode }): React.ReactNode {
  return <>{children}</>
}
