import Navbar from "@/components/organisms/navbar/base";
import style from './styles.module.scss'
import React from "react";

export default function NavbarBaseWithContainer({children}: {children: React.ReactNode}) {
  return (
    <>
        <Navbar/>
        <main className={style.Container}>
            {children}
        </main>
    </>
  )
}
