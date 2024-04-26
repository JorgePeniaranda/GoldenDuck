import { Api } from '@/api'
import { AlertsDictionary } from '@/messages/alerts'
import Alerts from '@/services/alert'
import { type LoginForm } from '@/types'

const onSubmit = async (form: LoginForm): Promise<void> => {
  await Api.auth.login(form).then(() => {
    Alerts.success(AlertsDictionary.LoginSuccess, () => {
      location.replace('/dashboard')
    })
  })
}

export const LoginUseCase = {
  onSubmit
}
