import { AxiosInstance } from '@/libs/axiosInstance'
import { type AxiosResponse } from 'axios'
import {
  type RegisterForm,
  type LoginForm,
  type CheckUserRequest,
  type ForgotForm,
  type Token,
  type ReportError,
  type RegisterResponse,
  type ForgotResponse
} from '@/types'

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
  return await AxiosInstance.post<Token>('/api/login', form)
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
