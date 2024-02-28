import React from 'react'
import Register from './page'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

// const form: RegisterForm = {
//   name: 'test',
//   lastName: 'test',
//   phoneNumber: '1234567890',
//   dni: '12345678',
//   birthDate: '2000/01/01',
//   address: 'test',
//   email: 'test@email.com',
//   password: 'testtest',
//   sex: 'female',
// }

const inputs = [
  { type: 'text', name: 'name', placeholder: 'nombre' },
  { type: 'text', name: 'lastName', placeholder: 'apellido' },
  { type: 'number', name: 'dni', placeholder: 'dni' },
  { type: 'email', name: 'email', placeholder: 'email' },
  { type: 'number', name: 'phoneNumber', placeholder: 'telefono' },
  { type: 'password', name: 'password', placeholder: 'contraseña' },
  { type: 'text', name: 'address', placeholder: 'domicilio' }
]

const inputsByLabel = [
  { type: 'date', name: 'birthDate', label: 'Fecha de Nacimiento' },
  { type: 'radio', name: 'sex', label: 'Masculino' },
  { type: 'radio', name: 'sex', label: 'Femenino' }
]

describe('Login valid form', () => {
  it('content must be rendered', () => {
    const component = render(<Register />)
    expect(component).toBeTruthy()
  })

  it('must have a valid inputs', () => {
    const component = render(<Register />)
    inputs.forEach((input) => {
      const inputElement = component.getByPlaceholderText(input.placeholder)
      expect(inputElement.tagName).toBe('INPUT')
      expect(inputElement.getAttribute('type')).toBe(input.type)
      expect(inputElement.getAttribute('name')).toBe(input.name)
    })
    inputsByLabel.forEach((input) => {
      const inputElement = component.getByLabelText(input.label)
      expect(inputElement.tagName).toBe('INPUT')
      expect(inputElement.getAttribute('type')).toBe(input.type)
      expect(inputElement.getAttribute('name')).toBe(input.name)
    })
  })
})
