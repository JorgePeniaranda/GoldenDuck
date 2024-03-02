import { changePassword, checkCode, generateCode } from '@/api'
import { ValidationDictionary } from '@/const/messages'
import Alerts from '@/services/alertService'
import {
  ErrorsHandler,
  RequestError,
  ValidationError
} from '@/services/errorService'
import validations from '@/services/validationService'
import { type ForgotForm } from '@/types'
import { z } from 'zod'

export const ForgotSchema = z
  .object({
    email: validations.email,
    password: validations.password,
    confirmPassword: validations.confirmPassword
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: ValidationDictionary.confirmPassword.match,
    path: ['confirmPassword']
  })

export const ForgotEmailSchema = z.object({
  email: validations.email
})

export const ForgotPasswordSchema = z
  .object({
    password: validations.password,
    confirmPassword: validations.confirmPassword
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: ValidationDictionary.confirmPassword.match,
    path: ['confirmPassword']
  })

export const onSubmitEmailForm = async (
  form: { email: string },
  callback?: () => void
): Promise<void> => {
  try {
    await generateCode(form.email).catch((error) => {
      throw new RequestError(error.response.data.error.message)
    })

    if (typeof callback === 'function') callback()
  } catch (error) {
    const { message } = ErrorsHandler(error)
    Alerts.error(message)
  }
}

export const onSubmitCodeForm = async (
  form: { email: string },
  code: string,
  callback?: () => void
): Promise<void> => {
  try {
    await checkCode(code).catch((error) => {
      throw new RequestError(error.response.data.error.message)
    })

    if (typeof callback === 'function') callback()
  } catch (error) {
    const { message } = ErrorsHandler(error)
    Alerts.error(message)
  }
}

export const onSubmitPasswordForm = async (
  form: ForgotForm,
  email: string
): Promise<void> => {
  try {
    await changePassword({ ...form, email }).catch((error) => {
      throw new ValidationError(error.response.data.error.message)
    })

    Alerts.success('Se ha actualizado la contraseña exitosamente', () => {
      location.href = '/dashboard'
    })
  } catch (error) {
    const { message } = ErrorsHandler(error)
    Alerts.error(message)
  }
}
