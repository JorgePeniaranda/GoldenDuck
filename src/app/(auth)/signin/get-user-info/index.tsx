import Text from "@/components/atoms/text/Text";
import NavbarBaseWithContainer from "@/components/pages/navbar-base-with-container";
import style from './styles.module.scss'
import InternalLinkText from "@/components/atoms/text/InternalLinkText";
import { FormEvent } from "react";
import FormWithCheck from "@/components/molecules/forms/FormWithCheck";
import BaseButton from "@/components/molecules/buttons/BaseButton";

interface Props {
    handleNext: (event: FormEvent<HTMLFormElement>) => void
}

export default function GetUserInfo({handleNext}: Props) {
  return (
    <NavbarBaseWithContainer>
        <Text tag='h1' size={"2.6rem"} weight='700'>Registrarse</Text>
        <FormWithCheck onSubmit={handleNext} className={style.SignIn}>
            <section>
                <Text tag='h2'>Datos</Text>
                <article>
                <input type="text" placeholder="Nombre" required />
                <input type="text" placeholder="Apellido" required />
                <input type="text" placeholder="DNI" required />
                </article>
            </section>
            <section>
                <Text tag='h2'>Cuenta y Contacto</Text>
                <article>
                <input type="text" placeholder="Email" required />
                <input type="text" placeholder="Télefono" required />
                <input type="text" placeholder="Contraseña" required />
                </article>
            </section>
            <section>
                <Text tag='h2'>Información</Text>
                <article>
                <input type="text" placeholder="Domicilio" required />
                <label>
                    <input type='date' />
                    Fecha de Nacimiento
                </label>
                <div id='sex'>
                    <label>
                        <input type="radio" name='sex' required />
                        Masculino
                    </label>
                    <label>
                        <input type="radio" name='sex' required />
                        Femenino
                    </label>
                </div>
                </article>
            </section>
            <Text>
                Al continuar y enviar este formulario aceptá los <InternalLinkText href='/TermsAndConditions'>Terminos y Condiciones</InternalLinkText> de Golden Duck
            </Text>
            <BaseButton fontSize="1.1rem">Siguiente</BaseButton>
        </FormWithCheck>
    </NavbarBaseWithContainer>
  )
}
