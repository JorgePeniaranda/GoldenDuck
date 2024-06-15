import { NAVBAR_ENTRIES_DATA } from '@/constants/navbar-data'
import Link from 'next/link'
import Image from 'next/image'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export default function DashboardAside() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="/"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <picture className="hidden bg-muted lg:block">
            <Image
              src=""
              alt="Logo"
              width="16"
              height="16"
              className="h-4 w-4 transition-all group-hover:scale-110"
            />
          </picture>
          <span className="sr-only">Logo</span>
        </Link>
        {NAVBAR_ENTRIES_DATA.map(({ icon: Icon, name, path }, index) => (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={path}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Icon className="h-5 w-5" />
                  <span className="sr-only">{name}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{name}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </nav>
    </aside>
  )
}
