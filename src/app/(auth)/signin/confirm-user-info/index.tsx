'use client'

import Text from '@/components/atoms/text/Text'
import style from './styles.module.scss'
import BaseButton from '@/components/molecules/buttons/base-button'
import FormWithValidation from '@/components/molecules/forms/FormWithValidation'
import { formActions } from '@/types'
import ReactCodeInput from 'react-code-input'
import { FormEvent, useMemo, useState } from 'react'
import { ConfirmCode as Code } from '@/useCases/signupUseCase'

interface Props {
  FormActions: formActions
}

export default function ConfirmUserInfo({ FormActions }: Props) {
  const [EmailCode, setEmailCode] = useState<string>('')

  const code = useMemo(() => new Code(), [])

  const handleChange = (value: string) => {
    setEmailCode(value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (code.checkCode(EmailCode)) {
      FormActions.submit()
    } else {
      code.sendCode()
    }
  }

  return (
    <section className={style.ConfirmUserInfo}>
      <article>
        <Text size={'1.1rem'}>
          Revisa tu mail{' '}
          <Text tag="span" weight="700">
            testmail@test.com
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
        <BaseButton fontSize="1.1rem">Confirmar</BaseButton>
      </FormWithValidation>
    </section>
  )
}
