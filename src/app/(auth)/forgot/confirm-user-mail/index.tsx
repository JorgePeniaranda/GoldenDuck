import style from './styles.module.scss'
import Text from '@/components/atoms/text/Text'
import BaseButton from '@/components/molecules/buttons/base-button'
import FormWithValidation from '@/components/molecules/forms/FormWithValidation'
import { ForgotForm, formActions } from '@/types'
import { checkConfirmationCode } from '@/useCases/forgotUseCase'
import { FormEvent, useState } from 'react'
import ReactCodeInput from 'react-code-input'

interface Props {
  FormActions: formActions
  form: ForgotForm
}

export default function ConfirmUserMail({ FormActions, form }: Props) {
  const [EmailCode, setEmailCode] = useState<string>('')

  const handleChange = (value: string) => {
    setEmailCode(value)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const response = await checkConfirmationCode(form.email, EmailCode)

    if (response === 200) {
      FormActions.next()
    }
  }

  return (
    <FormWithValidation
      onSubmit={handleSubmit}
      className={style.ConfirmUserEmail}
    >
      <Text>
        Compruebe el correo <span>{form.email}</span> para encontrar el codigo
        de verificación, recuerda que puede encontrarse en {'"spam"'}
      </Text>
      <ReactCodeInput
        type="text"
        name="EmailCode"
        inputMode="email"
        fields={6}
        value={EmailCode}
        onChange={handleChange}
      />
      <BaseButton fontSize="1.2rem" fontColor="var(--white)">
        Siguiente
      </BaseButton>
    </FormWithValidation>
  )
}
