import UserValidations from '@/modules/user/schemas/user'
import { z } from 'zod'

export const RegisterSchema = z.object({
  name: UserValidations.name,
  lastName: UserValidations.lastName,
  dni: UserValidations.dni,
  email: UserValidations.email,
  phoneNumber: UserValidations.phoneNumber,
  password: UserValidations.password,
  address: UserValidations.address,
  birthDate: UserValidations.birthDate,
  sex: UserValidations.sex
})
