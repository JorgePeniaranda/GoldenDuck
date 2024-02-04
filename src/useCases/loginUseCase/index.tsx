import { LoginForm } from '@/types'
import { validations } from '@/services/validationService'
import { z } from 'zod'
import axios from 'axios'

export const LoginSchema = z.object({
  email: validations.email,
  password: validations.password,
})

export const login = async (LoginForm: LoginForm) => {
  const response = await axios.post(`/api/login`, LoginForm)

  return response
}
