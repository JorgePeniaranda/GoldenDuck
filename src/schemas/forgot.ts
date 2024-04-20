import { ValidationDictionary } from '@/constants/messages'
import validations from '@/services/validationService'
import { z } from 'zod'

export const Email = z.object({
  email: validations.email
})

const Password = z
  .object({
    password: validations.password,
    confirmPassword: validations.confirmPassword
  })
  .refine(data => data.password === data.confirmPassword, {
    message: ValidationDictionary.confirmPassword.match,
    path: ['confirmPassword']
  })

export const ForgotSchema = {
  Email,
  Password
}
