import { ChevronDownIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import type { BreadCrumbItem, BreadCrumbProps } from './breadcrumb'

interface Props extends BreadCrumbProps {
  breadcrumbs: BreadCrumbItem[]
}

export default function CustomBreadcrumb({ breadcrumbs, ...props }: Props) {
  return (
    <Breadcrumb {...props}>
      <BreadcrumbList>
        {breadcrumbs.map(({ name, path, sub }, index) => {
          if (sub !== undefined) {
            return (
              <React.Fragment key={index}>
                <CustomBreadcrumbDropdown name={name} sub={sub} />
                {index !== breadcrumbs.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            )
          }

          return (
            <React.Fragment key={index}>
              <CustomBreadcrumbItem name={name} path={path} />
              {index !== breadcrumbs.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

function CustomBreadcrumbItem({ name, path }: BreadCrumbItem) {
  if (path !== undefined) {
    return (
      <BreadcrumbItem>
        <BreadcrumbLink asChild>
          <Link href={path}>{name}</Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
    )
  }

  return (
    <BreadcrumbItem>
      <BreadcrumbPage>{name}</BreadcrumbPage>
    </BreadcrumbItem>
  )
}

function CustomBreadcrumbDropdown({ name, sub }: BreadCrumbItem) {
  if (sub === undefined) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1">
        {name}
        <ChevronDownIcon className="w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {sub.map(({ name, path, sub }, index) => {
          if (sub !== undefined) {
            return (
              <DropdownMenuItem key={index}>
                <CustomBreadcrumbDropdown name={name} sub={sub} />
              </DropdownMenuItem>
            )
          }

          return (
            <DropdownMenuItem key={index}>
              <CustomBreadcrumbItem name={name} path={path} />
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
