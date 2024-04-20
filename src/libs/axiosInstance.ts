import { env } from '@/constants/env'
import axios from 'axios'

export const AxiosInstance = axios.create({
  baseURL: env.API_URL.href,
  timeout: 8000,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json'
  }
})
