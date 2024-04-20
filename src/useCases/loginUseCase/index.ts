import { login } from '@/api'
import { validations } from '@/services/validationService'
import { type LoginForm } from '@/types'
import { z } from 'zod'

export const LoginSchema = z.object({
  email: validations.email,
  password: validations.password
})

export const onSubmit = async (form: LoginForm): Promise<void> => {
  await login(form).catch(() => {
    console.log('error')
  })

  // Alerts.success(AlertsDictionary.LoginSuccess, () => {
  //   location.replace('/dashboard')
  // })
}
