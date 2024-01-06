import Text from '@/components/atoms/text/Text'
import style from './styles.module.scss'

export default function AboutUsSection() {
  return (
    <article id="AboutUs" className={style.AboutUs}>
    <Text tag="h1" size={"2.8rem"} weight="700">Golden Duck</Text>
    <Text size={"1.1rem"}>
        Una banca online donde podrá, no solo gestionar su dinero, sino
        que incluso invertirlo. Siempre llevando un registro de cuanto
        dinero es ingresado y cuanto dinero es gastado, contando con
        categorías para saber en qué lo gasta. También podrá pagar
        servicios, tales como servicios de Telefonía Móvil, servicios
        públicos esenciales (Luz, Agua, Gas) o incluso su cuenta de
        streaming favorita...
    </Text>
    <Text size={"1.1rem"}>
        Contamos con un soporte disponible las 24 hs, donde podrá dejar su
        consulta y será respondida a la brevedad. Sistema que nos
        caracteriza por el alta comunicación con el usuario y soporte del
        mismo. Siempre proporcionando la mayor comodidad y seguridad,
        trabajando a la par con las mayores empresas de ciberseguridad
        para resguardar a la perfección su dinero.
    </Text>
    </article>
  )
}
