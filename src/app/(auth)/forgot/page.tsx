'use client'

import style from './styles.module.scss'
import { useState } from 'react'
import InternalLinkText from '@/components/atoms/text/InternalLinkText'
import InsertIconToInput from '@/components/molecules/inputs/insert-icon-to-input'
import { EmailIcon, PasswordIcon } from '@/const/ForgotConst'
import ErrorSpan from '@/components/atoms/text/ErrorSpan'
import BaseButton from '@/components/molecules/buttons/base-button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ForgotEmailSchema, ForgotPasswordSchema, UpdatePassword, checkConfirmationCode, generateConfirmationCode } from '@/useCases/forgotUseCase'
import { ForgotForm } from '@/types'
import Text from '@/components/atoms/text/Text'
import ReactCodeInput from 'react-code-input'
import { ErrorsHandler, ValidationError } from '@/services/errorService'
import Alerts from '@/services/alertService'


export default function Forgot() {
  const [step, setStep] = useState<number>(0)
  const [code, setcode] = useState<string>('')
  const EmailForm = useForm<ForgotForm>({
    resolver: zodResolver(ForgotEmailSchema),
  })
  const PasswordForm = useForm<ForgotForm>({
    resolver: zodResolver(ForgotPasswordSchema),
  })

  const onSubmitEmailForm = EmailForm.handleSubmit(async () => {
    try{
      await generateConfirmationCode(EmailForm.watch("email")).catch((err) => {
        throw new ValidationError(err.response.data.error)
      })

      return setStep(step + 1)
    } catch(e){
      const {error} = ErrorsHandler(e)
      return Alerts.error(error)
    }
  })
  
  const onSubmitCodeForm = EmailForm.handleSubmit(async () => {
    try{
      await checkConfirmationCode(EmailForm.watch("email"), code).catch((err) => {
        throw new ValidationError(err.response.data.error)
      })

      return setStep(step + 1)
    } catch(e){
      const {error} = ErrorsHandler(e)
      return Alerts.error(error)
    }
  })
  
  const onSubmitPasswordForm = PasswordForm.handleSubmit(async (form) => {
    try{
      if(PasswordForm.watch("password") !== PasswordForm.watch("confirmPassword"))
        return Alerts.warning("Las contraseñas no coinciden")

      await UpdatePassword({...form, email: EmailForm.watch("email")}).catch((err) => {
        throw new ValidationError(err.response.data.error)
      })

      return Alerts.success('Se ha actualizado la contraseña exitosamente', () => {
        location.href = '/dashboard'
      })
    } catch(e){
      const {error} = ErrorsHandler(e)
      return Alerts.error(error)
    }
  })

  const handleBack = () => {
    setStep(step - 1)
  }

  return (
    <>
        {step === 0 && 
        <form onSubmit={onSubmitEmailForm}>
          <label>
            Email:
            <InsertIconToInput icon={EmailIcon}>
              <input
                type="text"
                autoFocus
                {...EmailForm.register('email')}
              />
            </InsertIconToInput>
            <ErrorSpan show={!!EmailForm.formState.errors.email} align="center">
              {EmailForm.formState.errors.email?.message}
            </ErrorSpan>
          </label>
          <BaseButton fontSize="1.2rem" fontColor="var(--white)" loading={EmailForm.formState.isSubmitting}>
            Siguiente
          </BaseButton>
        </form>
        }
        {step === 1 && (
          <form onSubmit={onSubmitCodeForm}
      className={style.ConfirmUserEmail}>
            <Text>
              Compruebe el correo <span>{EmailForm.watch("email")}</span> para encontrar el codigo
              de verificación, recuerda que puede encontrarse en {'"spam"'}
            </Text>
            <ReactCodeInput
              type="text"
              name="EmailCode"
              inputMode="email"
              fields={6}
              value={code}
              onChange={(e) => setcode(e)}
              autoFocus
            />
            <BaseButton fontSize="1.2rem" fontColor="var(--white)" loading={EmailForm.formState.isSubmitting}>
              Siguiente
            </BaseButton>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={onSubmitPasswordForm}>
            <label>
              Nueva contraseña:
              <InsertIconToInput icon={PasswordIcon}>
                <input 
                  type="password"
                  autoFocus
                  {...PasswordForm.register('password')}
                />
              </InsertIconToInput>
            </label>
            <ErrorSpan show={!!PasswordForm.formState.errors.password} align="center">
              {PasswordForm.formState.errors.password?.message}
            </ErrorSpan>
            <label>
              Confirme su nueva contraseña:
              <InsertIconToInput icon={PasswordIcon}>
                <input 
                  type="password"
                  autoFocus
                  {...PasswordForm.register('confirmPassword')}
                />
              </InsertIconToInput>
            </label>
            <ErrorSpan show={!!PasswordForm.formState.errors.confirmPassword} align="center">
              {PasswordForm.formState.errors.confirmPassword?.message}
            </ErrorSpan>
            <BaseButton fontSize="1.2rem" fontColor="var(--white)" loading={PasswordForm.formState.isSubmitting}>
              Siguiente
            </BaseButton>
          </form>
          
          )}
      {step === 0 ? <InternalLinkText href="/login" className={style.LinkStyle}>
        Ya tengo una cuenta
      </InternalLinkText>:
      <p onClick={handleBack} className={style.LinkStyle}>
        Volver
      </p>}
    </>
  )
}
