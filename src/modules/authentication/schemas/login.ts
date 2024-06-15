import UserValidations from '@/modules/user/schemas/user'
import { z } from 'zod'

export const LoginSchema = z.object({
  email: UserValidations.email,
  password: UserValidations.password
})
