import React from 'react'
// import { LoginForm } from '@/types'
import Login from './page'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

// const form: LoginForm = {
//   email: 'test@email.com',
//   password: 'test@TEST.1234',
// }

const inputs = [
  { type: 'text', name: 'email', placeholder: 'Email' },
  { type: 'password', name: 'password', placeholder: 'Contraseña' }
]

describe('Login valid form', () => {
  it('content must be rendered', () => {
    const component = render(<Login />)
    expect(component).toBeTruthy()
  })

  it('must have a valid inputs', () => {
    const component = render(<Login />)
    inputs.forEach((input) => {
      const inputElement = component.getByPlaceholderText(input.placeholder)
      expect(inputElement.tagName).toBe('INPUT')
      expect(inputElement.getAttribute('type')).toBe(input.type)
      expect(inputElement.getAttribute('name')).toBe(input.name)
      expect(inputElement.getAttribute('placeholder')).toBe(input.placeholder)
    })
  })

  it('must have a send button', () => {
    const component = render(<Login />)
    const button = component.getByText('Ingresar')
    expect(button.tagName).toBe('BUTTON')
  })
})
