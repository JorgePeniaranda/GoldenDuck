import { type RegisterForm } from '@/types'
import { validations } from '@/services/validationService'
import { z } from 'zod'
import Alerts from '@/services/alertService'
import { ErrorsHandler, RequestError, ValidationError } from '@/services/errorService'
import { checkCode, checkUser, generateCode, registerUser } from '@/api'

export const SignUpSchema = z.object({
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

export const onSubmitData = async ({ email, dni, phoneNumber }: RegisterForm, callback?: () => void): Promise<void> => {
  try {
    await checkUser({ email, dni, phoneNumber }).then(() => {
      throw new ValidationError('El usuario ya existe')
    }).catch((e) => {
      if (e.response.status !== 404) throw new RequestError(e.response.data.message)
    })

    await generateCode(email).catch((err) => {
      throw new RequestError(err.response.data.message)
    })

    if (typeof callback === 'function') callback()
  } catch (e) {
    const { message } = ErrorsHandler(e)
    Alerts.error(message)
  }
}

export const onSubmitCode = async (form: RegisterForm, code: string): Promise<void> => {
  try {
    await checkCode(code).catch((err) => {
      throw new RequestError(err.response.data.message)
    })

    await registerUser(form).catch((err) => {
      throw new RequestError(err.response.data.meesage)
    })

    Alerts.success('Usuario creado con exito', () => {
      location.href = '/dashboard'
    })
  } catch (e) {
    const { message } = ErrorsHandler(e)
    Alerts.error(message)
  }
}
