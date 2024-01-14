import Swal from 'sweetalert2'

const Alerts = {
  success: (message: string) => {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: message,
    })
  },
  error: (message: string) => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    })
  },
  warning: (message: string) => {
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: message,
    })
  },
  info: (message: string) => {
    Swal.fire({
      icon: 'info',
      title: 'Oops...',
      text: message,
    })
  },
  question: (message: string) => {
    Swal.fire({
      icon: 'question',
      title: 'Oops...',
      text: message,
    })
  },
}

export default Alerts
