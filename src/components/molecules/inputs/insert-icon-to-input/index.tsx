import styles from './styles.module.scss'
import { type ReactNode } from 'react'
import classNames from 'classnames'

interface Props {
  icon: ReactNode
  position?: 'left' | 'right'
  className?: string
  children: ReactNode
}

export default function InsertIconToInput ({
  icon,
  position = 'left',
  className,
  children
}: Props): JSX.Element {
  const classes = classNames(styles.InputWithIcon, className)

  return (
    <div className={classes} id={position}>
      {position === 'left' && icon}
      {children}
      {position === 'right' && icon}
    </div>
  )
}
