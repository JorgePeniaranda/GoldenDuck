import Text from '@/components/atoms/text/Text'
import style from './styles.module.scss'
import ContainerCenteredItemsWithNavbar from '@/components/pages/container-centered-items-with-navbar'

export default function Dashboard() {
  return (
    <ContainerCenteredItemsWithNavbar className={style.Dashboard}>
      <Text tag="h1" size="2rem" weight="700">
        Dashboard
      </Text>
    </ContainerCenteredItemsWithNavbar>
  )
}
