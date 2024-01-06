import Text from '@/components/atoms/text/Text'
import style from "./styles.module.scss";

export default function SedesSection() {
  return (
    <section id="Sedes" className={style.Sedes}>
        <article>
            <Text tag="h1" size={"1.6rem"} weight="700">
                Nuestras Sedes
            </Text>
            <Text>
                Aquí podrás comunicarte con nosotros en caso de tener algún
                problema. Como robo, perdida de la cuenta, problemas a la hora de
                hacer transacciones o cualquier cosa que necesites.
            </Text>
            <Text>
                También podrás ingresar dinero, recibir préstamos, obtener plazos
                fijos... Cosa que también puedes hacer en la aplicación. Pero hey,
                si quieres lo puedes tramitar del método tradicional, sin ningún
                tipo de problema.
            </Text>
        </article>
        <div className="map">
            <iframe
                title="SedeLycoKat"
                src="https://www.google.com/maps/d/u/0/embed?mid=1sni_xoB_1kANcbzPeHafmQjJZilwKFU&ehbc=2E312F"
            />
        </div>
    </section>
  )
}
