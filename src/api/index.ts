'use server'

import { clearToken, getToken, saveToken } from '@/helpers/token'
import { AxiosInstance } from '@/libs/axiosInstance'
import {
  type CheckUserRequest,
  type LoginForm
} from '@/types'
import { type LoginResponse } from '@/types/response'
import { type AxiosResponse } from 'axios'

export const checkSession = async (): Promise<boolean> => {
  const authStatus = await fetch('http://localhost:3000/auth', {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  }).then((res) => {
    return res.ok
  })

  return authStatus
}

export async function login ({ email, password }: LoginForm): Promise<AxiosResponse> {
  const response = await AxiosInstance.post<LoginResponse>('/auth', {
    email,
    password
  }).then((res) => {
    saveToken(res.data.token)
  }).catch((err) => {
    return err
  })

  return response
}

export async function logout (): Promise<void> {
  clearToken()
}

export const checkUser = async ({
  email,
  dni,
  phoneNumber
}: CheckUserRequest): Promise<AxiosResponse> => {
  return await AxiosInstance.post('/user/find', {
    email,
    dni,
    phoneNumber
  })
}
