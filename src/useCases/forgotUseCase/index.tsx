import { changePassword, checkCode, generateCode } from '@/api'
import Alerts from '@/services/alertService'
import { ErrorsHandler, RequestError, ValidationError } from '@/services/errorService'
import validations from '@/services/validationService'
import { type ForgotForm } from '@/types'
import { z } from 'zod'

export const ForgotEmailSchema = z.object({
  email: validations.email
})

export const ForgotPasswordSchema = z.object({
  password: validations.password,
  confirmPassword: validations.password
})

export const onSubmitEmailForm = async (form: { email: string }, callback?: () => void): Promise<void> => {
  try {
    await generateCode(form.email).catch((err) => {
      throw new RequestError(err.response.data.message)
    })

    if (typeof callback === 'function') callback()
  } catch (e) {
    const { message } = ErrorsHandler(e)
    Alerts.error(message)
  }
}

export const onSubmitCodeForm = async (form: { email: string }, code: string, callback?: () => void): Promise<void> => {
  try {
    await checkCode(code).catch((err) => {
      throw new RequestError(err.response.data.message)
    })

    if (typeof callback === 'function') callback()
  } catch (e) {
    const { message } = ErrorsHandler(e)
    Alerts.error(message)
  }
}

export const onSubmitPasswordForm = async (form: ForgotForm, email: string): Promise<void> => {
  try {
    if (
      form.password !== form.confirmPassword
    ) { Alerts.warning('Las contraseñas no coinciden'); return }

    await changePassword(form).catch((err) => {
      throw new ValidationError(err.response.data.error as string)
    })

    Alerts.success('Se ha actualizado la contraseña exitosamente',
      () => {
        location.href = '/dashboard'
      }
    )
  } catch (e) {
    const { message } = ErrorsHandler(e)
    Alerts.error(message)
  }
}
