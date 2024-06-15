export interface IUser {
  readonly id: number
  name: string
  lastName: string
  readonly dni: string | bigint | number
  email: string
  phoneNumber: string | bigint | number
  password: string
  address: string
  readonly birthDate: Date
  readonly sex: (typeof IUserSex)[keyof typeof IUserSex]
  imgUrl?: string
  readonly updatedAt: Date
  readonly createdAt: Date
  actived: boolean
  deleted: boolean
  role: (typeof IUserRoles)[keyof typeof IUserRoles]
}

export const IUserSex = {
  MALE: 'MALE',
  FEMALE: 'FEMALE'
}

export const IUserRoles = {
  ADMIN: 'ADMIN',
  SUPPORT: 'SUPPORT',
  USER: 'USER'
}
