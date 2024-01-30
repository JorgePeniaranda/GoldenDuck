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
      Alerts.warning(error.message)
    }
    return false
  }
}

export const generateConfirmationCode = async (
  email: string,
  dni: string,
  phoneNumber: string,
) => {
  const res = await axios
    .get(`/api/register/${email}`, { params: { dni, phoneNumber } })
    .then((res) => {
      return res.status
    })
    .catch((err) => {
      Alerts.error(err.response.data.error)
      return err.response.status
    })

  return res
}

export const checkConfirmationCode = async (email: string, code: string) => {
  const res = await axios
    .post(`/api/register/${email}`, { email, code })
    .then((res) => {
      return res.status
    })
    .catch((err) => {
      Alerts.error(err.response.data.error)
      return err.response.status
    })

  return res
}

export const CreateUser = async (SignupForm: SignupForm) => {
  const res = await axios
    .post(`/api/register`, SignupForm)
    .then((res) => {
      Alerts.success(res.data.message, () =>
        window.location.replace('/dashboard'),
      )
      return res.status
    })
    .catch((err) => {
      Alerts.error(err.response.data.error)
      return err.response.status
    })

  return res
}
