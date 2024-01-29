import Alerts from '@/services/alertService'
import { ValidationError } from '@/services/errorService'
import validations from '@/services/validationService'
import { ForgotForm } from '@/types'
import axios from 'axios'

export const CheckEmail = (email: string): boolean => {
  try {
    const emailSchema = validations.email.safeParse({ email })
    if (!emailSchema.success) throw new ValidationError('El email no es valido')
    return true
  } catch (error) {
    if (error instanceof Error) Alerts.error(error.message)
    return false
  }
}

export const CheckPasswords = (
  password: string,
  confirmPassword: string,
): boolean => {
  try {
    const passwordSchema = validations.password.safeParse({ password })
    if (password !== confirmPassword)
      throw new ValidationError('Las contraseñas no coinciden')
    if (!passwordSchema.success)
      throw new ValidationError('La contraseña no es valida')
    return true
  } catch (error) {
    if (error instanceof Error) Alerts.warning(error.message)
    return false
  }
}

export const generateConfirmationCode = async (email: string) => {
  return await axios.get(`/api/forgot/${email}`).catch((err) => {
    Alerts.error(err.response.data.error)
  })
}

export const checkConfirmationCode = async (email: string, code: string) => {
  return await axios.post(`/api/forgot/${email}`, { code }).catch((err) => {
    Alerts.error(err.response.data.error)
  })
}

export const UpdatePassword = async (ForgotForm: ForgotForm) => {
  return await axios
    .post(`/api/forgot`, ForgotForm)
    .then((res) => {
      Alerts.success(res.data.message, () =>
        window.location.replace('/dashboard'),
      )
    })
    .catch((err) => Alerts.error(err.response.data.error))
}
