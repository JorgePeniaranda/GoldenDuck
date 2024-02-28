import { AxiosInstance } from '@/libs/axiosInstance'
import { type AxiosResponse } from 'axios'
import {
  type RegisterForm,
  type LoginForm,
  type CheckUserRequest,
  type ForgotForm
} from '@/types'

export const checkUser = async ({
  email,
  dni,
  phoneNumber
}: CheckUserRequest): Promise<AxiosResponse> => {
  return await AxiosInstance.post('/api/user', { email, dni, phoneNumber })
}

export const generateCode = async (email: string): Promise<AxiosResponse> => {
  return await AxiosInstance.get(`/api/code/${email}`)
}

export const checkCode = async (code: string): Promise<AxiosResponse> => {
  return await AxiosInstance.post('/api/code/', { code })
}

export const login = async (form: LoginForm): Promise<AxiosResponse> => {
  return await AxiosInstance.post('/api/login', form)
}

export const registerUser = async (
  form: RegisterForm
): Promise<AxiosResponse> => {
  return await AxiosInstance.post('/api/register', form)
}

export const changePassword = async (
  form: ForgotForm
): Promise<AxiosResponse> => {
  return await AxiosInstance.post('/api/forgot', {
    email: form.email,
    password: form.password
  })
}
