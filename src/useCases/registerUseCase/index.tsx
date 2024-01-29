import Alerts from '@/services/alertService'
import { SignupForm } from '@/types'
import axios from 'axios'
import { validations, validateSchema } from '@/services/validationService'
import { z } from 'zod'

export const SignUpSchema = z.object({
  name: validations.name,
  lastName: validations.lastName,
  dni: validations.dni,
  email: validations.email,
  phoneNumber: validations.phoneNumber,
  password: validations.password,
  address: validations.address,
  birthDate: validations.birthDate,
  sex: validations.sex,
})

export const CheckForm = (SignupForm: SignupForm): boolean => {
  try {
    validateSchema(SignUpSchema, SignupForm)
    return true
  } catch (error) {
    if (error instanceof Error) {
      Alerts.error(error.message)
    }
    return false
  }
}

export const generateConfirmationCode = async (email: string) => {
  return await axios.get(`/api/register/${email}`).catch((err) => {
    Alerts.error(err.response.data.error)
  })
}

export const checkConfirmationCode = async (email: string, code: string) => {
  return await axios
    .post(`/api/register/${email}`, { email, code })
    .catch((err) => {
      Alerts.error(err.response.data.error)
    })
}

export const CreateUser = async (SignupForm: SignupForm) => {
  return await axios
    .post(`/api/register`, SignupForm)
    .then((res) => {
      Alerts.success(res.data.message, () =>
        window.location.replace('/dashboard'),
      )
    })
    .catch((err) => {
      Alerts.error(err.response.data.error)
    })
}
