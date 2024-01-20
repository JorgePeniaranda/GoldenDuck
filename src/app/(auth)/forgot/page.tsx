'use client'

import style from './styles.module.scss'
import { useState } from 'react'
import { redirect } from 'next/navigation'
import GetUserMail from './get-user-mail'
import ConfirmUserMail from './confirm-user-mail'
import ChangePasswordUser from './change-password-user'
import InternalLinkText from '@/components/atoms/text/InternalLinkText'
import { ForgotForm } from '@/types'
import { UpdatePassword } from '@/useCases/forgotUseCase'

export default function Forgot() {
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
        <>
          <GetUserMail
            FormActions={formActions}
            form={form}
            setForm={setForm}
          />
          <InternalLinkText href="/login" className={style.LinkStyle}>
            Ya tengo una cuenta
          </InternalLinkText>
        </>
      )
    case 1:
      return (
        <>
          <ConfirmUserMail FormActions={formActions} form={form} />
          <p onClick={formActions.back} className={style.LinkStyle}>
            Volver
          </p>
        </>
      )
    case 2:
      return (
        <>
          <ChangePasswordUser
            FormActions={formActions}
            form={form}
            setForm={setForm}
          />
          <p onClick={formActions.back} className={style.LinkStyle}>
            Volver
          </p>
        </>
      )
    default:
      return redirect('404')
  }
}
