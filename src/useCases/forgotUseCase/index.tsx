import Alerts from '@/services/alertService'
import { ValidationError } from '@/services/errorService'
import validations from '@/services/validationService'
import { ForgotForm } from '@/types'
import axios from 'axios'

export const CheckEmail = (email: string): boolean => {
  try {
    const checkEmail = validations.email.safeParse(email)
    if (!checkEmail.success) throw new ValidationError(checkEmail.error.errors[0].message)
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
    const checkPassword = validations.password.safeParse(password)
    if (password !== confirmPassword)
      throw new ValidationError('Las contraseñas no coinciden')
    if (!checkPassword.success)
      throw new ValidationError(checkPassword.error.errors[0].message)
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
