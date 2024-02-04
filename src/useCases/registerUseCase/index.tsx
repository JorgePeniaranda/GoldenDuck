import { SignupForm } from '@/types'
import axios from 'axios'
import { validations } from '@/services/validationService'
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

export const generateConfirmationCode = async (
  email: string,
  dni: string,
  phoneNumber: string,
) => await axios.get(`/api/register/${email}`, { params: { dni, phoneNumber } })

export const checkConfirmationCode = async (email: string, code: string) =>
  await axios.post(`/api/register/${email}`, { email, code })

export const CreateUser = async (SignupForm: SignupForm) =>
  await axios.post(`/api/register`, SignupForm)
