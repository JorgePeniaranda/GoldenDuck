export interface UserEntity {
  readonly id: number
  name: string
  lastName: string
  readonly dni: string | bigint | number
  email: string
  phoneNumber: string | bigint | number
  password: string
  address: string
  readonly birthDate: Date
  readonly sex: (typeof UserSex)[keyof typeof UserSex]
  imgUrl?: string
  readonly updatedAt: Date
  readonly createdAt: Date
  actived: boolean
  deleted: boolean
  role: (typeof UserRoles)[keyof typeof UserRoles]
}

export const UserEntitySex = {
  MALE: 'MALE',
  FEMALE: 'FEMALE'
}

export const UserEntityRoles = {
  ADMIN: 'ADMIN',
  SUPPORT: 'SUPPORT',
  USER: 'USER'
}
