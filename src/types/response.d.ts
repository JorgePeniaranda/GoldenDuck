export interface LoginResponse {
  token: string
}

export interface CodeResponse {
  id: string
  idUser: number
  type: string
  expiredAt: Date
  updatedAt: Date
  createdAt: Date
  expired: boolean
}