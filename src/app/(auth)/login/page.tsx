import Navbar from '@/components/organisms/navbar/base'
import style from './styles.module.scss'
import Text from '@/components/atoms/text/Text'
import InternalLinkText from '@/components/atoms/text/InternalLinkText'
import FormWithValidation from '@/components/molecules/forms/FormWithValidation'
import BaseButton from '@/components/molecules/buttons/BaseButton'

export default function Login() {
  return (
    <>
      <Navbar />
      <main className={style.LoginSection}>
        <section>
          <article>
            <Text tag="h1" size={'2.6rem'} weight="800">
              Crear tu cuenta Golden Duck ahora mismo
            </Text>
            <Text>
              ¡Registrate para obtener los beneficios que Golden Duck te ofrece!
            </Text>
          </article>
          <BaseButton
            type="InternalLinkText"
            href="/signin"
            className="mt-40"
            xPadding="1rem"
            yPadding=".8rem"
            fontSize="1.1rem"
            fontWeight="500"
          >
            Registrarse
          </BaseButton>
        </section>
        <section>
          <FormWithValidation>
            <Text tag="h1" size={'1.9rem'} weight="700">
              Iniciar Sesión
            </Text>
            <input type="text" placeholder="Usuario" />
            <input type="password" placeholder="Contraseña" />
            <InternalLinkText href="/forgot">
              Olvide mi contraseña
            </InternalLinkText>
            <BaseButton yPadding="0.7rem" xPadding="1.6rem">
              Ingresar
            </BaseButton>
          </FormWithValidation>
        </section>
      </main>
    </>
  )
}
