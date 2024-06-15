import { ForgotDTO } from "../types/dto"

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

export const onSubmitPasswordForm = async (_form: ForgotDTO, _email: string): Promise<void> => {
}
