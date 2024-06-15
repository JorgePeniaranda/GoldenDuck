import { ErrorMessages } from '../messages/error'
import { getToken } from '../services/token'

export async function GETVerifySession(): Promise<boolean> {
  return await fetch('http://localhost:3001/auth', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    }
  })
    .catch(error => {
      throw new Error(ErrorMessages[error.response?.status ?? 500])
    })
    .then(response => {
      return response.ok
    })
}
