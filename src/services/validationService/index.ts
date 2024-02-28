import {
  checkAlphanumeric,
  checkOnlyLetters,
  checkPasswordStrong
} from '../../utils'
import { z } from 'zod'

export const validations = {
  name: z
    .string({ required_error: 'El nombre es requerido' })
    .min(1, { message: 'El nombre es requerido' })
    .refine(checkOnlyLetters, {
      message: 'El nombre debe contener solo letras.'
    }),
  lastName: z
    .string({
      required_error: 'El apellido es requerido'
    })
    .min(1, { message: 'El apellido es requerido' })
    .refine(checkOnlyLetters, {
      message: 'El apellido debe contener solo letras.'
    }),
  dni: z.coerce
    .number({
      required_error: 'El DNI es requerido',
      invalid_type_error: 'El DNI debe ser un número'
    })
    .min(1, { message: 'El DNI es requerido' })
    .min(10000000, { message: 'El DNI debe contener 8 dígitos' })
    .max(99999999, { message: 'El DNI debe contener 8 dígitos' }),
  email: z
    .string({ required_error: 'El email es requerido' })
    .email({ message: 'El email debe ser valido' })
    .min(1, { message: 'El email es requerido' }),
  phoneNumber: z.coerce
    .number({
      required_error: 'El número telefónico es requerido',
      invalid_type_error: 'El número telefónico debe ser un número'
    })
    .min(1, { message: 'El número telefónico es requerido' })
    .min(1000000000, {
      message: 'El número telefónico debe contener 10 dígitos'
    })
    .max(9999999999, {
      message: 'El número telefónico debe contener 10 dígitos'
    }),
  password: z
    .string({ required_error: 'La contraseña es requerida' })
    .min(1, { message: 'La contraseña es requerida' })
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    .max(72, { message: 'La contraseña debe tener menos de 72 caracteres' })
    .refine(checkPasswordStrong, {
      message:
        'La contraseña debe tener una mayúscula, una minúscula, un número y un caracter especial.'
    }),
  address: z
    .string({ required_error: 'La dirección es requerida' })
    .min(1, { message: 'La dirección es requerida' })
    .refine(checkAlphanumeric, {
      message: 'La dirección no puede tener caracteres especiales.'
    }),
  birthDate: z.coerce.date({
    invalid_type_error: 'Debe ingresar una fecha válida',
    required_error: 'La fecha de nacimiento es requerido'
  }),
  sex: z.enum(['male', 'female'], {
    invalid_type_error: 'Debe ingresar una opción válida',
    required_error: 'El sexo es requerido'
  })
}

export default validations
