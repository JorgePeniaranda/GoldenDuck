import { type LoginForm } from '@/types'
import { validations } from '@/services/validationService'
import { z } from 'zod'
import Alerts from '@/services/alertService'
import { ErrorsHandler, ValidationError } from '@/services/errorService'
import { login } from '@/api'

export const LoginSchema = z.object({
  email: validations.email,
  password: validations.password
})

export const onSubmit = async (form: LoginForm): Promise<void> => {
  try {
    await login(form).catch((error) => {
      throw new ValidationError(error.response.data.error.message)
    })

    Alerts.success('Ha ingresado exitosamente', () => {
      location.replace('/dashboard')
    })
  } catch (error) {
    const { message } = ErrorsHandler(error)
    Alerts.error(message)
  }
}
