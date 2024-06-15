import { AxiosInstance } from "@/libs/axios-instance"
import { clearToken, getToken } from "../services/token"

export async function GETLogout() {
  await AxiosInstance.get('http://localhost:3001/auth', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    }
  }).finally(() => {
    clearToken()
  })
}