'use client'

import Text from '@/components/atoms/text/Text'
import style from './styles.module.scss'
import Image from 'next/image'
import { FormEvent, useState } from 'react'
import { redirect } from 'next/navigation'
import GetUserMail from './get-user-mail'
import ConfirmUserMail from './confirm-user-mail'
import ChangePasswordUser from './change-password-user'
import InternalLinkText from '@/components/atoms/text/InternalLinkText'
import { ForgotForm } from '@/types'
import { UpdatePassword } from '@/useCases/forgotUseCase'

const ForgotContainer = ({ children }: { children: React.ReactNode }) => {
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
          {children}
        </article>
      </section>
    </main>
  )
}

export default function Login() {
  const [step, setStep] = useState<number>(0)
  const [form, setForm] = useState<ForgotForm>({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const formActions = {
    next: () => {
      setStep(step + 1)
    },
    back: () => {
      setStep(step - 1)
    },
    submit: () => {
      UpdatePassword(form)
    },
  }

  switch (step) {
    case 0:
      return (
        <ForgotContainer>
          <GetUserMail
            FormActions={formActions}
            form={form}
            setForm={setForm}
          />
          <InternalLinkText href="/login">Ya tengo una cuenta</InternalLinkText>
        </ForgotContainer>
      )
    case 1:
      return (
        <ForgotContainer>
          <ConfirmUserMail FormActions={formActions} />
          <p onClick={formActions.back} id="link">
            Volver
          </p>
        </ForgotContainer>
      )
    case 2:
      return (
        <ForgotContainer>
          <ChangePasswordUser
            FormActions={formActions}
            form={form}
            setForm={setForm}
          />
          <p onClick={formActions.back} id="link">
            Volver
          </p>
        </ForgotContainer>
      )
    default:
      return redirect('404')
  }
}
