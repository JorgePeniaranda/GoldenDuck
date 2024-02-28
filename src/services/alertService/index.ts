import Swal from 'sweetalert2'
import { ErrorsHandler } from '../errorService'

const Alerts = {
  success: (message: string, then?: () => void) => {
    Swal.fire({
      icon: 'success',
      title: '¡Hecho!',
      text: message
    }).then(() => {
      if (typeof then === 'function') then()
    }).catch(e => {
      const { message } = ErrorsHandler(e)
      console.error('AlertService Error: ' + message)
    })
  },
  error: (message: string, then?: () => void) => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message
    }).then(() => {
      if (typeof then === 'function') then()
    }).catch(e => {
      const { message } = ErrorsHandler(e)
      console.error('AlertService Error: ' + message)
    })
  },
  warning: (message: string, then?: () => void) => {
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: message
    }).then(() => {
      if (typeof then === 'function') then()
    }).catch(e => {
      const { message } = ErrorsHandler(e)
      console.error('AlertService Error: ' + message)
    })
  },
  info: (message: string, then?: () => void) => {
    Swal.fire({
      icon: 'info',
      title: 'Oops...',
      text: message
    }).then(() => {
      if (typeof then === 'function') then()
    }).catch(e => {
      const { message } = ErrorsHandler(e)
      console.error('AlertService Error: ' + message)
    })
  },
  question: (message: string, then?: () => void) => {
    Swal.fire({
      icon: 'question',
      title: 'Oops...',
      text: message
    }).then(() => {
      if (typeof then === 'function') then()
    }).catch(e => {
      const { message } = ErrorsHandler(e)
      console.error('AlertService Error: ' + message)
    })
  }
}

export default Alerts
