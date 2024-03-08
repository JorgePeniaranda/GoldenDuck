import { ValidationDictionary } from '@/const/messages'
import {
  checkAlphanumeric,
  checkOnlyLetters,
  checkPasswordStrong
} from '../../utils'
import { z } from 'zod'
import { $Enums } from '@prisma/client'

export const validations = {
  name: z
    .string({
      required_error: ValidationDictionary.name.required,
      invalid_type_error: ValidationDictionary.name.invalidType
    })
    .min(1, { message: ValidationDictionary.name.required })
    .refine(checkOnlyLetters, {
      message: ValidationDictionary.name.onlyLetters
    }),
  lastName: z
    .string({
      required_error: ValidationDictionary.lastName.required,
      invalid_type_error: ValidationDictionary.lastName.invalidType
    })
    .min(1, { message: ValidationDictionary.lastName.required })
    .refine(checkOnlyLetters, {
      message: ValidationDictionary.lastName.onlyLetters
    }),
  dni: z.coerce
    .number({
      required_error: ValidationDictionary.dni.required,
      invalid_type_error: ValidationDictionary.dni.invalidType
    })
    .min(1, { message: ValidationDictionary.dni.required })
    .min(10000000, { message: ValidationDictionary.dni.length })
    .max(99999999, { message: ValidationDictionary.dni.length }),
  email: z
    .string({
      required_error: ValidationDictionary.email.required,
      invalid_type_error: ValidationDictionary.email.invalidType
    })
    .email({ message: ValidationDictionary.email.invalidEmail })
    .min(1, { message: ValidationDictionary.email.required }),
  phoneNumber: z.coerce
    .number({
      required_error: ValidationDictionary.phoneNumber.required,
      invalid_type_error: ValidationDictionary.phoneNumber.invalidType
    })
    .min(1, { message: ValidationDictionary.phoneNumber.required })
    .min(1000000000, {
      message: ValidationDictionary.phoneNumber.length
    })
    .max(9999999999, {
      message: ValidationDictionary.phoneNumber.length
    }),
  password: z
    .string({
      required_error: ValidationDictionary.password.required,
      invalid_type_error: ValidationDictionary.password.invalidType
    })
    .min(1, { message: ValidationDictionary.password.required })
    .min(8, { message: ValidationDictionary.password.min })
    .max(72, { message: ValidationDictionary.password.max })
    .refine(checkPasswordStrong, {
      message: ValidationDictionary.password.strong
    }),
  confirmPassword: z.string({
    required_error: ValidationDictionary.confirmPassword.required,
    invalid_type_error: ValidationDictionary.confirmPassword.invalidType
  }),
  address: z
    .string({
      required_error: ValidationDictionary.address.required,
      invalid_type_error: ValidationDictionary.address.invalidType
    })
    .min(1, { message: ValidationDictionary.address.required })
    .refine(checkAlphanumeric, {
      message: ValidationDictionary.address.onlyLetters
    }),
  birthDate: z.coerce.date({
    required_error: ValidationDictionary.birthDate.required,
    invalid_type_error: ValidationDictionary.birthDate.invalidType
  }).refine(date => {
    const now = new Date()
    const minAge = 18
    const minDate = new Date(now.getFullYear() - minAge, now.getMonth(), now.getDate())
    return date <= minDate
  }, { message: ValidationDictionary.birthDate.invalidAge }),
  sex: z.enum([$Enums.sex.MALE, $Enums.sex.FEMALE], {
    required_error: ValidationDictionary.sex.required,
    invalid_type_error: ValidationDictionary.sex.invalidType
  })
}

export default validations
