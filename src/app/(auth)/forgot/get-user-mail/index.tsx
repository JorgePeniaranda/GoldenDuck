import BaseButton from '@/components/molecules/buttons/base-button'
import FormWithValidation from '@/components/molecules/forms/FormWithValidation'
import InputWithIcon from '@/components/molecules/inputs/input-with-icon'
import { ForgotForm, formActions } from '@/types'
import { CheckEmail, generateConfirmationCode } from '@/useCases/forgotUseCase'
import React from 'react'

const EmailIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12v1.45q0 1.475-1.012 2.513T18.5 17q-.875 0-1.65-.375t-1.3-1.075q-.725.725-1.638 1.088T12 17q-2.075 0-3.537-1.463T7 12q0-2.075 1.463-3.537T12 7q2.075 0 3.538 1.463T17 12v1.45q0 .65.425 1.1T18.5 15q.65 0 1.075-.45t.425-1.1V12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20h5v2zm0-7q1.25 0 2.125-.875T15 12q0-1.25-.875-2.125T12 9q-1.25 0-2.125.875T9 12q0 1.25.875 2.125T12 15"
    />
  </svg>
)

interface Props {
  FormActions: formActions
  form: ForgotForm
  setForm: React.Dispatch<React.SetStateAction<ForgotForm>>
}

export default function GetUserMail({ FormActions, form, setForm }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (CheckEmail(form.email)) {
      const response = await generateConfirmationCode(form.email)

      if (response) {
        FormActions.next()
      }
    }
  }

  return (
    <FormWithValidation onSubmit={handleSubmit}>
      <label>
        Email:
        <InputWithIcon
          type="text"
          name="email"
          value={form.email}
          onChange={handleChange}
          icon={EmailIcon}
        />
      </label>
      <BaseButton fontSize="1.2rem" fontColor="var(--white)">
        Siguiente
      </BaseButton>
    </FormWithValidation>
  )
}
