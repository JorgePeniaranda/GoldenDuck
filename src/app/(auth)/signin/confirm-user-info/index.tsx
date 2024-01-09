import Text from "@/components/atoms/text/Text";
import FormWithCheck from "@/components/molecules/forms/FormWithCheck";
import NavbarBaseWithContainer from "@/components/pages/navbar-base-with-container";
import { FormEvent } from "react";
import ReactCodeInput from "react-code-input";

interface Props {
    handlePrev: (event: FormEvent<HTMLFormElement>) => void
}

export default function ConfirmUserInfo({handlePrev}: Props) {
  return (
    <NavbarBaseWithContainer>
        <Text tag='h1' size={"2.6rem"} weight='700'>Confirmar Email</Text>
        <section>
            <article>
                <Text size={"1.1rem"}>
                    Revisa tu mail <Text tag="span" weight="700">testmail@test.com</Text> e ingresa el código recibido, Si no lo encuentras prueba buscarlo en la categoria {'"Spam"'}
                </Text>
                <FormWithCheck className="w-full flex flex-col justify-center items-center mt-7">
                    <ReactCodeInput type='text' name="EmailCode" inputMode="email" fields={6}/>
                    <button className="mt-20">Confirmar</button>
                </FormWithCheck>
            </article>
        </section>
    </NavbarBaseWithContainer>
  )
}
