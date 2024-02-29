import { type sex } from '@prisma/client'

export interface CheckUserRequest {
  email?: string
  dni?: string
  phoneNumber?: string
}

export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm {
  name: string
  lastName: string
  phoneNumber: string | number
  dni: string | number
  birthDate: string | Date
  address: string
  email: string
  password: string
  sex: sex
}

export interface ForgotForm {
  email: string
  password: string
  confirmPassword: string
}

export interface ErrorResponse {
  status: number
  type: string
  code: string
  message: string
}

export interface Movement {
  to: string
  value: number
  date: Date
  balance: boolean
}
