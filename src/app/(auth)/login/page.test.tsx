import Login from './page';
import '@testing-library/jest-dom';
import {render} from '@testing-library/react';

describe('Login valid form', () => {
  it('content must be rendered', () => {
    const component = render(<Login/>);
    expect(component).toBeTruthy();
  })

  it('must have a valid inputs', () => {
    const component = render(<Login/>);
    const emailInput = component.getAllByPlaceholderText("Email");
    const passwordInput = component.getAllByPlaceholderText("Contraseña");

    expect(emailInput[0].tagName).toBe("INPUT");
    expect(emailInput[0].getAttribute("name")).toBe("email");
    expect(passwordInput[0].tagName).toBe("INPUT");
    expect(passwordInput[0].getAttribute("name")).toBe("password");
  })
  
  it('must have a send button', () => {
    const component = render(<Login/>);
    const button = component.getAllByText("Ingresar");

    expect(button[0]).toBeTruthy()
  })
});