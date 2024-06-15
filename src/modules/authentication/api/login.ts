'use server'

import axios, { AxiosError } from 'axios'
import { ErrorMessages } from '../messages/error'
import { saveToken } from '../services/token'
import { LoginDTO } from '../types/dto'
import { LoginResponse } from '../types/response'

export async function POSTLogin(data: LoginDTO): Promise<void> {
  await axios
    .post<LoginResponse>('http://localhost:3001/auth', data)
    .then(response => {
      saveToken(response.data.token)
    })
    .catch((error: AxiosError) => {
      throw new Error(ErrorMessages[error.response?.status ?? 500])
    })
}
