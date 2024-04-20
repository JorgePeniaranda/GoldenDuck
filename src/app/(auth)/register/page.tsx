'use client'

import React, { useState } from 'react'
import ErrorSpan from '@/components/atoms/text/ErrorSpan'
import InternalLinkText from '@/components/atoms/text/InternalLinkText'
import Text from '@/components/atoms/text/Text'
import BaseButton from '@/components/molecules/buttons/base-button'
import ConvertToSecretInput from '@/components/molecules/inputs/convert-to-secret-input'
import { type RegisterForm } from '@/types'
import { onSubmitCode, onSubmitData } from '@/useCases/register'
import ReactCodeInput from 'react-code-input'
import { useForm } from 'react-hook-form'
import style from './styles.module.scss'
import { RegisterSchema } from '@/schemas/register'
import { UserEntitySex } from '@/types/entities.d'
import { zodResolver } from '@hookform/resolvers/zod'
import useStep from '@/hooks/use-step'

export default function Register (): React.ReactNode {
  const { step, handleNext, handleBack } = useStep()
  const [code, setCode] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<RegisterForm>({
    resolver: zodResolver(RegisterSchema)
  })

  return (
    <>
      {step === 0 && (
        <form
          onSubmit={handleSubmit(async form => {
            await onSubmitData(form, handleNext)
          })}
          className={style.GetInfo}
        >
          <section>
            <Text tag="h2">Datos</Text>
            <article>
              <label>
                <input type="text" placeholder="nombre" {...register('name')} />
                <ErrorSpan show={errors.name !== undefined} align="center">
                  {errors.name?.message}
                </ErrorSpan>
              </label>
              <label>
                <input type="text" placeholder="apellido" {...register('lastName')} />
                <ErrorSpan show={errors.lastName !== undefined} align="center">
                  {errors.lastName?.message}
                </ErrorSpan>
              </label>
              <label>
                <input type="number" placeholder="dni" {...register('dni')} />
                <ErrorSpan show={errors.dni !== undefined} align="center">
                  {errors.dni?.message}
                </ErrorSpan>
              </label>
            </article>
          </section>
          <section>
            <Text tag="h2">Cuenta y Contacto</Text>
            <article>
              <label>
                <input type="email" placeholder="email" {...register('email')} />
                <ErrorSpan show={errors.email !== undefined} align="center">
                  {errors.email?.message}
                </ErrorSpan>
              </label>
              <label>
                <input type="number" placeholder="telefono" {...register('phoneNumber')} />
                <ErrorSpan show={errors.phoneNumber !== undefined} align="center">
                  {errors.phoneNumber?.message}
                </ErrorSpan>
              </label>
              <label>
                <ConvertToSecretInput show={showPassword} setShow={setShowPassword}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="contraseña"
                    {...register('password')}
                  />
                </ConvertToSecretInput>
                <ErrorSpan show={errors.password !== undefined} align="center">
                  {errors.password?.message}
                </ErrorSpan>
              </label>
            </article>
          </section>
          <section>
            <Text tag="h2">Información</Text>
            <article>
              <label>
                <input type="text" placeholder="domicilio" {...register('address')} />
                <ErrorSpan show={errors.address !== undefined} align="center">
                  {errors.address?.message}
                </ErrorSpan>
              </label>
              <label>
                <input type="date" {...register('birthDate')} />
                Fecha de Nacimiento
                <ErrorSpan show={errors.birthDate !== undefined} align="center">
                  {errors.birthDate?.message}
                </ErrorSpan>
              </label>
              <div id="sex">
                <label>
                  <input type="radio" value={UserEntitySex.MALE} {...register('sex')} />
                  Masculino
                  <ErrorSpan show={errors.sex !== undefined} align="center">
                    {errors.sex?.message?.toString()}
                  </ErrorSpan>
                </label>
                <label>
                  <input type="radio" value={UserEntitySex.FEMALE} {...register('sex')} />
                  Femenino
                  <ErrorSpan show={errors.sex !== undefined} align="center">
                    {errors.sex?.message?.toString()}
                  </ErrorSpan>
                </label>
              </div>
            </article>
          </section>
          <Text>
            Al continuar y enviar este formulario aceptá los{' '}
            <InternalLinkText href="/terms-and-conditions">Terminos y Condiciones</InternalLinkText>{' '}
            de Golden Duck
          </Text>
          <BaseButton fontSize="1.1rem" fontColor="var(--white)" loading={isSubmitting}>
            Siguiente
          </BaseButton>
        </form>
      )}

      {step === 1 && (
        <section className={style.ConfirmUserInfo}>
          <article>
            <Text size={'1.1rem'}>
              Revisa tu mail{' '}
              <Text tag="span" weight="700">
                {watch('email')}
              </Text>{' '}
              e ingresa el código recibido, Si no lo encuentras prueba buscarlo en la categoria{' '}
              {'"Spam"'}
            </Text>
          </article>
          <form
            onSubmit={handleSubmit(async form => {
              await onSubmitCode(form, code)
            })}
          >
            <ReactCodeInput
              type="text"
              fields={6}
              inputMode="email"
              value={code}
              name="EmailCode"
              onChange={e => {
                setCode(e)
              }}
            />
            <BaseButton fontSize="1.1rem" fontColor="var(--white)" loading={isSubmitting}>
              Confirmar
            </BaseButton>
          </form>
        </section>
      )}
      {step === 0
        ? (
        <InternalLinkText href="/login" className={style.LinkStyle}>
          Ya tengo una cuenta
        </InternalLinkText>
          )
        : (
        <p onClick={handleBack} className={style.LinkStyle}>
          Volver
        </p>
          )}
    </>
  )
}
