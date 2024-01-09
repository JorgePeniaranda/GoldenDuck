import Text from '@/components/atoms/text/Text'
import style from './styles.module.scss'
import InternalLinkText from '@/components/atoms/text/InternalLinkText'
import FormWithValidation from '@/components/molecules/forms/FormWithValidation'
import BaseButton from '@/components/molecules/buttons/BaseButton'
import Image from 'next/image'

export default function Login() {
  return (
    <main>
      <section>
        <article>
          <Image
            src="/assets/img/logos/GoldenDuck.webp"
            alt="Logo"
            width={100}
            height={100}
          />
          <Text tag="h1">Cambiar Contraseña</Text>
        </article>
        <FormWithValidation>
          <label>
            Email:
            <input type="email" name="email" />
          </label>
          <BaseButton>Siguiente</BaseButton>
        </FormWithValidation>
        <InternalLinkText href="">asd</InternalLinkText>
      </section>
    </main>
  )
}
