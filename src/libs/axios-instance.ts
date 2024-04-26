import axios from 'axios'

export const AxiosInstance = axios.create({
  baseURL: "http://localhost:3000", // env.API_URL.origin,
  timeout: 8000,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json'
  }
})
