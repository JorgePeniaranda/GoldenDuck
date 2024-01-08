import Text from "@/components/atoms/text/Text";
import NavbarBaseWithContainer from "@/components/pages/navbar-base-with-container";
import { FormEvent } from "react";
import ReactCodeInput from "react-code-input";

interface Props {
    handlePrev: (event: FormEvent<HTMLButtonElement>) => void
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
                <form className="w-full flex flex-col justify-center mt-7">
                    <ReactCodeInput type='text' name="EmailCode" inputMode="email" fields={6}/>
                    <button>Confirmar</button>
                </form>
            </article>
        </section>
    </NavbarBaseWithContainer>
  )
}
