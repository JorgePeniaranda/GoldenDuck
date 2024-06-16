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
      <div className="flex min-h-screen w-full flex-col bg-muted/40 sm:gap-4 sm:py-4 sm:pl-14">
        <DashboardHeader breadcrumbs={[{
          name: "1"
        }, {
          name: "2"
        }, {
          name: "3"
        }]} name='user' />
        {children}
      </div>
    </>
  )
}
