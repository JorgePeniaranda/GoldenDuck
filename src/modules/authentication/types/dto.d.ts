export interface LoginDTO {
  email: string
  password: string
}

export interface RegisterDTO {
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