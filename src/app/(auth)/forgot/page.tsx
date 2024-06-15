'use client'

import React, { useState } from 'react'
import ErrorSpan from '@/components/atoms/text/ErrorSpan'
import InternalLinkText from '@/components/atoms/text/InternalLinkText'
import Text from '@/components/atoms/text/Text'
import BaseButton from '@/components/molecules/buttons/base-button'
import InsertIconToInput from '@/components/molecules/inputs/insert-icon-to-input'
import InsertIconToSecretInput from '@/components/molecules/inputs/insert-icon-to-secret-input'
import { type ForgotForm } from '@/types'
import { onSubmitCodeForm, onSubmitEmailForm, onSubmitPasswordForm } from '@/modules/authentication/use-cases/forgot'
import { zodResolver } from '@hookform/resolvers/zod'
import ReactCodeInput from 'react-code-input'
import { useForm } from 'react-hook-form'
import style from './styles.module.scss'
import { ForgotSchema } from '@/modules/authentication/schemas/forgot'
import useStep from '@/hooks/use-step'
import { ForgotConfig } from '@/constants/configurations/Forgot'

export default function Forgot(): React.ReactNode {
  const { step, handleNext, handleBack } = useStep()
  const [code, setcode] = useState<string>('')
  const [showPasswords, setShowPasswords] = useState<boolean>(false)
  const EmailForm = useForm<ForgotForm>({
    resolver: zodResolver(ForgotSchema.Email)
  })
  const PasswordForm = useForm<ForgotForm>({
    resolver: zodResolver(ForgotSchema.Password)
  })

  return (
    <>
      {step === 0 && (
        <form
          onSubmit={EmailForm.handleSubmit(async form => {
            await onSubmitEmailForm(form, handleNext)
          })}
        >
          <label>
            Email:
            <InsertIconToInput icon={ForgotConfig.EmailIcon}>
              <input type="text" autoFocus {...EmailForm.register('email')} />
            </InsertIconToInput>
            <ErrorSpan show={EmailForm.formState.errors.email !== undefined} align="center">
              {EmailForm.formState.errors.email?.message}
            </ErrorSpan>
          </label>
          <BaseButton
            fontSize="1.2rem"
            fontColor="var(--white)"
            loading={EmailForm.formState.isSubmitting}
          >
            Siguiente
          </BaseButton>
        </form>
      )}
      {step === 1 && (
        <form
          onSubmit={EmailForm.handleSubmit(async form => {
            await onSubmitCodeForm(form, code, handleNext)
          })}
          className={style.ConfirmUserEmail}
        >
          <Text>
            Compruebe el correo <span>{EmailForm.watch('email')}</span> para encontrar el codigo de
            verificación, recuerda que puede encontrarse en {'"spam"'}
          </Text>
          <ReactCodeInput
            type="text"
            name="EmailCode"
            inputMode="email"
            fields={6}
            value={code}
            onChange={e => {
              setcode(e)
            }}
            autoFocus
          />
          <BaseButton
            fontSize="1.2rem"
            fontColor="var(--white)"
            loading={EmailForm.formState.isSubmitting}
          >
            Siguiente
          </BaseButton>
        </form>
      )}
      {step === 2 && (
        <form
          onSubmit={PasswordForm.handleSubmit(async form => {
            await onSubmitPasswordForm(form, EmailForm.watch('email'))
          })}
        >
          <label>
            Nueva contraseña:
            <InsertIconToSecretInput
              icon={ForgotConfig.PasswordIcon}
              show={showPasswords}
              setShow={setShowPasswords}
            >
              <input
                type={showPasswords ? 'text' : 'password'}
                autoFocus
                {...PasswordForm.register('password')}
              />
            </InsertIconToSecretInput>
          </label>
          <ErrorSpan show={PasswordForm.formState.errors.password !== undefined} align="center">
            {PasswordForm.formState.errors.password?.message}
          </ErrorSpan>
          <label>
            Confirme su nueva contraseña:
            <InsertIconToSecretInput
              icon={ForgotConfig.PasswordIcon}
              show={showPasswords}
              setShow={setShowPasswords}
            >
              <input
                type={showPasswords ? 'text' : 'password'}
                autoFocus
                {...PasswordForm.register('confirmPassword')}
              />
            </InsertIconToSecretInput>
          </label>
          <ErrorSpan
            show={PasswordForm.formState.errors.confirmPassword !== undefined}
            align="center"
          >
            {PasswordForm.formState.errors.confirmPassword?.message}
          </ErrorSpan>
          <BaseButton
            fontSize="1.2rem"
            fontColor="var(--white)"
            loading={PasswordForm.formState.isSubmitting}
          >
            Siguiente
          </BaseButton>
        </form>
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
