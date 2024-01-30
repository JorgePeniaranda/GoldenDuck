import { SignupForm } from '@/types';
import GetUserInfo from '.';
import '@testing-library/jest-dom';
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event'

const form: SignupForm = {
  name: 'test',
  lastName: 'test',
  phoneNumber: '1234567890',
  dni: '12345678',
  birthDate: '2000/01/01',
  address: 'test',
  email: 'test@email.com',
  password: 'testtest',
  sex: 'female',
}

const setForm = jest.fn()

const formActions = {
  next: jest.fn(),
  back: jest.fn(),
  submit: jest.fn(),
}

describe('GetUserInfo valid form', () => {
  it('content must be rendered', () => {
    const component = render(<GetUserInfo form={form} setForm={setForm} FormActions={formActions}/>);
    expect(component).toBeTruthy();
  })  
  it('must have a send button', () => {
    const component = render(<GetUserInfo form={form} setForm={setForm} FormActions={formActions}/>);
    const button = component.getByText("Siguiente");
    expect(button.tagName).toBe("BUTTON")
  })
});

describe('must have a valid inputs', () => {
  it('must have a valid name input', () => {
    const component = render(<GetUserInfo form={form} setForm={setForm} FormActions={formActions}/>);
    // check valid input
    const input = component.getByPlaceholderText("nombre");
    expect(input.tagName).toBe("INPUT");
    // check onchange event
    userEvent.type(input, form.name);
    expect(input).toHaveValue(form.name);
  })

  it('must have a valid lastname input', () => {
    const component = render(<GetUserInfo form={form} setForm={setForm} FormActions={formActions}/>);
    // check valid input
    const input = component.getByPlaceholderText("apellido");
    expect(input.tagName).toBe("INPUT");
    // check onchange event
    userEvent.type(input, form.lastName);
    expect(input).toHaveValue(form.lastName);
  })

  it('must have a valid dni input', () => {
    const component = render(<GetUserInfo form={form} setForm={setForm} FormActions={formActions}/>);
    // check valid input
    const input = component.getByPlaceholderText("dni");
    expect(input.tagName).toBe("INPUT");
    // check onchange event
    userEvent.type(input, form.dni);
    expect(input).toHaveValue(Number(form.dni));
  })

  it('must have a valid email input', () => {
    const component = render(<GetUserInfo form={form} setForm={setForm} FormActions={formActions}/>);
    // check valid input
    const input = component.getByPlaceholderText("email");
    expect(input.tagName).toBe("INPUT");
    // check onchange event
    userEvent.type(input, form.email);
    expect(input).toHaveValue(form.email);
  })

  it('must have a valid phoneNumber input', () => {
    const component = render(<GetUserInfo form={form} setForm={setForm} FormActions={formActions}/>);
    // check valid input
    const input = component.getByPlaceholderText("telefono");
    expect(input.tagName).toBe("INPUT");
    // check onchange event
    userEvent.type(input, form.phoneNumber);
    expect(input).toHaveValue(Number(form.phoneNumber));
  })

  it('must have a valid password input', () => {
    const component = render(<GetUserInfo form={form} setForm={setForm} FormActions={formActions}/>);
    // check valid input
    const input = component.getByPlaceholderText("contraseña");
    expect(input.tagName).toBe("INPUT");
    // check onchange event
    userEvent.type(input, form.password);
    expect(input).toHaveValue(form.password);
  })

  it('must have a valid address input', () => {
    const component = render(<GetUserInfo form={form} setForm={setForm} FormActions={formActions}/>);
    // check valid input
    const input = component.getByPlaceholderText("domicilio");
    expect(input.tagName).toBe("INPUT");
    // check onchange event
    userEvent.type(input, form.address);
    expect(input).toHaveValue(form.address);
  })

  it('must have a valid birthdate input', () => {
    const component = render(<GetUserInfo form={form} setForm={setForm} FormActions={formActions}/>);
    // check valid input
    const input = component.getByLabelText("Fecha de Nacimiento");
    expect(input.tagName).toBe("INPUT");
    // check onchange event
    userEvent.type(input, form.birthDate);
    expect(input.getAttribute('value')).toBe(form.birthDate);
  })
  
  // it('must have a valid sex input', () => {
  //   const component = render(<GetUserInfo form={form} setForm={setForm} FormActions={formActions}/>);
  //   // check valid input
  //   const input = component.getByLabelText("Masculino");
  //   expect(input.tagName).toBe("INPUT");
  //   expect(input.getAttribute('type')).toBe("radio");
  //   // check onchange event
  //   userEvent.click(input);
  //   expect(input).toBeChecked();
  // })
  
  // it('must have a valid sex input', () => {
  //   const component = render(<GetUserInfo form={form} setForm={setForm} FormActions={formActions}/>);
  //   // check valid input
  //   const input = component.getByLabelText("Femenino");
  //   expect(input.tagName).toBe("INPUT");
  //   expect(input.getAttribute('type')).toBe("radio");
  //   // check onchange event
  //   userEvent.click(input);
  //   expect(input).toBeChecked();
  // })
})