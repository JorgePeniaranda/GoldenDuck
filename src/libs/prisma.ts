import { type RegisterForm } from '@/types'
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient().$extends({
  model: {
    $allModels: {
      delete: () => 'query disabled',
      deleteMany: () => 'query disabled'
    },
    user: {
      createUser: async (data: RegisterForm) => {
        const user = await prisma.user.create({
          data: {
            ...data,
            password: data.password,
            phoneNumber: Number(data.phoneNumber),
            dni: Number(data.dni)
          },
          select: {
            id: true
          }
        })

        await prisma.account.create({
          data: {
            idUser: user.id
          }
        })

        return user
      }
    }
  }
})
