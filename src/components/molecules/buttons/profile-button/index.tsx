import Text from '@/components/atoms/text/Text'
import Image from 'next/image'
import style from './styles.module.scss'

interface Props {
  src?: string
  name: string
}

export default function ProfileButton({
  src = '/assets/img/misc/default-pfp.webp',
  name,
}: Props) {
  return (
    <div className={style.Profile}>
      <Image src={src} width={32} height={32} alt="Profile Picture" />
      <Text tag="h3">
        Hola,{' '}
        <Text tag="span" size={'inherit'} weight="700">
          {name}
        </Text>
      </Text>
    </div>
  )
}
