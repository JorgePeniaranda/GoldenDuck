'use client'

import style from './styles.module.scss'
import Text from '@/components/atoms/text/Text'
import InternalLinkText from '@/components/atoms/text/InternalLinkText'
import FormWithValidation from '@/components/molecules/forms/FormWithValidation'
import BaseButton from '@/components/molecules/buttons/base-button'
import ContainerWithNavbar from '@/components/pages/container-with-navbar'
import { LoginForm } from '@/types'
import { LoginSchema, login } from '@/useCases/loginUseCase'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import ErrorSpan from '@/components/atoms/text/ErrorSpan'
import Alerts from '@/services/alertService'

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
  })

  const onSubmit = handleSubmit(async (form) => {
    await login(form)
      .then((res) => {
        Alerts.success(res.data.message, () =>
          window.location.replace('/dashboard'),
        )
      })
      .catch((err) => {
        Alerts.error(err.response.data.error)
      })
  })

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
        <FormWithValidation onSubmit={onSubmit}>
          <Text tag="h1" size={'1.9rem'} weight="700">
            Iniciar Sesión
          </Text>
          <label>
            <input type="text" placeholder="Email" {...register('email')} />
            <ErrorSpan show={!!errors.email}>{errors.email?.message}</ErrorSpan>
          </label>
          <label>
            <input
              type="password"
              placeholder="Contraseña"
              {...register('password')}
            />
            <ErrorSpan show={!!errors.password}>
              {errors.password?.message}
            </ErrorSpan>
          </label>
          <InternalLinkText href="/forgot">
            Olvide mi contraseña
          </InternalLinkText>
          <BaseButton
            yPadding="0.7rem"
            xPadding="1.6rem"
            fontColor="var(--white)"
          >
            Ingresar
          </BaseButton>
        </FormWithValidation>
      </section>
    </ContainerWithNavbar>
  )
}
