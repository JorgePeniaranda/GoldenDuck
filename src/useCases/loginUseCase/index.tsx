import Alerts from '@/services/alertService'
import { validations, validateSchema } from '@/services/validationService'
import { LoginForm } from '@/types'
import axios from 'axios'
import { z } from 'zod'

export const LoginSchema = z.object({
  email: validations.email,
  password: validations.password,
})

export const CheckForm = (LoginForm: LoginForm): boolean => {
  try {
    validateSchema(LoginSchema, LoginForm)
    return true
  } catch (error) {
    if (error instanceof Error) {
      Alerts.error(error.message)
    }
    return false
  }
}

export const login = async (LoginForm: LoginForm) => {
  return await axios
    .post(`/api/login`, LoginForm)
    .then((res) => {
      Alerts.success(res.data.message, () =>
        window.location.replace('/dashboard'),
      )
    })
    .catch((err) => {
      Alerts.error(err.response.data.error)
    })
}
