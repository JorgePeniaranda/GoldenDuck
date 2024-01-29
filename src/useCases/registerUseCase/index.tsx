import Alerts from '@/services/alertService'
import { SignupForm } from '@/types'
import { checkAlphanumeric, checkOnlyLetters } from '@/utils'
import axios from 'axios'
import { z } from 'zod'

export const SignUpSchema = z.object({
  name: z
    .string({ required_error: 'El nombre es requerido' })
    .min(1, { message: 'El nombre es requerido' })
    .refine(checkOnlyLetters, {
      message: 'El nombre debe contener solo letras.',
    }),
  lastName: z
    .string({
      required_error: 'El apellido es requerido',
    })
    .min(1, { message: 'El apellido es requerido' })
    .refine(checkOnlyLetters, {
      message: 'El apellido debe contener solo letras.',
    }),
  dni: z.coerce
    .number({ required_error: 'El dni es requerido' })
    .min(1, { message: 'El dni es requerido' })
    .min(10000000, { message: 'El dni debe ser valido' })
    .max(99999999, { message: 'El dni debe ser valido' }),
  email: z
    .string({ required_error: 'El email es requerido' })
    .email({ message: 'El email debe ser valido' })
    .min(1, { message: 'El email es requerido' }),
  phoneNumber: z.coerce
    .number({ required_error: 'El número telefónico es requerido' })
    .min(1, { message: 'El número telefónico es requerido' })
    .min(1000000000, { message: 'El número telefónico debe ser valido' })
    .max(9999999999, { message: 'El número telefónico debe ser valido' }),
  password: z
    .string({ required_error: 'La contraseña es requerida' })
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    .min(1, { message: 'La contraseña es requerida' }),
  address: z
    .string({ required_error: 'La dirección es requerida' })
    .min(1, { message: 'La dirección es requerida' })
    .refine(checkAlphanumeric, {
      message: 'La dirección no puede tener caracteres especiales.',
    }),
  birthDate: z.coerce.date({ required_error: 'El email es requerido' }),
  sex: z.enum(['male', 'female'], { required_error: 'El sexo es requerido' }),
})

export const CheckForm = (SignupForm: SignupForm): boolean => {
  const result = SignUpSchema.safeParse(SignupForm)

  if (!result.success) {
    Alerts.error(result.error.errors[0].message)
    return false
  }

  return true
}

export const generateConfirmationCode = async (email: string) => {
  return await axios.get(`/api/register/${email}`).catch((err) => {
    Alerts.error(err.response.data.error)
  })
}

export const checkConfirmationCode = async (email: string, code: string) => {
  return await axios
    .post(`/api/register/${email}`, { email, code })
    .catch((err) => {
      Alerts.error(err.response.data.error)
    })
}

export const CreateUser = async (SignupForm: SignupForm) => {
  return await axios
    .post(`/api/register`, SignupForm)
    .then((res) => {
      Alerts.success(res.data.message, () =>
        window.location.replace('/dashboard'),
      )
    })
    .catch((err) => {
      Alerts.error(err.response.data.error)
    })
}
