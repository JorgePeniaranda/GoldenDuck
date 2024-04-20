'use client'

import InternalLinkText from '@/components/atoms/text/InternalLinkText'
import { Popover, Transition } from '@headlessui/react'
import classNames from 'classnames'
import React from 'react'
import style from './styles.module.scss'

interface ButtonWithPopoverProps {
  PopoverIcon: React.ReactNode
  children?: React.ReactNode
  arialLabel?: string
  emptyText?: string
  className?: string
}

export const ButtonWithPopover = ({
  PopoverIcon,
  children,
  arialLabel,
  emptyText,
  className
}: ButtonWithPopoverProps): JSX.Element => {
  return (
    <Popover className={style.Popover} aria-label={arialLabel}>
      <Popover.Button className={style.PopoverButton}>{PopoverIcon}</Popover.Button>
      <Transition
        enter="transition duration-150 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <h1 className="duration-150"></h1>
        <Popover.Panel
          className={classNames(style.PopoverPanel, className)}
          aria-placeholder={emptyText}
          static
        >
          {children}
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}

interface CardLinkPopoverProps {
  href: string
  children: React.ReactNode
  className?: string
}

export const CardLinkPopover = ({
  href,
  children,
  className
}: CardLinkPopoverProps): JSX.Element => {
  return (
    <InternalLinkText href={href} className={`${style.CardPopover} ${className}`}>
      {children}
    </InternalLinkText>
  )
}

interface CardButtonPopoverProps {
  onClick: () => void
  children: React.ReactNode
  className?: string
}

export const CardButtonPopover = ({
  onClick,
  children,
  className
}: CardButtonPopoverProps): JSX.Element => {
  return (
    <button onClick={onClick} className={`${style.CardPopover} ${className}`}>
      {children}
    </button>
  )
}

export default ButtonWithPopover
