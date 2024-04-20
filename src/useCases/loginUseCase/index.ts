import { Api } from '@/api'
import { AlertsDictionary } from '@/messages/alerts'
import Alerts from '@/services/alertService'
import { type LoginForm } from '@/types'

const onSubmit = async (form: LoginForm): Promise<void> => {
  await Api.auth.login(form).catch(() => {
    console.log('error')
  })

  Alerts.success(AlertsDictionary.LoginSuccess, () => {
    location.replace('/dashboard')
  })
}

export const LoginUseCase = {
  onSubmit
}
