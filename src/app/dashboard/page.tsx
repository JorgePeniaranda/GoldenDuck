import Text from '@/components/atoms/text/Text'
import style from './styles.module.scss'
import ContainerWithNavbar from '@/components/pages/container-with-navbar'

export default function Dashboard() {
  return (
    <ContainerWithNavbar className={style.Dashboard}>
      <Text tag="h1" size="2rem" weight="700">
        Dashboard
      </Text>
    </ContainerWithNavbar>
  )
}
