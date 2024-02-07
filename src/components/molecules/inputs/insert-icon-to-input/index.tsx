import styles from './styles.module.scss'
import BaseInput from '../base-input'
import { ReactNode } from 'react'
import { InputProps } from '@/types'
import classNames from 'classnames'

interface Props {
  icon: ReactNode
  position?: 'left' | 'right'
  className?: string
  children: ReactNode
}

export default function InsertIconToInput({
  icon,
  position = 'left',
  className,
  children
}: Props) {
  const classes = classNames(styles.InputWithIcon, className)

  return (
    <div className={classes} id={position}>
      {position === 'left' && icon}
      {children}
      {position === 'right' && icon}
    </div>
  )
}
