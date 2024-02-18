import ExternalLinkText from '@/components/atoms/text/ExternalLinkText'
import Text from '@/components/atoms/text/Text'
import Image from 'next/image'
import style from './styles.module.scss'

export default function LycokatSection (): JSX.Element {
  return (
    <section id="Lycokat" className={style.Lycokat}>
      <Image
        src="/assets/img/logos/lycokat-yellow.svg"
        width={360}
        height={360}
        alt="lycokat-logo"
      />
      <article id="LycoKat">
        <Text>
          <ExternalLinkText href="https://lycokat.netlify.app/">
            Lycokat
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h14v-7h2v7q0 .825-.587 1.413T19 21zm4.7-5.3l-1.4-1.4L17.6 5H14V3h7v7h-2V6.4z"
              />
            </svg>
          </ExternalLinkText>
          es una empresa enfocada a la producción de software del más alto
          prestigio dentro del mercado de IT, en donde buscamos las necesidades
          del cliente y planificamos el proceso de elaboración del proyecto.
          Aplicamos la dosis justa y necesaria de personalidad propia, siempre
          cumpliendo las expectativas del cliente, e incluso superándolas.
          Siempre contando con el apoyo y asistencia posterior para el
          mantenimiento del proyecto, teniendo contacto directo con nosotros,
          los desarrolladores directo; Una de las características que nos hace
          destacar por encima de los demás.
        </Text>
      </article>
    </section>
  )
}
