import Alerts from '@/services/alertService'
import ConfirmationCode from '@/services/confirmationCodeService'
import { SignupForm } from '@/types'
import { z } from 'zod'

export const SignUpSchema = z.object({
  name: z.string().min(1, { message: 'El nombre es requerido' }),
  lastName: z.string().min(1, { message: 'El apellido es requerido' }),
  dni: z.coerce
    .number()
    .min(1, { message: 'El dni es requerido' })
    .min(10000000, { message: 'El dni debe ser valido' })
    .max(99999999, { message: 'El dni debe ser valido' }),
  email: z
    .string()
    .email({ message: 'El email debe ser valido' })
    .min(1, { message: 'El email es requerido' }),
  phoneNumber: z.coerce
    .number()
    .min(1, { message: 'El número telefónico es requerido' })
    .min(1000000000, { message: 'El número telefónico debe ser valido' })
    .max(9999999999, { message: 'El número telefónico debe ser valido' }),
  password: z
    .string()
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    .min(1, { message: 'La contraseña es requerida' }),
  address: z.string().min(1, { message: 'La dirección es requerida' }),
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

export const generateConfirmationCode = () => {
  return new ConfirmationCode()
}

export const CreateUser = (SignupForm: SignupForm) => {
  return Alerts.success('Usuario creado con éxito', () =>
    window.location.replace('/'),
  )
}
