import React from 'react'
import style from './styles.module.scss'
import classNames from 'classnames'

interface Props {
  show: boolean
  children?: string
  align?: 'center' | 'left' | 'right'
  className?: string
}

export default function ErrorSpan ({ children, show, align, className }: Props): JSX.Element | undefined {
  const classes = classNames(style.error, className, {
    'text-center': align === 'center',
    'text-start': align === 'left',
    'text-end': align === 'right'
  })

  if (!show) return

  return <span className={classes}>{children}</span>
}
