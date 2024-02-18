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
      const { error } = ErrorsHandler(e)
      console.error(error)
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
      const { error } = ErrorsHandler(e)
      console.error(error)
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
      const { error } = ErrorsHandler(e)
      console.error(error)
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
      const { error } = ErrorsHandler(e)
      console.error(error)
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
      const { error } = ErrorsHandler(e)
      console.error(error)
    })
  }
}

export default Alerts
