import Navbar from '@/components/organisms/navbar/base'
import style from './styles.module.scss'
import classNames from 'classnames'

interface Props {
  children: React.ReactNode
  className?: string
  itemsCentered?: boolean
}

export default function ContainerWithNavbar ({
  children,
  className,
  itemsCentered = true
}: Props): JSX.Element {
  const classes = classNames(style.Container, className, {
    [style.CenterItems]: itemsCentered
  })

  return (
    <>
      <Navbar />
      <main className={classes}>{children}</main>
    </>
  )
}
