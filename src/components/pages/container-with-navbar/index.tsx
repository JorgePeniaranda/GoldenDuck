import Navbar from '@/components/organisms/navbar/base'
import style from './styles.module.scss'

interface Props {
  children: React.ReactNode
  className?: string
  itemsCentered?: boolean
}

export default function ContainerWithNavbar({
  children,
  className,
  itemsCentered = true,
}: Props) {
  return (
    <>
      <Navbar />
      <main
        className={`${style.Container} ${className} ${itemsCentered && style.CenterItems}`}
      >
        {children}
      </main>
    </>
  )
}
