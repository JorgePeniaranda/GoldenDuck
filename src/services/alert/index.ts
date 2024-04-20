import Swal from 'sweetalert2'

const Alerts = {
  success: (message: string, then?: () => void) => {
    Swal.fire({
      icon: 'success',
      title: '¡Hecho!',
      text: message
    })
      .then(() => {
        if (typeof then === 'function') then()
      })
      .catch(error => {
        console.error('AlertService Error: ' + error)
      })
  },
  error: (message: string, then?: () => void) => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message
    })
      .then(() => {
        if (typeof then === 'function') then()
      })
      .catch(error => {
        console.error('AlertService Error: ' + error)
      })
  },
  warning: (message: string, then?: () => void) => {
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: message
    })
      .then(() => {
        if (typeof then === 'function') then()
      })
      .catch(error => {
        console.error('AlertService Error: ' + error)
      })
  },
  info: (message: string, then?: () => void) => {
    Swal.fire({
      icon: 'info',
      title: 'Oops...',
      text: message
    })
      .then(() => {
        if (typeof then === 'function') then()
      })
      .catch(error => {
        console.error('AlertService Error: ' + error)
      })
  },
  question: (message: string, then?: () => void) => {
    Swal.fire({
      icon: 'question',
      title: 'Oops...',
      text: message
    })
      .then(() => {
        if (typeof then === 'function') then()
      })
      .catch(error => {
        console.error('AlertService Error: ' + error)
      })
  }
} as const

export default Alerts
