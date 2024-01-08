import Text from "@/components/atoms/text/Text";
import NavbarBaseWithContainer from "@/components/pages/navbar-base-with-container";
import style from './styles.module.scss'
import InternalLinkText from "@/components/atoms/text/InternalLinkText";
import { FormEvent } from "react";

interface Props {
    handleNext: (event: FormEvent<HTMLButtonElement>) => void
}

export default function GetUserInfo({handleNext}: Props) {
  return (
    <NavbarBaseWithContainer>
        <Text tag='h1' size={"2.6rem"} weight='700'>Registrarse</Text>
        <form className={style.SignIn}>
        <section>
            <Text tag='h2'>Datos</Text>
            <article>
            <input type="text" placeholder="Nombre" />
            <input type="text" placeholder="Apellido" />
            <input type="text" placeholder="DNI" />
            </article>
        </section>
        <section>
            <Text tag='h2'>Cuenta y Contacto</Text>
            <article>
            <input type="text" placeholder="Email" />
            <input type="text" placeholder="Télefono" />
            <input type="text" placeholder="Contraseña" />
            </article>
        </section>
        <section>
            <Text tag='h2'>Información</Text>
            <article>
            <input type="text" placeholder="Domicilio" />
            <label>
                <input type='date' />
                Fecha de Nacimiento
            </label>
            <div id='sex'>
                <label>
                <input type="radio" name='sex' />
                Masculino
                </label>
                <label>
                <input type="radio" name='sex' />
                Femenino
                </label>
            </div>
            </article>
        </section>
        <Text>
            Al continuar y enviar este formulario aceptá los <InternalLinkText href='/TermsAndConditions'>Terminos y Condiciones</InternalLinkText> de Golden Duck
        </Text>
        <button onClick={handleNext}>Siguiente</button>
        </form>
    </NavbarBaseWithContainer>
  )
}
