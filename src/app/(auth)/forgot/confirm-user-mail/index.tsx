import InternalLinkText from '@/components/atoms/text/InternalLinkText'
import style from './styles.module.scss'
import Text from '@/components/atoms/text/Text'
import BaseButton from '@/components/molecules/buttons/base-button'
import FormWithValidation from '@/components/molecules/forms/FormWithValidation'
import { formActions } from '@/types'
import ReactCodeInput from 'react-code-input'

export default function ConfirmUserMail({ submit }: formActions) {
  return (
    <FormWithValidation onSubmit={submit} className={style.ConfirmUserEmail}>
      <Text>
        Compruebe el correo <span>testCorreo@test.com</span> para encontrar el
        codigo de verificación, recuerda que puede encontrarse en {'"spam"'}
      </Text>
      <ReactCodeInput
        type="text"
        name="EmailCode"
        inputMode="email"
        fields={6}
      />
      <BaseButton fontSize="1.2rem">Siguiente</BaseButton>
    </FormWithValidation>
  )
}
