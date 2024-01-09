import Navbar from "@/components/organisms/navbar/base";
import style from './styles.module.scss'

interface Props{
  children: React.ReactNode
  className?: string
}

export default function ContainerCenteredItemsWithNavbar({children, className}: Props) {
  return (
    <>
        <Navbar/>
        <main className={`${style.Container} ${className}`}>
            {children}
        </main>
    </>
  )
}
