import Text from '@/components/atoms/text/Text'
import style from './styles.module.scss'
import InternalLinkText from '@/components/atoms/text/InternalLinkText'
import FormWithValidation from '@/components/molecules/forms/FormWithValidation'
import BaseButton from '@/components/molecules/buttons/base-button'
import { SignupForm, formActions } from '@/types'
import { CheckForm } from '@/useCases/signupUseCase'

interface Props {
  FormActions: formActions
  form: SignupForm
  setForm: React.Dispatch<React.SetStateAction<SignupForm>>
}

export default function GetUserInfo({ FormActions, form, setForm }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (CheckForm(form)) {
      FormActions.next()
    }
  }

  return (
    <FormWithValidation onSubmit={handleSubmit} className={style.SignIn}>
      <section>
        <Text tag="h2">Datos</Text>
        <article>
          <input
            type="text"
            placeholder="nombre"
            value={form.name}
            name="name"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="apellido"
            value={form.lastName}
            name="lastName"
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="dni"
            value={form.dni}
            name="dni"
            onChange={handleChange}
          />
        </article>
      </section>
      <section>
        <Text tag="h2">Cuenta y Contacto</Text>
        <article>
          <input
            type="email"
            placeholder="email"
            value={form.email}
            name="email"
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="telefono"
            value={form.phoneNumber}
            name="phoneNumber"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="contraseña"
            value={form.password}
            name="password"
            onChange={handleChange}
          />
        </article>
      </section>
      <section>
        <Text tag="h2">Información</Text>
        <article>
          <input
            type="text"
            placeholder="domicilio"
            value={form.address}
            name="address"
            onChange={handleChange}
          />
          <label>
            <input
              type="date"
              name="birthDate"
              value={form.birthDate}
              onChange={handleChange}
            />
            Fecha de Nacimiento
          </label>
          <div id="sex">
            <label>
              <input
                type="radio"
                name="sex"
                value="male"
                checked={form.sex === 'male'}
                onChange={handleChange}
              />
              Masculino
            </label>
            <label>
              <input
                type="radio"
                name="sex"
                value="female"
                checked={form.sex === 'female'}
                onChange={handleChange}
              />
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
