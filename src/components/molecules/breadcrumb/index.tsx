import Text from '../../atoms/text/Text'
import { headers } from 'next/headers';
import style from './styles.module.scss'
import InternalLinkText from '@/components/atoms/text/InternalLinkText';

export default function Breadcrumb() {
  const path  = headers().get("next-url")
  const urls = path?.split("/").slice(1)

  return <div className={style.Breadcrumb}>
    {urls?.map((url, index) => {
      if (index === urls.length - 1) return <Text key={index} tag='span' weight='600'>
        {url}
      </Text>
      else return <InternalLinkText href={urls.slice(0, index + 1).join("/")}>{url} / </InternalLinkText>
    })}
  </div>
}
