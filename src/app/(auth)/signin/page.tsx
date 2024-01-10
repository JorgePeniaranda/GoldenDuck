'use client'

import { FormEvent, useState } from 'react'
import { redirect } from 'next/navigation'
import GetUserInfo from './get-user-info'
import style from './styles.module.scss'
import ConfirmUserInfo from './confirm-user-info'
import ContainerCenteredItemsWithNavbar from '@/components/pages/container-centered-items-with-navbar'
import Text from '@/components/atoms/text/Text'
import InternalLinkText from '@/components/atoms/text/InternalLinkText'

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
    <ContainerCenteredItemsWithNavbar className={style.SignIn}>
      <Text tag="h1" size={'2.6rem'} weight="700">
        Registrarse
      </Text>
      {steps[step](formActions)} {/* tarea para casa */}
      <div className={style.OptionContainer}>
        {step === 0 ? (
          <InternalLinkText
            href="/login"
          >
            Ya tengo una cuenta
          </InternalLinkText>
        ) : (
          <p onClick={formActions.back}>
            Volver
          </p>
        )}
      </div>
    </ContainerCenteredItemsWithNavbar>
  )
}
