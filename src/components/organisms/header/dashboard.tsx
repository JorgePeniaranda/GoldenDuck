import { NAVBAR_ENTRIES_DATA } from '@/constants/navbar-data'
import { PanelLeft, Search } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import CustomBreadcrumb from '@/components/organisms/breadcrumb'
import type { BreadCrumbItem } from '@/components/organisms/breadcrumb/breadcrumb'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components//ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components//ui/dropdown-menu'
import { Input } from '@/components//ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components//ui/sheet'
import Logo from '@/assets/images/golden-duck.webp'

interface Props {
  avatarSrc?: string
  avatarFallback?: string
  breadcrumbs: BreadCrumbItem[]
  name: string
}

export default function DashboardHeader({ avatarSrc, avatarFallback, breadcrumbs, name }: Props) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <picture>
                <Image src={Logo} alt="Logo" className="w-14" />
              </picture>
              <span className="sr-only">Golden Duck</span>
            </Link>
            {NAVBAR_ENTRIES_DATA.map(({ icon: Icon, name, path }, index) => (
              <Link
                key={index}
                href={path}
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Icon className="h-6 w-6" />
                {name}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <CustomBreadcrumb className="hidden md:flex" breadcrumbs={breadcrumbs} />
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
            <Avatar>
              <AvatarImage src={avatarSrc} />
              <AvatarFallback>{avatarFallback}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            {name}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/dashboard/profile">Perfil</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/dashboard/settings">Configuración</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/dashboard/help">Ayuda</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
