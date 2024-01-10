import InternalLinkText from '@/components/atoms/text/InternalLinkText'
import style from './styles.module.scss'
import BaseButton from '@/components/molecules/buttons/base-button'
import FormWithValidation from '@/components/molecules/forms/FormWithValidation'
import { formActions } from '@/types'
import InputWithIcon from '@/components/molecules/inputs/input-with-icon'

const PasswordIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      fill-rule="evenodd"
      d="M5.25 10.055V8a6.75 6.75 0 0 1 13.5 0v2.055c1.115.083 1.84.293 2.371.824C22 11.757 22 13.172 22 16c0 2.828 0 4.243-.879 5.121C20.243 22 18.828 22 16 22H8c-2.828 0-4.243 0-5.121-.879C2 20.243 2 18.828 2 16c0-2.828 0-4.243.879-5.121c.53-.531 1.256-.741 2.371-.824M6.75 8a5.25 5.25 0 0 1 10.5 0v2.004C16.867 10 16.451 10 16 10H8c-.452 0-.867 0-1.25.004zM8 17a1 1 0 1 0 0-2a1 1 0 0 0 0 2m4 0a1 1 0 1 0 0-2a1 1 0 0 0 0 2m5-1a1 1 0 1 1-2 0a1 1 0 0 1 2 0"
      clip-rule="evenodd"
    />
  </svg>
)

export default function ChangePasswordUser({ next }: formActions) {
  return (
    <FormWithValidation onSubmit={next} className={style.ConfirmUserEmail}>
      <label>
        Nueva contraseña:
        <InputWithIcon type="password" name="email" icon={PasswordIcon} />
      </label>

      <label>
        Confirme su nueva contraseña:
        <InputWithIcon type="password" name="email" icon={PasswordIcon} />
      </label>
      <BaseButton fontSize="1.2rem">Siguiente</BaseButton>
    </FormWithValidation>
  )
}
