import Text from "@/components/atoms/text/Text";
import BaseButton from "@/components/molecules/buttons/BaseButton";
import FormWithValidation from "@/components/molecules/forms/FormWithValidation";
import ContainerCenteredItemsWithNavbar from "@/components/pages/container-centered-items-with-navbar";
import { FormEvent } from "react";
import ReactCodeInput from "react-code-input";

interface Props {
  handlePrev: (event: FormEvent<HTMLFormElement>) => void;
}

export default function ConfirmUserInfo({ handlePrev }: Props) {
  return (
    <ContainerCenteredItemsWithNavbar>
      <Text tag="h1" size={"2.6rem"} weight="700">
        Confirmar Email
      </Text>
      <section>
        <article>
          <Text size={"1.1rem"}>
            Revisa tu mail{" "}
            <Text tag="span" weight="700">
              testmail@test.com
            </Text>{" "}
            e ingresa el código recibido, Si no lo encuentras prueba buscarlo en
            la categoria {'"Spam"'}
          </Text>
          <FormWithValidation className="w-full flex flex-col justify-center items-center mt-7">
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
        </article>
      </section>
    </ContainerCenteredItemsWithNavbar>
  );
}
