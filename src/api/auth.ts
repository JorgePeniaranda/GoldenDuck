'use server'

import { env } from '@/constants/env'
import { AxiosInstance } from '@/libs/axiosInstance'
import { clearToken, getToken, saveToken } from '@/services/tokenService'
import { type CheckUserRequest, type LoginForm } from '@/types'
import { type LoginResponse } from '@/types/response'
import { type AxiosResponse } from 'axios'

/* ---------- checkSession ---------- */ // MARK: checkSession
export async function checkSession (): Promise<boolean> {
  const authStatus = await fetch(`${env.API_URL}/auth`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  }).then(res => {
    return res.ok
  })

  return authStatus
}

/* ---------- login ---------- */ // MARK: login
export async function login ({ email, password }: LoginForm): Promise<AxiosResponse> {
  const response = await AxiosInstance.post<LoginResponse>('/auth', {
    email,
    password
  })
    .then(res => {
      saveToken(res.data.token)
    })
    .catch(err => {
      return err
    })

  return response
}

/* ---------- logout ---------- */ // MARK: logout
export async function logout (): Promise<void> {
  clearToken()
}

/* ---------- checkUser ---------- */ // MARK: checkUser
export async function checkUser ({
  email,
  dni,
  phoneNumber
}: CheckUserRequest): Promise<AxiosResponse> {
  return await AxiosInstance.post('/user/find', {
    email,
    dni,
    phoneNumber
  })
}
