import type { Metadata } from 'next'
import DashboardContainer from '@/components/pages/layouts/dashboard-layout'

export const metadata: Metadata = {
  title: 'Panel de control | Golden Duck',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardContainer>{children}</DashboardContainer>
}
