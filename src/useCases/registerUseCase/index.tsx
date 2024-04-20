import { AlertsDictionary, ErrorsDictionary } from '@/const/messages'
import Alerts from '@/services/alertService'
import {
  ErrorsHandler,
  RequestError,
  ValidationError
} from '@/services/errorService'
import { validations } from '@/services/validationService'
import { type RegisterForm } from '@/types'
import { z } from 'zod'

export const RegisterSchema = z.object({
  name: validations.name,
  lastName: validations.lastName,
  dni: validations.dni,
  email: validations.email,
  phoneNumber: validations.phoneNumber,
  password: validations.password,
  address: validations.address,
  birthDate: validations.birthDate,
  sex: validations.sex
})

export const onSubmitData = async (
  { email, dni, phoneNumber }: RegisterForm,
  callback?: () => void
): Promise<void> => {
  try {
    const data = await checkUser({ email, dni, phoneNumber })

    await generateCode(email).catch((error) => {
      throw new RequestError(error.response.data.error.message)
    })

    if (typeof callback === 'function') callback()
  } catch (error) {
    const { message } = ErrorsHandler(error)
    Alerts.error(message)
  }
}

export const onSubmitCode = async (
  form: RegisterForm,
  code: string
): Promise<void> => {
  try {
    await checkCode(code).catch((error) => {
      throw new RequestError(error.response.data.error.message)
    })

    await registerUser(form).catch((error) => {
      throw new RequestError(error.response.data.error.meesage)
    })

    Alerts.success(AlertsDictionary.RegisterSuccess, () => {
      location.href = '/dashboard'
    })
  } catch (error) {
    const { message } = ErrorsHandler(error)
    Alerts.error(message)
  }
}
