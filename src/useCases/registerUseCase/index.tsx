import { type SignupForm } from '@/types'
import axios, { type AxiosResponse } from 'axios'
import { validations } from '@/services/validationService'
import { z } from 'zod'
import Alerts from '@/services/alertService'
import { ErrorsHandler, ValidationError } from '@/services/errorService'

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

export const generateConfirmationCode = async (
  email: string,
  dni: string,
  phoneNumber: string
): Promise<AxiosResponse> => await axios.get(`/api/register/${email}`, { params: { dni, phoneNumber } })

export const checkConfirmationCode = async (email: string, code: string): Promise<AxiosResponse> =>
  await axios.post(`/api/register/${email}`, { email, code })

export const CreateUser = async (SignupForm: SignupForm): Promise<AxiosResponse> =>
  await axios.post('/api/register', SignupForm)


export const handleNext = (step: number, setStep: (number: number) => void): void => {
  setStep(step + 1)
}

export const handleBack = (step: number, setStep: (number: number) => void): void => {
  setStep(step - 1)
}

export const onSubmitData = async ({email, dni, phoneNumber}: SignupForm, callback?: Function) => {
  try {
    await generateConfirmationCode(
      email,
      String(dni),
      String(phoneNumber)
    ).catch((err) => {
      throw new ValidationError(err.response.data.error as string)
    })

    if(typeof callback === 'function') callback()
  } catch (e) {
    const { error } = ErrorsHandler(e)
    Alerts.error(error)
  }
}

export const onSubmitCode = async (form: SignupForm, code: string) => {
  try {
    await checkConfirmationCode(form.email, code).catch((err) => {
      throw new ValidationError(err.response.data.error as string)
    })

    await CreateUser(form).catch((err) => {
      throw new ValidationError(err.response.data.error as string)
    })

    Alerts.success('Usuario creado con exito', () => {
      location.href = '/dashboard'
    })
  } catch (e) {
    const { error } = ErrorsHandler(e)
    Alerts.error(error)
  }
}