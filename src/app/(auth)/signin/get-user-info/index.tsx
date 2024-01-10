import Text from '@/components/atoms/text/Text'
import style from './styles.module.scss'
import InternalLinkText from '@/components/atoms/text/InternalLinkText'
import FormWithValidation from '@/components/molecules/forms/FormWithValidation'
import BaseButton from '@/components/molecules/buttons/base-button'
import { formActions } from '@/types'

export default function GetUserInfo({ next, back, submit }: formActions) {
  return (
    <FormWithValidation onSubmit={next} className={style.SignIn}>
      <section>
        <Text tag="h2">Datos</Text>
        <article>
          <input type="text" placeholder="Nombre" required />
          <input type="text" placeholder="Apellido" required />
          <input type="text" placeholder="DNI" required />
        </article>
      </section>
      <section>
        <Text tag="h2">Cuenta y Contacto</Text>
        <article>
          <input type="text" placeholder="Email" required />
          <input type="text" placeholder="Télefono" required />
          <input type="text" placeholder="Contraseña" required />
        </article>
      </section>
      <section>
        <Text tag="h2">Información</Text>
        <article>
          <input type="text" placeholder="Domicilio" required />
          <label>
            <input type="date" />
            Fecha de Nacimiento
          </label>
          <div id="sex">
            <label>
              <input type="radio" name="sex" required />
              Masculino
            </label>
            <label>
              <input type="radio" name="sex" required />
              Femenino
            </label>
          </div>
        </article>
      </section>
      <Text>
        Al continuar y enviar este formulario aceptá los{' '}
        <InternalLinkText href="/TermsAndConditions">
          Terminos y Condiciones
        </InternalLinkText>{' '}
        de Golden Duck
      </Text>
      <BaseButton fontSize="1.1rem">Siguiente</BaseButton>
    </FormWithValidation>
  )
}
