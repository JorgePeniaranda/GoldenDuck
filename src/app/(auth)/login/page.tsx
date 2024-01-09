import Navbar from '@/components/organisms/navbar/base'
import style from './styles.module.scss'
import Text from '@/components/atoms/text/Text'
import InternalLinkText from '@/components/atoms/text/InternalLinkText'
import FormWithCheck from '@/components/molecules/forms/FormWithCheck'

export default function Login() {
  return (
    <>
      <Navbar/>
      <main className={style.LoginSection}>
        <section>
          <article>
            <Text tag='h1' size={"2.6rem"} weight='800'>Crear tu cuenta Golden Duck ahora mismo</Text>
            <Text>¡Registrate para obtener los beneficios que Golden Duck te ofrece!</Text>
          </article>
          <InternalLinkText href='/signin'>Registrarse</InternalLinkText>
        </section>
        <section>
          <FormWithCheck>
            <Text tag='h1' size={"1.9rem"} weight='700'>Iniciar Sesión</Text>
            <input type="text" placeholder='Usuario'/>
            <input type="password" placeholder='Contraseña'/>
            <InternalLinkText href='/forgot'>Olvide mi contraseña</InternalLinkText>
            <button>Ingresar</button>
          </FormWithCheck>
        </section>
      </main>
    </>
  )
}
