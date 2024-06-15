import { AxiosInstance } from '@/lib/axios-instance'
import { clearToken, getToken } from '../services/token'
import { ErrorMessages } from '../messages/error'

export async function GETLogout() {
  await AxiosInstance.get('http://localhost:3001/auth', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    }
  })
    .catch(error => {
      throw new Error(ErrorMessages[error.response?.status ?? 500])
    })
    .finally(() => {
      clearToken()
    })
}
