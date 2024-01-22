'use client'

import Text from '@/components/atoms/text/Text'
import style from './styles.module.scss'
import BaseButton from '@/components/molecules/buttons/base-button'
import FormWithValidation from '@/components/molecules/forms/FormWithValidation'
import { SignupForm, formActions } from '@/types'
import ReactCodeInput from 'react-code-input'
import { FormEvent, useState } from 'react'
import { checkConfirmationCode } from '@/useCases/signupUseCase'

interface Props {
  FormActions: formActions
  form: SignupForm
}

export default function ConfirmUserInfo({ FormActions, form }: Props) {
  const [EmailCode, setEmailCode] = useState<string>('')

  const handleChange = (value: string) => {
    setEmailCode(value)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const response = await checkConfirmationCode(form.email, EmailCode)

    if (response) {
      FormActions.submit()
    }
  }

  return (
    <section className={style.ConfirmUserInfo}>
      <article>
        <Text size={'1.1rem'}>
          Revisa tu mail{' '}
          <Text tag="span" weight="700">
            {form.email}
          </Text>{' '}
          e ingresa el código recibido, Si no lo encuentras prueba buscarlo en
          la categoria {'"Spam"'}
        </Text>
      </article>
      <FormWithValidation onSubmit={handleSubmit}>
        <ReactCodeInput
          type="text"
          name="EmailCode"
          inputMode="email"
          fields={6}
          value={EmailCode}
          onChange={handleChange}
        />
        <BaseButton fontSize="1.1rem" fontColor="var(--white)">
          Confirmar
        </BaseButton>
      </FormWithValidation>
    </section>
  )
}
