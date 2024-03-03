import { type $Enums } from '@prisma/client'

export interface ErrorInfo {
  status: number
  type: string
  message: string
}

export interface Movement {
  to: string
  value: number
  date: Date
  balance: boolean
}

export interface Category {
  id: number
  name: string
  deleted?: boolean
}

export interface User {
  id: number
  name: string
  lastName: string
  dni: number | string
  email: string
  phoneNumber: number | string
  address: string
  birthDate: Date
  sex: $Enums.sex
  updatedAt: Date
  createdAt: Date
  role: $Enums.role
}

export interface Account {
  id: number
  balance: string
  imgUrl?: string | null
  updatedAt: Date
  createdAt: Date
}

export interface Card {
  number: string
  id: number
  cvv: number
  expiration: Date
}

export interface Investment {
  id: number
  date: Date
  amount: string
  interest: number
  dateEnd: Date
}

export interface Loan {
  id: number
  date: Date
  amount: string
  interest: number
  dateEnd: Date
}

export interface Conversation {
  messagesTo: Message[]
  messagesFrom: Message[]
}

export interface Message {
  message: string
  id: number
  date: Date
  from: number
  to: number
  accountFrom: {
    user: {
      name: string
      lastName: string
    }
    imgUrl: string | null
  }
}

export interface Notification {
  notifications: Notification[]
  messages: Message[]
}

export interface Session {
  id: number
  ip?: string | null
  userAgent?: string | null
  date: Date
}

export interface Transaction {
  id: number
  date: Date
  from: number
  to: number
  amount: bigint
  category?: {
    name: string
  } | null
  accountTo: {
    user: {
      name: string
      lastName: string
    }
    imgUrl: string | null
  }
}

// forms

export interface CheckUserRequest {
  email?: string
  dni?: string | number
  phoneNumber?: string | number
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

// responses

export interface Token {
  token: string
}

export interface ErrorResponse {
  status: string
  error: Omit<ErrorInfo, 'status'>
}

export type ForgotResponse = Token &
Omit<User, 'createdAt' | 'updatedAt' | 'role'>

export type RegisterResponse = Token &
Omit<User, 'createdAt' | 'updatedAt' | 'role'>

export interface TransactionResponse {
  newBalance: string | number
  transaction: Transaction
}

export interface InvestmentResponse {
  newBalance: string | number
  investment: Investment
}

export interface LoanResponse {
  newBalance: string | number
  loan: Loan
}

export interface ReportError {
  id: number
  name: string
  message: string
  date: Date
}
