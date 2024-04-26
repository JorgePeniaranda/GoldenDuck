'use server'

import { env } from '@/constants/env'
import { AxiosInstance } from '@/libs/axios-instance'
import { saveCode } from '@/services/code'
import { clearToken, getToken, saveToken } from '@/services/token'
import { type LoginForm } from '@/types'
import { UserEntity } from '@/types/entities'
import { CodeResponse, type LoginResponse } from '@/types/response'
import { type AxiosResponse } from 'axios'

/* ---------- checkSession ---------- */ // MARK: checkSession
export async function checkSession (): Promise<boolean> {
  const authStatus = await fetch(`${env.API_URL.origin}/auth`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  }).then(res => {
    return res.ok
  })

  return authStatus
}

/* ---------- login ---------- */ // MARK: login
export async function login ({ email, password }: LoginForm): Promise<void> {
  await AxiosInstance.post<LoginResponse>('/auth', {
    email,
    password
  })
  .then(res => {
    saveToken(res.data.token)
  })
}

/* ---------- sendCode ---------- */ // MARK: sendCode
export async function sendCode ({ email, phoneNumber }: {
  email: UserEntity['email']
  phoneNumber: UserEntity['phoneNumber']
}): Promise<void> {
  console.log(email)
  console.log(phoneNumber)
  await AxiosInstance.post<CodeResponse>('/code', {
    email,
  })
    .then(res => {
      saveCode(res.data.id)
      console.log("object")
    }).catch(err => {
      console.log(err)
    })
}

/* ---------- logout ---------- */ // MARK: logout
export async function logout (): Promise<void> {
  await AxiosInstance.get('/auth/logout', {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })

  clearToken()
}
