import Alerts from '@/services/alertService'
import { ErrorsHandler, ValidationError } from '@/services/errorService'
import validations from '@/services/validationService'
import { type ForgotForm } from '@/types'
import axios, { type AxiosResponse } from 'axios'
import { z } from 'zod'

export const ForgotEmailSchema = z.object({
  email: validations.email
})

export const ForgotPasswordSchema = z.object({
  password: validations.password,
  confirmPassword: validations.password
})

export const generateConfirmationCode = async (email: string): Promise<AxiosResponse> =>
  await axios.get(`/api/forgot/${email}`)

export const checkConfirmationCode = async (email: string, code: string): Promise<AxiosResponse> =>
  await axios.post(`/api/forgot/${email}`, { code })

export const UpdatePassword = async (ForgotForm: ForgotForm): Promise<AxiosResponse> =>
  await axios.post('/api/forgot', ForgotForm)


export const handleNext = (step: number, setStep: (number: number) => void): void => {
  setStep(step + 1)
}

export const handleBack = (step: number, setStep: (number: number) => void): void => {
  setStep(step - 1)
}

export const onSubmitEmailForm = async (form: { email: string }, step: number, setStep: (number: number) => void) => {
  try {
    await generateConfirmationCode(form.email).catch((err) => {
      throw new ValidationError(err.response.data.error as string)
    })

    handleNext(step, setStep)
  } catch (e) {
    const { error } = ErrorsHandler(e)
    Alerts.error(error)
  }
}

export const onSubmitCodeForm = async (form: { email: string }, code: string, step: number, setStep: (number: number) => void) => {
  try {
    await checkConfirmationCode(form.email, code).catch(
      (err) => {
        throw new ValidationError(err.response.data.error as string)
      }
    )

    handleNext(step, setStep)
  } catch (e) {
    const { error } = ErrorsHandler(e)
    Alerts.error(error)
  }
}

export const onSubmitPasswordForm = async (form: ForgotForm, email: string) => {
  try {
    if (
      form.password !== form.confirmPassword
    ) { Alerts.warning('Las contraseñas no coinciden'); return }

    await UpdatePassword({ ...form, email: email }).catch(
      (err) => {
        throw new ValidationError(err.response.data.error as string)
      }
    )

    Alerts.success(
      'Se ha actualizado la contraseña exitosamente',
      () => {
        location.href = '/dashboard'
      }
    )
  } catch (e) {
    const { error } = ErrorsHandler(e)
    Alerts.error(error)
  }
}