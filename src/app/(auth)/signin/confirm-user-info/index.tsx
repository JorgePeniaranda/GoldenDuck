import Text from '@/components/atoms/text/Text'
import BaseButton from '@/components/molecules/buttons/base-button'
import FormWithValidation from '@/components/molecules/forms/FormWithValidation'
import { formActions } from '@/types'
import ReactCodeInput from 'react-code-input'

export default function ConfirmUserInfo({ next, back, submit }: formActions) {
  return (
    <section>
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
      <FormWithValidation
        onSubmit={next}
        className="w-full flex flex-col justify-center items-center mt-7"
      >
        <ReactCodeInput
          type="text"
          name="EmailCode"
          inputMode="email"
          fields={6}
        />
        <BaseButton fontSize="1.1rem" className="mt-20">
          Confirmar
        </BaseButton>
      </FormWithValidation>
    </section>
  )
}
