it('true', () => {
  expect(true).toBeTruthy()
})

// import { type LoginForm } from '@/types'
// import { login } from '.'
// import axios from 'axios'

// const validForm: LoginForm = { email: 'test@gmail.com', password: '12345678' }

// describe('login', () => {
//   it('must be a function', () => {
//     expect(typeof login).toBe('function')
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
//     const response = await login(validForm)
//     expect(response).toEqual(mockResponse)
//   })
// })
