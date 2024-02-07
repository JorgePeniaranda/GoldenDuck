import { InputProps } from '@/types'
import styles from './styles.module.scss'
import classNames from 'classnames'

interface Props {
  className?: string
  BaseStyle?: boolean
  [props: string]: any
}

export default function BaseInput({
  className,
  BaseStyle,
  ...props
}: Props) {
  const classes = classNames({ [styles.BaseInput]: BaseStyle }, className)

  return (
    <input
      className={classes}
      {...props}
    />
  )
}
