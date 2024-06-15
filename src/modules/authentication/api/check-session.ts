import { getToken } from "../services/token"

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