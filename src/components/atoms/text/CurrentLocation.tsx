'use client'

import { usePathname } from 'next/navigation'

export default function CurrentLocation() {
  const path = usePathname().split('/')
  return path[path.length - 1]
}
