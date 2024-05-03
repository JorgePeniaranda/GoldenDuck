import { AxiosInstance } from '@/libs/axios-instance'
import { type CheckUserForm, type RegisterForm } from '@/types'
import { type UserEntity } from '@/types/entities'

/* ---------- findUser ---------- */ // MARK: findUser
export async function findUser (form: CheckUserForm): Promise<boolean> {
  const data = await AxiosInstance.post<null>('/user/find', form)
    .then(() => {
      console.log('si')
      return true
    })
    .catch(() => {
      console.log('no')
      return false
    })

  return data
}

/* ---------- Create ---------- */ // MARK: Create
export async function Create (form: RegisterForm): Promise<UserEntity> {
  const data = await AxiosInstance.post<UserEntity>('/user', form)
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.log(err)
      throw err
    })

  return data
}
