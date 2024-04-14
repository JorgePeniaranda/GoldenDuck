import { AxiosInstance } from '@/libs/axiosInstance'
import {
  type CheckUserRequest,
  type ForgotForm,
  type ForgotResponse,
  type LoginForm,
  type RegisterForm,
  type RegisterResponse,
  type ReportError,
  type Token
} from '@/types'
import { type AxiosResponse } from 'axios'

export const sendError = async ({
  name,
  message
}: Error): Promise<AxiosResponse> => {
  return await AxiosInstance.post<ReportError>('/api/error', { name, message })
}

export const checkUser = async ({
  email,
  dni,
  phoneNumber
}: CheckUserRequest): Promise<AxiosResponse> => {
  return await AxiosInstance.post('/api/verify-user', {
    email,
    dni,
    phoneNumber
  })
}

export const generateCode = async (email: string): Promise<AxiosResponse> => {
  return await AxiosInstance.get<Token>(`/api/code/${email}`)
}

export const checkCode = async (code: string): Promise<AxiosResponse> => {
  return await AxiosInstance.post<Token>('/api/code/', { code })
}

export const login = async (form: LoginForm): Promise<AxiosResponse> => {
  return await AxiosInstance.post<Token>('/auth', form)
}

export const registerUser = async (
  form: RegisterForm
): Promise<AxiosResponse> => {
  return await AxiosInstance.post<RegisterResponse>('/api/register', form)
}

export const changePassword = async (
  form: ForgotForm
): Promise<AxiosResponse> => {
  return await AxiosInstance.put<ForgotResponse>('/api/forgot', form)
}
