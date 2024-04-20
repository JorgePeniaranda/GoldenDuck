'use client'

import React from 'react'
import ErrorSpan from '@/components/atoms/text/ErrorSpan'
import InternalLinkText from '@/components/atoms/text/InternalLinkText'
import Text from '@/components/atoms/text/Text'
import BaseButton from '@/components/molecules/buttons/base-button'
import ContainerWithNavbar from '@/components/pages/container-with-navbar'
import { LoginSchema } from '@/schemas/login'
import { type LoginForm } from '@/types'
import { LoginUseCase } from '@/useCases/loginUseCase'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import style from './styles.module.scss'

export default function Login (): React.ReactNode {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema)
  })

  return (
    <ContainerWithNavbar className={style.LoginSection} itemsCentered={false}>
      <section className={style.TextSide}>
        <article>
          <Text tag="h1" size={'2.6rem'} weight="800">
            Crear tu cuenta Golden Duck ahora mismo
          </Text>
          <Text>¡Registrate para obtener los beneficios que Golden Duck te ofrece!</Text>
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
        <form onSubmit={handleSubmit(LoginUseCase.onSubmit)}>
          <Text tag="h1" size={'1.9rem'} weight="700">
            Iniciar Sesión
          </Text>
          <label>
            <input type="text" placeholder="Email" {...register('email')} />
            <ErrorSpan show={errors.email !== undefined}>{errors.email?.message}</ErrorSpan>
          </label>
          <label>
            <input type="password" placeholder="Contraseña" {...register('password')} />
            <ErrorSpan show={errors.password !== undefined}>{errors.password?.message}</ErrorSpan>
          </label>
          <InternalLinkText href="/forgot">Olvide mi contraseña</InternalLinkText>
          <BaseButton
            yPadding="0.7rem"
            xPadding="1.6rem"
            fontColor="var(--white)"
            loading={isSubmitting}
          >
            Ingresar
          </BaseButton>
        </form>
      </section>
    </ContainerWithNavbar>
  )
}
