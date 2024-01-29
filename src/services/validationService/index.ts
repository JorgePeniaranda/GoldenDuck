import { checkAlphanumeric, checkOnlyLetters } from '@/utils'
import { z } from 'zod'
import { ValidationError } from '../errorService'

export const validations = {
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
}

export const validateSchema = (schema: z.AnyZodObject, values: object) => {
  const result = schema.safeParse(values)

  if (!result.success) throw new ValidationError(result.error.errors[0].message)

  return result
}

export default validations
