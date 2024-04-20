import React from 'react'
import { Tailwind, Img, Link } from '@react-email/components'

interface Props {
  code: string
}

export default function TemplateCodeEmail ({ code }: Props): React.ReactNode {
  return (
    <Tailwind>
      <center className="w-full py-1 bg-[#1c1d25]">
        <Img
          src="https://raw.githubusercontent.com/JorgePeniaranda/GoldenDuck/old/FrontEnd/src/assets/img/LycokatLogo.png"
          alt="Lycokat Logo"
          className="w-36 h-36"
        />
      </center>
      <main className="p-10 font-light">
        <p>
          Se ha solicitado un código de verificación en{' '}
          <Link
            href="https://goldenduck.vercel.app/"
            className="text-[#4f46e5] font-bold no-underline"
          >
            Golden Duck
          </Link>
          :
        </p>
        <center id="code" className="mt-10 text-center">
          <p className="w-full mx-auto">Su código es</p>
          <br />
          <span className="max-w-32 text-2xl tracking-widest mx-auto py-4 px-8 bg-[#1c1d25] text-white">
            {code}
          </span>
        </center>
        <br />
        <br />
        <br />
        <b className="font-bold text-red-500">
          Si no ha sido usted, ignore y elimine este correo.{' '}
        </b>
      </main>
    </Tailwind>
  )
}
