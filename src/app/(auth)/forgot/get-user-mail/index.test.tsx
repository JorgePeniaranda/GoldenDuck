import GetUserMail from '.';
import '@testing-library/jest-dom';
import {render} from '@testing-library/react';

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

describe('GetUserMail valid form', () => {
  it('content must be rendered', () => {
    const component = render(<GetUserMail form={form} setForm={setForm} FormActions={formActions}/>);
    expect(component).toBeTruthy();
  })

  it('must have a valid inputs', () => {
    const component = render(<GetUserMail form={form} setForm={setForm} FormActions={formActions}/>);
    const emailInput = component.getByLabelText("Email:");
    expect(emailInput.tagName).toBe("INPUT");
    expect(emailInput.getAttribute("name")).toBe("email");
  })
  
  it('must have a send button', () => {
    const component = render(<GetUserMail form={form} setForm={setForm} FormActions={formActions}/>);
    const button = component.getByText("Siguiente");
    expect(button.tagName).toBe("BUTTON")
  })
});