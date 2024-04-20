import React from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import { type CSSProperties, type ReactNode } from 'react'

interface Props {
  href: string
  children?: ReactNode
  arialLabel?: string
  className?: string
  style?: CSSProperties
}

export default function InternalLinkText ({
  href,
  children,
  arialLabel,
  className,
  style
}: Props): JSX.Element {
  const classes = classNames(className)

  return (
    <Link href={href} aria-label={arialLabel} className={classes} style={style}>
      {children}
    </Link>
  )
}
