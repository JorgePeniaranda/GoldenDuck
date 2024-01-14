'use client'

import { useState } from 'react'
import { redirect } from 'next/navigation'
import GetUserInfo from './get-user-info'
import style from './styles.module.scss'
import ConfirmUserInfo from './confirm-user-info'
import ContainerCenteredItemsWithNavbar from '@/components/pages/container-centered-items-with-navbar'
import Text from '@/components/atoms/text/Text'
import InternalLinkText from '@/components/atoms/text/InternalLinkText'
import { SignupForm } from '@/types'
import { CreateUser } from '@/useCases/signupUseCase'

const SignInContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <ContainerCenteredItemsWithNavbar className={style.SignIn}>
      <Text tag="h1" size={'2.6rem'} weight="700">
        Registrarse
      </Text>
      {children}
    </ContainerCenteredItemsWithNavbar>
  )
}

export default function SignIn() {
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
        <SignInContainer>
          <GetUserInfo
            FormActions={FormActions}
            form={form}
            setForm={setForm}
          />
          <InternalLinkText href="/login" className={style.LinkStyle}>
            Ya tengo una cuenta
          </InternalLinkText>
        </SignInContainer>
      )
    case 1:
      return (
        <SignInContainer>
          <ConfirmUserInfo FormActions={FormActions} />
          <p onClick={FormActions.back} className={style.LinkStyle}>
            Volver
          </p>
        </SignInContainer>
      )
    default:
      return redirect('/404')
  }
}
