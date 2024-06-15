import DashboardAside from '@/components/organisms/aside'
import DashboardHeader from '@/components/organisms/header/dashboard'
import { Children, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

Children

export default function DashboardLayout({ children }: Props) {
  return (
    <>
      <DashboardAside />
      <main>
        <DashboardHeader breadcrumbs={[]} />
        {children}
      </main>
    </>
  )
}
