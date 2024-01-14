import Alerts from '@/services/alertService'
import ConfirmationCode from '@/services/confirmationCodeService'
import { ForgotForm } from '@/types'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export const EmailSchema = z.object({
  email: z
    .string()
    .email({ message: 'El email debe ser valido' })
    .min(1, { message: 'El email es requerido' }),
})

export const PasswordSchema = z.object({
  password: z
    .string()
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

export const generateConfirmationCode = () => {
  return new ConfirmationCode()
}

export const UpdatePassword = (ForgotForm: ForgotForm) => {
  return Alerts.success('Contraseña actualizada con éxito', () => window.location.replace("/"))
}
