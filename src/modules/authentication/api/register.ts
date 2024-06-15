import { AxiosInstance } from '@/lib/axios-instance'
import { IUser } from '@/modules/user/types/entity'
import { ErrorMessages } from '../messages/error'
import { RegisterDTO } from '../types/dto'

export async function POSTRegister(data: RegisterDTO): Promise<IUser> {
  return await AxiosInstance.post<IUser>('/user', data)
    .then(res => {
      return res.data
    })
    .catch(error => {
      throw new Error(ErrorMessages[error.response?.status ?? 500])
    })
}
