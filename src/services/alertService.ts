import Swal from 'sweetalert2'

const Alerts = {
  success: (message: string, then?: () => void) => {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: message,
    }).then(() => {
      if (then) then()
    })
  },
  error: (message: string, then?: () => void) => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    }).then(() => {
      if (then) then()
    })
  },
  warning: (message: string, then?: () => void) => {
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: message,
    }).then(() => {
      if (then) then()
    })
  },
  info: (message: string, then?: () => void) => {
    Swal.fire({
      icon: 'info',
      title: 'Oops...',
      text: message,
    }).then(() => {
      if (then) then()
    })
  },
  question: (message: string, then?: () => void) => {
    Swal.fire({
      icon: 'question',
      title: 'Oops...',
      text: message,
    }).then(() => {
      if (then) then()
    })
  },
}

export default Alerts
