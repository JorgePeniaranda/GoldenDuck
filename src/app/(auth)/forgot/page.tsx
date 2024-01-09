import Text from '@/components/atoms/text/Text'
import style from './styles.module.scss'
import InternalLinkText from '@/components/atoms/text/InternalLinkText'
import FormWithValidation from '@/components/molecules/forms/FormWithValidation'
import BaseButton from '@/components/molecules/buttons/base-button'
import Image from 'next/image'
import InputWithIcon from '@/components/molecules/inputs/input-with-icon'

export default function Login() {
  return (
    <main className={style.Forgot}>
      <section>
        <article>
          <Image
            src="/assets/img/logos/GoldenDuck.webp"
            alt="Logo"
            width={100}
            height={100}
          />
          <Text tag="h1" size={'1.6rem'} weight="700">
            Cambiar Contraseña
          </Text>
        </article>
        <FormWithValidation>
          <label>
            Email:
            <InputWithIcon
              type="text"
              name="email"
              icon={
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
              }
            />
          </label>
          <BaseButton>Siguiente</BaseButton>
        </FormWithValidation>
        <InternalLinkText href="/login">Ya tengo una cuenta</InternalLinkText>
      </section>
    </main>
  )
}
