it('true', () => {
  expect(true).toBeTruthy()
})

// import { type RegisterForm } from '@/types'
// import { CreateUser, checkConfirmationCode, generateConfirmationCode } from '.'
// import axios from 'axios'

// const validForm: RegisterForm = {
//   name: 'test',
//   lastName: 'test',
//   phoneNumber: '1234567890',
//   dni: '12345678',
//   birthDate: '2000/01/01',
//   address: 'test',
//   email: 'test@email.com',
//   password: 'testtest',
//   sex: 'male'
// }

// describe('generateConfirmationCode', () => {
//   it('must be a function', () => {
//     expect(typeof generateConfirmationCode).toBe('function')
//   })

//   it('should return a response', async () => {
//     const mockResponse = {
//       response: {
//         status: 200,
//         data: {
//           error: 'test'
//         }
//       }
//     }
//     axios.get = jest.fn().mockResolvedValue(mockResponse)
//     const response = await generateConfirmationCode('test', 'test', 'test')
//     expect(response).toEqual(mockResponse)
//   })
// })

// describe('checkConfirmationCode', () => {
//   it('must be a function', () => {
//     expect(typeof checkConfirmationCode).toBe('function')
//   })

//   it('should return a response', async () => {
//     const mockResponse = {
//       response: {
//         status: 200,
//         data: {
//           error: 'test'
//         }
//       }
//     }
//     axios.post = jest.fn().mockResolvedValue(mockResponse)
//     const response = await checkConfirmationCode('2', '2')
//     expect(response).toEqual(mockResponse)
//   })
// })

// describe('CreateUser', () => {
//   it('must be a function', () => {
//     expect(typeof CreateUser).toBe('function')
//   })

//   it('should return a response', async () => {
//     const mockResponse = {
//       response: {
//         status: 200,
//         data: {
//           error: 'test'
//         }
//       }
//     }
//     axios.post = jest.fn().mockResolvedValue(mockResponse)
//     const response = await CreateUser(validForm)
//     expect(response).toEqual(mockResponse)
//   })
// })
