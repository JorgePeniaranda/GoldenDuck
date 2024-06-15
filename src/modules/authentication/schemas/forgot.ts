import { ValidationDictionary } from '@/modules/user/messages/validations'
import UserValidations from '@/modules/user/schemas/user'
import { z } from 'zod'

export const Email = z.object({
  email: UserValidations.email
})

const Password = z
  .object({
    password: UserValidations.password,
    confirmPassword: UserValidations.confirmPassword
  })
  .refine(data => data.password === data.confirmPassword, {
    message: ValidationDictionary.confirmPassword.match,
    path: ['confirmPassword']
  })

export const ForgotSchema = {
  Email,
  Password
}
