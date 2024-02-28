'use client'

import React from 'react'
import { Cursor, useTypewriter } from 'react-simple-typewriter'

interface Props {
  words: string[]
  cursor?: boolean
}

export default function TypewriterText ({
  words,
  cursor = true
}: Props): JSX.Element {
  const [text] = useTypewriter({
    words,
    loop: 0,
    typeSpeed: 50,
    deleteSpeed: 30,
    delaySpeed: 1000
  })

  return (
    <>
      {text}
      {cursor && <Cursor cursorStyle="|" />}
    </>
  )
}
