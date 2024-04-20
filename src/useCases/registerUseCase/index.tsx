import { Api } from '@/api'
import { ErrorsDictionary } from '@/messages/errors'
import Alerts from '@/services/alertService'
import { type RegisterForm } from '@/types'

export async function onSubmitData (
  form: RegisterForm,
  callback?: () => void
): Promise<void> {
  const userExists = await Api.user.findUser({
    dni: form.dni,
    email: form.email,
    phoneNumber: form.phoneNumber
  })

  if (userExists) {
    Alerts.error(ErrorsDictionary.UserAlreadyExists)
    return
  }

  await Api.user.Create(form)

  if (typeof callback === 'function') callback()
}

export const onSubmitCode = async (_form: RegisterForm, _code: string): Promise<void> => {}
