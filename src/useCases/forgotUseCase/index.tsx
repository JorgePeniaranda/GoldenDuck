import validations from '@/services/validationService'
import { ForgotForm } from '@/types'
import axios from 'axios'
import { z } from 'zod'

export const ForgotEmailSchema = z.object({
  email: validations.email,
})

export const ForgotPasswordSchema = z.object({
  password: validations.password,
  confirmPassword: validations.password,
})

export const generateConfirmationCode = async (email: string) => (
  await axios.get(`/api/forgot/${email}`)
)

export const checkConfirmationCode = async (email: string, code: string) => (
  await axios.post(`/api/forgot/${email}`, { code })
)

export const UpdatePassword = async (ForgotForm: ForgotForm) => (await axios
    .post(`/api/forgot`, ForgotForm)
)
