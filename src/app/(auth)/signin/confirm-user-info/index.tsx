import Text from '@/components/atoms/text/Text'
import style from './styles.module.scss'
import BaseButton from '@/components/molecules/buttons/base-button'
import FormWithValidation from '@/components/molecules/forms/FormWithValidation'
import { formActions } from '@/types'
import ReactCodeInput from 'react-code-input'

export default function ConfirmUserInfo({ submit }: formActions) {
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
      <FormWithValidation onSubmit={submit}>
        <ReactCodeInput
          type="text"
          name="EmailCode"
          inputMode="email"
          fields={6}
        />
        <BaseButton fontSize="1.1rem">Confirmar</BaseButton>
      </FormWithValidation>
    </section>
  )
}
