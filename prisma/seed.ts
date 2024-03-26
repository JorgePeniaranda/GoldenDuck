const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main (): Promise<void> {
  await prisma.user.create({
    data: {
      name: 'test',
      lastName: 'test',
      dni: 12345678,
      email: 'test@email.com',
      phoneNumber: 1234567890,
      password: '$2a$10$rPATk77Ryv6XUy10wz4vQeFGqwH4KK7XyjUGRz6EOPksx7MuimifW',
      address: 'test 123',
      birthDate: new Date(),
      sex: 'test'
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
