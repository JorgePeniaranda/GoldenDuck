import style from './styles.module.scss'
import Text from '@/components/atoms/text/Text'
import BaseButton from '@/components/molecules/buttons/base-button'
import FormWithValidation from '@/components/molecules/forms/FormWithValidation'
import { formActions } from '@/types'
import { generateConfirmationCode } from '@/useCases/forgotUseCase'
import { FormEvent, useMemo, useState } from 'react'
import ReactCodeInput from 'react-code-input'

interface Props {
  FormActions: formActions
}

export default function ConfirmUserMail({ FormActions }: Props) {
  const [EmailCode, setEmailCode] = useState<string>('')

  const code = useMemo(() => generateConfirmationCode(), [])

  const handleChange = (value: string) => {
    setEmailCode(value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (code.checkCode(EmailCode)) {
      FormActions.next()
    } else {
      code.sendCode()
    }
  }

  return (
    <FormWithValidation onSubmit={handleSubmit} className={style.ConfirmUserEmail}>
      <Text>
        Compruebe el correo <span>testCorreo@test.com</span> para encontrar el
        codigo de verificación, recuerda que puede encontrarse en {'"spam"'}
      </Text>
      <ReactCodeInput
        type="text"
        name="EmailCode"
        inputMode="email"
        fields={6}
        value={EmailCode}
        onChange={handleChange}
      />
      <BaseButton fontSize="1.2rem">Siguiente</BaseButton>
    </FormWithValidation>
  )
}
