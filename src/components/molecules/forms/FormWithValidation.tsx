'use client'

import { FormEvent } from 'react'
import Swal from 'sweetalert2'

interface Props {
  children: JSX.Element | JSX.Element[]
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void
  className?: string
}

export default function FormWithValidation({
  children,
  onSubmit,
  className,
}: Props) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      if (onSubmit) return onSubmit(event)
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      {children}
    </form>
  )
}
