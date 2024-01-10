'use client'

import { FormEvent, useState } from 'react'
import { redirect } from 'next/navigation'
import GetUserInfo from './get-user-info'
import ConfirmUserInfo from './confirm-user-info'
import ContainerCenteredItemsWithNavbar from '@/components/pages/container-centered-items-with-navbar'
import Text from '@/components/atoms/text/Text'

const steps = {
  0: GetUserInfo,
  1: ConfirmUserInfo,
}

export default function Login() {
  const [step, setStep] = useState<number>(0)

  const formActions = {
    next: (event: FormEvent) => {
      event.preventDefault()
      setStep(step + 1)
    },
    back: (event: FormEvent) => {
      event.preventDefault()
      setStep(step - 1)
    },
    submit: (event: FormEvent) => {
      event.preventDefault()
      redirect('/home')
    },
  }

  return (
    <ContainerCenteredItemsWithNavbar>
      {step !== 0 && (
        <div
          onClick={formActions.back}
          className="absolute left-[var(--base-nav-x-padding)] flex items-center cursor-pointer text-xl active:scale-90 transition-transform active:cursor-grabbing"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            className="w-[2ch]"
          >
            <path
              fill="currentColor"
              d="M10 22L0 12L10 2l1.775 1.775L3.55 12l8.225 8.225z"
            />
          </svg>
          <Text size={'1.2rem'}>Volver</Text>
        </div>
      )}
      <Text tag="h1" size={'2.6rem'} weight="700">
        Registrarse
      </Text>
      {steps[step](formActions)} {/* tarea para casa */}
    </ContainerCenteredItemsWithNavbar>
  )
}
