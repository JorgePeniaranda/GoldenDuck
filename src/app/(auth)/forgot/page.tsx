'use client'

import Text from '@/components/atoms/text/Text'
import style from './styles.module.scss'
import Image from 'next/image'
import { FormEvent, ReactElement, useState } from 'react'
import { redirect } from 'next/navigation'
import GetUserMail from './get-user-mail'
import ConfirmUserMail from './confirm-user-mail'
import ChangePasswordUser from './change-password-user'
import InternalLinkText from '@/components/atoms/text/InternalLinkText'
import { formActions } from '@/types'

interface StepComponent {
  (formActions: formActions): ReactElement
}

const steps: Record<number, StepComponent> = {
  0: GetUserMail,
  1: ConfirmUserMail,
  2: ChangePasswordUser,
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
    <main className={style.Forgot}>
      <section>
        <article>
          <Image
            src="/assets/img/logos/GoldenDuck.webp"
            alt="Logo"
            width={100}
            height={100}
          />
          <Text tag="h1" size={'1.6rem'} weight="700">
            Cambiar Contraseña
          </Text>
          {steps[step](formActions)} {/* tarea para casa */}
          {step === 0 ? (
            <InternalLinkText href="/login">
              Ya tengo una cuenta
            </InternalLinkText>
          ) : (
            <p onClick={formActions.back} id="link">
              Volver
            </p>
          )}
        </article>
      </section>
    </main>
  )
}
