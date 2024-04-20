import React from 'react'
import type { Metadata } from 'next'
import DashboardContainer from '@/components/pages/layouts/dashboard-layout'
import { UserProvider } from '@/context/userContext'

export const metadata: Metadata = {
  title: 'Panel de control | Golden Duck'
} as const

export default function DashboardLayout ({ children }: { children: React.ReactNode }): React.ReactNode {
  return (
    <UserProvider>
      <DashboardContainer>{children}</DashboardContainer>
    </UserProvider>
  )
}
