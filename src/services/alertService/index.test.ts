import Swal from 'sweetalert2'
import Alerts from '.'
import { screen, fireEvent } from '@testing-library/react'

window.scrollTo = jest.fn()

describe('AlertService', () => {
  it('should be a object', () => {
    expect(typeof Alerts).toEqual('object')
  })
  it('should have a success method', () => {
    expect(typeof Alerts.success).toEqual('function')
  })
  it('should have a error method', () => {
    expect(typeof Alerts.error).toEqual('function')
  })
  it('should have a warning method', () => {
    expect(typeof Alerts.warning).toEqual('function')
  })
  it('should have a info method', () => {
    expect(typeof Alerts.info).toEqual('function')
  })
  it('should have a question method', () => {
    expect(typeof Alerts.question).toEqual('function')
  })
})

describe('Alerts.success', () => {
  it('should call Swal.fire', () => {
    const spy = jest.spyOn(Swal, 'fire')
    Alerts.success('message')
    expect(spy).toHaveBeenCalled()
  })
  it('should call Swal.fire with success icon', () => {
    const spy = jest.spyOn(Swal, 'fire')
    Alerts.success('message')
    expect(spy).toHaveBeenCalledWith({
      icon: 'success',
      title: '¡Hecho!',
      text: 'message',
    })
  })
  it('should be call then function', async () => {
    const then = jest.fn()
    Alerts.success('message', then)
    await fireEvent.click(screen.getByText('OK'))
    expect(then).toHaveBeenCalled()
  })
})

describe('Alerts.error', () => {
  it('should call Swal.fire', () => {
    const spy = jest.spyOn(Swal, 'fire')
    Alerts.error('message')
    expect(spy).toHaveBeenCalled()
  })
  it('should call Swal.fire with error icon', () => {
    const spy = jest.spyOn(Swal, 'fire')
    Alerts.error('message')
    expect(spy).toHaveBeenCalledWith({
      icon: 'error',
      title: 'Oops...',
      text: 'message',
    })
  })
  it('should be call then function', async () => {
    const then = jest.fn()
    Alerts.error('message', then)
    await fireEvent.click(screen.getByText('OK'))
    expect(then).toHaveBeenCalled()
  })
})

describe('Alerts.warning', () => {
  it('should call Swal.fire', () => {
    const spy = jest.spyOn(Swal, 'fire')
    Alerts.warning('message')
    expect(spy).toHaveBeenCalled()
  })
  it('should call Swal.fire with warning icon', () => {
    const spy = jest.spyOn(Swal, 'fire')
    Alerts.warning('message')
    expect(spy).toHaveBeenCalledWith({
      icon: 'warning',
      title: 'Oops...',
      text: 'message',
    })
  })
  it('should be call then function', async () => {
    const then = jest.fn()
    Alerts.warning('message', then)
    await fireEvent.click(screen.getByText('OK'))
    expect(then).toHaveBeenCalled()
  })
})

describe('Alerts.info', () => {
  it('should call Swal.fire', () => {
    const spy = jest.spyOn(Swal, 'fire')
    Alerts.info('message')
    expect(spy).toHaveBeenCalled()
  })
  it('should call Swal.fire with info icon', () => {
    const spy = jest.spyOn(Swal, 'fire')
    Alerts.info('message')
    expect(spy).toHaveBeenCalledWith({
      icon: 'info',
      title: 'Oops...',
      text: 'message',
    })
  })
  it('should be call then function', async () => {
    const then = jest.fn()
    Alerts.info('message', then)
    await fireEvent.click(screen.getByText('OK'))
    expect(then).toHaveBeenCalled()
  })
})

describe('Alerts.question', () => {
  it('should call Swal.fire', () => {
    const spy = jest.spyOn(Swal, 'fire')
    Alerts.question('message')
    expect(spy).toHaveBeenCalled()
  })
  it('should call Swal.fire with question icon', () => {
    const spy = jest.spyOn(Swal, 'fire')
    Alerts.question('message')
    expect(spy).toHaveBeenCalledWith({
      icon: 'question',
      title: 'Oops...',
      text: 'message',
    })
  })
  it('should call then function', async () => {
    const then = jest.fn()
    Alerts.question('message', then)
    await fireEvent.click(screen.getByText('OK'))
    expect(then).toHaveBeenCalled()
  })
})
