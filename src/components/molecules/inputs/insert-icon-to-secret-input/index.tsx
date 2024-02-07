import styles from './styles.module.scss'
import { ReactNode } from 'react'
import classNames from 'classnames'

interface Props {
  icon: ReactNode
  show: boolean
  setShow: (show: boolean) => void
  position?: 'left' | 'right'
  className?: string
  children: ReactNode
}

export default function InsertIconToSecretInput({
  icon,
  show,
  setShow,
  position = 'left',
  className,
  children,
}: Props) {
  const classes = classNames(styles.InputWithIcon, className)

  return (
    <div className={classes} id={position}>
      {position === 'left' && icon}
      {children}
      {show ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          onClick={() => setShow(false)}
        >
          <path
            fill="currentColor"
            d="M12 9a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-4.5c5 0 9.27 3.11 11 7.5c-1.73 4.39-6 7.5-11 7.5S2.73 16.39 1 12c1.73-4.39 6-7.5 11-7.5M3.18 12a9.821 9.821 0 0 0 17.64 0a9.821 9.821 0 0 0-17.64 0"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          onClick={() => setShow(true)}
        >
          <path
            fill="currentColor"
            d="M12 17.5c-3.8 0-7.2-2.1-8.8-5.5H1c1.7 4.4 6 7.5 11 7.5s9.3-3.1 11-7.5h-2.2c-1.6 3.4-5 5.5-8.8 5.5"
          />
        </svg>
      )}
    </div>
  )
}
