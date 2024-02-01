import { SignupForm } from '@/types'
import ConfirmUserInfo from '.'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

const form: SignupForm = {
  name: 'test',
  lastName: 'test',
  phoneNumber: '1234567890',
  dni: '12345678',
  birthDate: '01/01/2000',
  address: 'test',
  email: 'test@email.com',
  password: 'testtest',
  sex: 'male',
}

const formActions = {
  next: jest.fn(),
  back: jest.fn(),
  submit: jest.fn(),
}

describe('ConfirmUserInfo valid form', () => {
  it('content must be rendered', () => {
    const component = render(
      <ConfirmUserInfo form={form} FormActions={formActions} />,
    )
    expect(component).toBeTruthy()
  })

  it('must have a valid inputs', () => {
    const component = render(
      <ConfirmUserInfo form={form} FormActions={formActions} />,
    )
    const emailInput = component.getAllByDisplayValue('')
    expect(emailInput.length).toBe(6)
    expect(
      emailInput.some((e) => {
        return e.tagName === 'INPUT'
      }),
    ).toBeTruthy()
  })

  it('must have a send button', () => {
    const component = render(
      <ConfirmUserInfo form={form} FormActions={formActions} />,
    )
    const button = component.getByText('Confirmar')
    expect(button.tagName).toBe('BUTTON')
  })
})
