'use client'

import style from './styles.module.scss'
import Text from '@/components/atoms/text/Text'
import InternalLinkText from '@/components/atoms/text/InternalLinkText'
import FormWithValidation from '@/components/molecules/forms/FormWithValidation'
import BaseButton from '@/components/molecules/buttons/base-button'
import BaseInput from '@/components/molecules/inputs/base-input'
import ContainerWithNavbar from '@/components/pages/container-with-navbar'
import { useState } from 'react'
import { LoginForm } from '@/types'
import { CheckForm, login } from '@/useCases/loginUseCase'

export default function Login() {
  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (CheckForm(form)) {
      await login(form)
    }
  }

  return (
    <ContainerWithNavbar className={style.LoginSection} itemsCentered={false}>
      <section className={style.TextSide}>
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
          href="/register"
          className="mt-40"
          xPadding="1rem"
          yPadding=".8rem"
          fontSize="1.1rem"
          fontWeight="500"
          fontColor="var(--white)"
        >
          Registrarse
        </BaseButton>
      </section>
      <section className={style.FormSide}>
        <FormWithValidation onSubmit={handleSubmit}>
          <Text tag="h1" size={'1.9rem'} weight="700">
            Iniciar Sesión
          </Text>
          <BaseInput
            type="text"
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            BaseStyle={false}
          />
          <BaseInput
            type="password"
            placeholder="Contraseña"
            name="password"
            value={form.password}
            onChange={handleChange}
            BaseStyle={false}
          />
          <InternalLinkText href="/forgot">
            Olvide mi contraseña
          </InternalLinkText>
          <BaseButton yPadding="0.7rem" xPadding="1.6rem" fontColor="var(--white)">
            Ingresar
          </BaseButton>
        </FormWithValidation>
      </section>
    </ContainerWithNavbar>
  )
}
