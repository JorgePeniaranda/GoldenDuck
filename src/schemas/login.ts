import validations from '@/services/validation'
import { z } from 'zod'

export const LoginSchema = z.object({
  email: validations.email,
  password: validations.password
})
