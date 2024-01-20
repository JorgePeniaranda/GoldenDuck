import Alerts from '@/services/alertService'
import { LoginForm } from '@/types'
import axios from 'axios'
import { z } from 'zod'

export const LoginSchema = z.object({
  email: z
    .string({ required_error: 'El email es requerido' })
    .email({ message: 'El email no es valido' })
    .min(1, { message: 'El email es requerido' }),
  password: z
    .string({ required_error: 'La contraseña es requerida' })
    .min(1, { message: 'La contraseña es requerida' }),
})

export const CheckForm = (LoginForm: LoginForm): boolean => {
  const result = LoginSchema.safeParse(LoginForm)

  if (!result.success) {
    Alerts.error(result.error.errors[0].message)
    return false
  }

  return true
}

export const login = async (LoginForm: LoginForm) => {
  return await axios
    .post(`/api/login`, LoginForm)
    .then(() => {
      Alerts.success('Ha ingresado exitosamente', () =>
        window.location.replace('/dashboard'),
      )
    })
    .catch((err) => {
      Alerts.error(err.response.data.error)
    })
}
