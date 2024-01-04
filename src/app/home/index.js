import Image from "next/image";
import style from "./style.module.scss";
import React from "react";
import Slider from "@/components/Sliders";

export default function Home() {
  return (
    <>
      <header className={style.header}>
        <article>
          <h1>Golden Duck</h1>
          <p>
            Tu banca online de <span>Productividad</span>
          </p>
        </article>
        <figure>
          <Image
            src="/assets/img/blob1.svg"
            width={360}
            height={360}
            alt="blob"
          />
          <picture>
            <source
              srcSet="/assets/img/laptopDark.svg"
              media="(prefers-color-scheme: dark)"
            />
            <Image
              src="/assets/img/Laptop.svg"
              width={1000}
              height={506}
              alt="laptop-with-golden-duck"
            />
          </picture>
        </figure>
        <figure id="waves">
          <wave />
          <wave />
          <wave />
          <wave />
        </figure>
      </header>
      <main id="Home" className={style.Home}>
        <section id="Lycokat">
          <Image
            src="/assets/img/Lycokat-Logo-YellowVariant.svg"
            width={360}
            height={360}
            alt="lycokat-logo"
          />
          <article id="LycoKat">
            <p>
              <a
                href="https://lycokat.netlify.app/"
                target="_blank"
                rel="noreferrer"
              >
                Lycokat
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h14v-7h2v7q0 .825-.587 1.413T19 21zm4.7-5.3l-1.4-1.4L17.6 5H14V3h7v7h-2V6.4z"
                  />
                </svg>
              </a>
              es una empresa enfocada a la producción de software del más alto
              prestigio dentro del mercado de IT, en donde buscamos las
              necesidades del cliente y planificamos el proceso de elaboración
              del proyecto. Aplicamos la dosis justa y necesaria de personalidad
              propia, siempre cumpliendo las expectativas del cliente, e incluso
              superándolas. Siempre contando con el apoyo y asistencia posterior
              para el mantenimiento del proyecto, teniendo contacto directo con
              nosotros, los desarrolladores directo; Una de las características
              que nos hace destacar por encima de los demás.
            </p>
          </article>
        </section>
        <section id="waveSection">
          <article id="AboutUs">
            <h1>Golden Duck</h1>
            <p>
              Una banca online donde podrá, no solo gestionar su dinero, sino
              que incluso invertirlo. Siempre llevando un registro de cuanto
              dinero es ingresado y cuanto dinero es gastado, contando con
              categorías para saber en qué lo gasta. También podrá pagar
              servicios, tales como servicios de Telefonía Móvil, servicios
              públicos esenciales (Luz, Agua, Gas) o incluso su cuenta de
              streaming favorita...
            </p>
            <p>
              Contamos con un soporte disponible las 24 hs, donde podrá dejar su
              consulta y será respondida a la brevedad. Sistema que nos
              caracteriza por el alta comunicación con el usuario y soporte del
              mismo. Siempre proporcionando la mayor comodidad y seguridad,
              trabajando a la par con las mayores empresas de ciberseguridad
              para resguardar a la perfección su dinero.
            </p>
          </article>
          <article id="AppMobile">
            <figure>
              <div className="phone">
                <Image
                  src="/assets/img/phone.webp"
                  width={472}
                  height={720}
                  alt="phone"
                />
                <Image
                  src="/assets/img/backgroundPhone.webp"
                  width={300}
                  height={650}
                  alt="phone-content"
                />
              </div>
              <Image
                src="/assets/img/blob2.svg"
                className="blob"
                width={500}
                height={900}
                alt="blob"
              />
            </figure>
            <article>
              <h1>¡Tenemos una app para Móvil!</h1>
              <p>
                Descarga GoldenDuck en tu celular y maneja tu dinero con un 200%
                de eficiencia, lleva tu cartera online a donde sea que vayas
                para pagar servicios o incluso tomar un café.
              </p>
              <Image
                src="/assets/img/qr-mobile-app.png"
                width={225}
                height={225}
                alt="AppQR"
              />
            </article>
          </article>
        </section>
        <section id="Possibilities">
          <h1>
            Con <span>Golden Duck</span> Podrás Hacer:
          </h1>
          <Slider />
        </section>
        <section id="Sedes">
          <article>
            <h1>Nuestras Sedes</h1>
            <p>
              Aquí podrás comunicarte con nosotros en caso de tener algún
              problema. Como robo, perdida de la cuenta, problemas a la hora de
              hacer transacciones o cualquier cosa que necesites.
            </p>
            <p>
              También podrás ingresar dinero, recibir préstamos, obtener plazos
              fijos... Cosa que también puedes hacer en la aplicación. Pero hey,
              si quieres lo puedes tramitar del método tradicional, sin ningún
              tipo de problema.
            </p>
          </article>
          <div className="map">
            <iframe
              title="SedeLycoKat"
              src="https://www.google.com/maps/d/u/0/embed?mid=1sni_xoB_1kANcbzPeHafmQjJZilwKFU&ehbc=2E312F"
            />
          </div>
        </section>
      </main>
    </>
  );
}
