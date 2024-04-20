import { env } from '@/const/env'
import axios from 'axios'

export const AxiosInstance = axios.create({
  baseURL: env.API_URL,
  timeout: 8000,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json'
  }
})
