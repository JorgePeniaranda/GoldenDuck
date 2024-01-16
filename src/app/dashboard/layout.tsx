import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Panel de control | Golden Duck',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
