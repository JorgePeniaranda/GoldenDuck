import Text from '@/components/atoms/text/Text'
import React from 'react'

interface Props {
  text: string
  Logo: React.ReactNode
}

export default function ContentWithTitleCard({ text, Logo }: Props) {
  return (
    <article className="card">
      {Logo}
      <Text tag="h2" weight="700">
        {text}
      </Text>
    </article>
  )
}
