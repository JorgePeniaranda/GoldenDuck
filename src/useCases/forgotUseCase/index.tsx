import { AlertsDictionary } from '@/constants/messages'
import Alerts from '@/services/alertService'
import { type ForgotForm } from '@/types'

export const onSubmitEmailForm = async (
  _form: { email: string },
  callback?: () => void
): Promise<void> => {
  if (typeof callback === 'function') callback()
}

export const onSubmitCodeForm = async (
  _form: { email: string },
  _code: string,
  callback?: () => void
): Promise<void> => {
  if (typeof callback === 'function') callback()
}

export const onSubmitPasswordForm = async (_form: ForgotForm, _email: string): Promise<void> => {
  Alerts.success(AlertsDictionary.PasswordChanged, () => {
    location.href = '/dashboard'
  })
}
