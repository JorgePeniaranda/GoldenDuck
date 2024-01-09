'use client'

import { FormEvent, useState } from 'react'
import { redirect } from 'next/navigation'
import GetUserInfo from './get-user-info'
import ConfirmUserInfo from './confirm-user-info'

export default function Login() {
  const [step, setStep] = useState<number>(0)

  const handlePrev = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setStep(step - 1)
  }

  const handleNext = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setStep(step + 1)
  }

  const handleConfirm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setStep(step + 1)
  }

  switch (step) {
    case 0:
      return <GetUserInfo handleNext={handleNext} />
    case 1:
      return <ConfirmUserInfo handlePrev={handlePrev} />
    default:
      return redirect('/404')
  }
}
