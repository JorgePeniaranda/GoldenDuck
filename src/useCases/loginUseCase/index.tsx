import { type LoginForm } from '@/types'
import { validations } from '@/services/validationService'
import { z } from 'zod'
import axios, { type AxiosResponse } from 'axios'
import Alerts from '@/services/alertService'
import { ErrorsHandler, ValidationError } from '@/services/errorService'

export const LoginSchema = z.object({
  email: validations.email,
  password: validations.password
})

export const login = async (LoginForm: LoginForm): Promise<AxiosResponse> => {
  const response = await axios.post('/api/login', LoginForm)

  return response
}

export const onSubmit = async (form: LoginForm) => {
  try {
    await login(form).catch((err) => {
      throw new ValidationError(err.response.data.error as string)
    })

    Alerts.success('Ha ingresado exitosamente', () => { location.replace('/dashboard') }
    )
  } catch (e) {
    const { error } = ErrorsHandler(e)
    Alerts.error(error)
  }
}