import axios from 'axios'

export const AxiosInstance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 8000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})
