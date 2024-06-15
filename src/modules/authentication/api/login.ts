'use server'

import axios, { AxiosError } from 'axios'
import { LoginDTO } from '../types/dto'
import { LoginResponse } from '../types/response'
import { ErrorMessages } from '../messages/error'
import { getToken, saveToken } from '../services/token'

/* ---------- verify-session ---------- */ // MARK: login
export async function GETVerifySession (): Promise<boolean> {
  return await fetch('http://localhost:3001/auth', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    }
  }).then((response) => {
    return response.ok
  })
}

/* ---------- login ---------- */ // MARK: login
export async function POSTLogin (data: LoginDTO): Promise<void> {
  await axios.post<LoginResponse>('http://localhost:3001/auth', data).then((response) => {
    saveToken(response.data.token)
  }).catch((error: AxiosError) => {
    throw new Error(ErrorMessages[error.response?.status ?? 500])
  })
}

/* ---------- register ---------- */ // MARK: login