'use client'

import { Popover, Transition } from '@headlessui/react'
import style from './styles.module.scss'

interface Props {
  PopoverIcon: React.ReactNode
  children: React.ReactNode
  arialLabel?: string
}

export default function ButtonWithPopover({
  PopoverIcon,
  children,
  arialLabel,
}: Props) {
  return (
    <Popover className={style.Popover} aria-label={arialLabel}>
      <Popover.Button className={style.PopoverButton}>
        {PopoverIcon}
      </Popover.Button>
      <Transition
        enter="transition duration-150 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <h1 className="duration-150"></h1>
        <Popover.Panel className={style.PopoverPanel} static>
          {children}
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
