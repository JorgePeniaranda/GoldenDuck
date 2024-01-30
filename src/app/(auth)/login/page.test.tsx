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
    const emailInput = component.getByPlaceholderText("Email");
    const passwordInput = component.getByPlaceholderText("Contraseña");
    expect(emailInput.tagName).toBe("INPUT");
    expect(emailInput.getAttribute("name")).toBe("email");
    expect(passwordInput.tagName).toBe("INPUT");
    expect(passwordInput.getAttribute("name")).toBe("password");
  })
  
  it('must have a send button', () => {
    const component = render(<Login/>);
    const button = component.getByText("Ingresar");
    expect(button.tagName).toBe("BUTTON")
  })
});