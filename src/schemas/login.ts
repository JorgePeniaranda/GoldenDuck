import validations from '@/services/validationService'
import { z } from 'zod'

export const LoginSchema = z.object({
  email: validations.email,
  password: validations.password
})
