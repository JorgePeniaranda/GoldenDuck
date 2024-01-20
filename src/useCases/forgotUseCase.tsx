import Alerts from '@/services/alertService'
import { ForgotForm } from '@/types'
import axios from 'axios'
import { z } from 'zod'

export const EmailSchema = z.object({
  email: z
    .string({ required_error: 'El email es requerido' })
    .email({ message: 'El email debe ser valido' })
    .min(1, { message: 'El email es requerido' }),
})

export const PasswordSchema = z.object({
  password: z
    .string({ required_error: 'La contraseña es requerida' })
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    .min(1, { message: 'La contraseña es requerida' }),
})

export const CheckEmail = (email: string): boolean => {
  const result = EmailSchema.safeParse({ email })

  if (!result.success) {
    Alerts.error(result.error.errors[0].message)
    return false
  }

  return true
}

export const CheckPasswords = (
  password: string,
  confirmPassword: string,
): boolean => {
  const result = PasswordSchema.safeParse({ password })

  if (password !== confirmPassword) {
    Alerts.warning('Las contraseñas no coinciden')
    return false
  }

  if (!result.success) {
    Alerts.error(result.error.errors[0].message)
    return false
  }

  return true
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
    .then(() => {
      Alerts.success('Contraseña actualizada', () =>
        window.location.replace('/dashboard'),
      )
    })
    .catch((err) => {
      Alerts.error(err.response.data.error)
    })
}
