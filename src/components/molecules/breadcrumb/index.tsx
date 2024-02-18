'use client'

import { usePathname } from 'next/navigation'
import Text from '../../atoms/text/Text'
import style from './styles.module.scss'
import InternalLinkText from '@/components/atoms/text/InternalLinkText'

export default function Breadcrumb (): JSX.Element {
  const path = usePathname()
  const urls = path.split('/').slice(1)

  return (
    <div className={style.Breadcrumb}>
      {urls?.map((url, index) => {
        if (index === urls.length - 1) {
          return (
            <Text key={index} tag="span" weight="600">
              {url}
            </Text>
          )
        } else {
          return (
            <InternalLinkText key={index} href={`/${urls.slice(0, index + 1).join('/')}`}>
              {url} /{' '}
            </InternalLinkText>
          )
        }
      })}
    </div>
  )
}
