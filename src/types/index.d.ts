export interface LoginForm {
  email: string
  password: string
}

export interface SignupForm {
  name: string
  lastName: string
  phoneNumber: string
  dni: string
  birthDate: string
  address: string
  email: string
  password: string
  sex: 'male' | 'female'
}

export interface ForgotForm {
  email: string
  password: string
  confirmPassword: string
}

export interface ErrorResponse {
  error: string
  status: number
}
