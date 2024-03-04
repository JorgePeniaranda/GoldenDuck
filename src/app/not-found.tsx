import React from 'react'
import Navbar from '@/components/organisms/navbar/base'
import Text from '@/components/atoms/text/Text'
import Image from 'next/image'
import InternalLinkText from '@/components/atoms/text/InternalLinkText'

export default function NotFound (): JSX.Element {
  return (
    <>
      <Navbar />
      <main>
        <section>
          <article className="w-full h-[calc(100dvh-var(--base-nav-height))] flex flex-col justify-center items-center gap-10 select-none">
            <figure className="transition hover:scale-110 h-3/4">
              <InternalLinkText href="/" arialLabel="Go Home" className='h-full'>
                <Image
                  src="/assets/img/designs/404.webp"
                  className='h-full object-contain'
                  width={500}
                  height={600}
                  alt="404 Página no encontrada"
                />
              </InternalLinkText>
            </figure>
            <Text size={'2rem'} weight="700">
              Página no encontrada
            </Text>
          </article>
        </section>
      </main>
    </>
  )
}
