import ChangePasswordUser from '.'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

const form = {
  email: '',
  password: '',
  confirmPassword: '',
}

const setForm = jest.fn()

const formActions = {
  next: jest.fn(),
  back: jest.fn(),
  submit: jest.fn(),
}

describe('ChangePasswordUser valid form', () => {
  it('content must be rendered', () => {
    const component = render(
      <ChangePasswordUser
        form={form}
        setForm={setForm}
        FormActions={formActions}
      />,
    )
    expect(component).toBeTruthy()
  })

  it('must have a valid inputs', () => {
    const component = render(
      <ChangePasswordUser
        form={form}
        setForm={setForm}
        FormActions={formActions}
      />,
    )
    const passwordInput = component.getByLabelText('Nueva contraseña:')
    expect(passwordInput.tagName).toBe('INPUT')
    expect(passwordInput.getAttribute('name')).toBe('password')
    const confirmPasswordInput = component.getByLabelText(
      'Confirme su nueva contraseña:',
    )
    expect(confirmPasswordInput.tagName).toBe('INPUT')
    expect(confirmPasswordInput.getAttribute('name')).toBe('confirmPassword')
  })

  it('must have a send button', () => {
    const component = render(
      <ChangePasswordUser
        form={form}
        setForm={setForm}
        FormActions={formActions}
      />,
    )
    const button = component.getByText('Siguiente')
    expect(button).toBeTruthy()
  })
})
