import ConfirmUserMail from '.';
import '@testing-library/jest-dom';
import {render} from '@testing-library/react';

const form = {
  email: '',
  password: '',
  confirmPassword: '',
}

const formActions = {
  next: jest.fn(),
  back: jest.fn(),
  submit: jest.fn(),
}

describe('ConfirmUserMail valid form', () => {
  it('content must be rendered', () => {
    const component = render(<ConfirmUserMail form={form} FormActions={formActions}/>);
    expect(component).toBeTruthy();
  })

  it('must have a valid inputs', () => {
    const component = render(<ConfirmUserMail form={form} FormActions={formActions}/>);
    const emailInput = component.getAllByDisplayValue("");

    expect(emailInput.length).toBe(6);
    expect(emailInput.some(e => {
      return e.tagName === "INPUT"
    })).toBeTruthy();
  })
  
  it('must have a send button', () => {
    const component = render(<ConfirmUserMail form={form} FormActions={formActions}/>);
    const button = component.getAllByText("Siguiente");
    expect(button[0]).toBeTruthy()
  })
});