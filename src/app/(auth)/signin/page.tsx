'use client'

import { useState } from 'react'
import { redirect } from 'next/navigation'
import GetUserInfo from './get-user-info'
import style from './styles.module.scss'
import ConfirmUserInfo from './confirm-user-info'
import InternalLinkText from '@/components/atoms/text/InternalLinkText'
import { SignupForm } from '@/types'
import { CreateUser } from '@/useCases/signupUseCase'

export default function Signin() {
  const [step, setStep] = useState<number>(0)
  const [form, setForm] = useState<SignupForm>({
    name: '',
    lastName: '',
    phoneNumber: '',
    dni: '',
    birthDate: '',
    address: '',
    email: '',
    password: '',
    sex: '',
  })

  const FormActions = {
    next: () => {
      setStep(step + 1)
    },
    back: () => {
      setStep(step - 1)
    },
    submit: () => {
      CreateUser(form)
    },
  }

  switch (step) {
    case 0:
      return (
        <>
          <GetUserInfo
            FormActions={FormActions}
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
          <ConfirmUserInfo FormActions={FormActions} />
          <p onClick={FormActions.back} className={style.LinkStyle}>
            Volver
          </p>
        </>
      )
    default:
      return redirect('/404')
  }
}
