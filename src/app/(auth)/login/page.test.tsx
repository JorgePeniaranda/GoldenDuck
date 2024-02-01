import { LoginForm } from '@/types';
import Login from './page';
import '@testing-library/jest-dom';
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const form: LoginForm = {
  email: 'test@email.com',
  password: 'testtest',
}

describe('Login valid form', () => {
  it('content must be rendered', () => {
    const component = render(<Login/>);
    expect(component).toBeTruthy();
  })

  it('must have a send button', () => {
    const component = render(<Login/>);
    const button = component.getByText("Ingresar");
    expect(button.tagName).toBe("BUTTON")
  })
});


  describe('must have a valid inputs', () => {
    
  it('must have a valid email input', () => {
    const component = render(<Login/>);
    const input = component.getByPlaceholderText("Email");
    // check valid input
    expect(input.tagName).toBe("INPUT");
    expect(input.getAttribute("name")).toBe("email");
    // check onchange event
    userEvent.type(input, form.email);
    expect(input.getAttribute('value')).toBe(form.email);
  })
  
  it('must have a valid password input', () => {
    const component = render(<Login/>);
    const input = component.getByPlaceholderText("Contraseña");
    // check valid input
    expect(input.tagName).toBe("INPUT");
    expect(input.getAttribute("name")).toBe("password");
    // check onchange event
    userEvent.type(input, form.password);
    expect(input.getAttribute('value')).toBe(form.password);
  })
  })