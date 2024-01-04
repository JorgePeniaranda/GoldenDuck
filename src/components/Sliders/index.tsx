"use client"

import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import style from "./style.module.scss";

const settingsSlider = {
    className: "center",
    centerMode: true,
    focusOnSelect: true,
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    initialSlide: 0,
    swipeToSlide: true,
    responsive: [
    {
        breakpoint: 1024,
        settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
        infinite: true,
        dots: true,
        },
    },
    {
        breakpoint: 600,
        settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
        },
    },
    {
        breakpoint: 480,
        settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        },
    },
    ],
};

export default function Home() {
    return (
        <div className={style.sliderContainer}>
            <Slider {...settingsSlider}>
            <div className="card">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M13 19c0-.34.04-.67.09-1H3v-6h16v1c.7 0 1.37.13 2 .35V6c0-1.11-.89-2-2-2H3c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h10.09c-.05-.33-.09-.66-.09-1M3 6h16v2H3zm14.75 16L15 19l1.16-1.16l1.59 1.59l3.59-3.59l1.16 1.41z"/></svg>
                <h2>Ingresos</h2>
            </div>
            <div className="card">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 23q-2.8 0-5.15-1.275T3 18.325V21H1v-6h6v2H4.525q1.2 1.8 3.163 2.9T12 21q1.875 0 3.513-.712t2.85-1.925q1.212-1.213 1.925-2.85T21 12h2q0 2.275-.862 4.275t-2.363 3.5q-1.5 1.5-3.5 2.363T12 23m-.9-4v-1.3q-1.175-.275-1.912-1.012T8.1 14.75l1.65-.65q.3 1.025.938 1.538t1.462.512q.825 0 1.413-.387t.587-1.213q0-.725-.612-1.175T11.35 12.35q-1.475-.525-2.162-1.25T8.5 9.2q0-1.025.713-1.862T11.15 6.25V5h1.75v1.25q.9.075 1.638.725T15.55 8.5l-1.6.65q-.2-.575-.65-.962T12.05 7.8q-.875 0-1.338.375T10.25 9.2q0 .65.575 1.025t2.075.875q1.8.65 2.4 1.525t.6 1.925q0 .725-.25 1.275t-.663.938q-.412.387-.962.624t-1.175.363V19zM1 12q0-2.275.863-4.275t2.362-3.5q1.5-1.5 3.5-2.362T12 1q2.8 0 5.15 1.275t3.85 3.4V3h2v6h-6V7h2.475q-1.2-1.8-3.162-2.9T12 3q-1.875 0-3.512.713t-2.85 1.924Q4.425 6.85 3.713 8.488T3 12z"/></svg>
                <h2>Traferencias</h2>
            </div>
            <div className="card">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M6 22q-.825 0-1.412-.587T4 20V8q0-.825.588-1.412T6 6h2q0-1.65 1.175-2.825T12 2q1.65 0 2.825 1.175T16 6h2q.825 0 1.413.588T20 8v12q0 .825-.587 1.413T18 22zm0-2h12V8h-2v2q0 .425-.288.713T15 11q-.425 0-.712-.288T14 10V8h-4v2q0 .425-.288.713T9 11q-.425 0-.712-.288T8 10V8H6zm4-14h4q0-.825-.587-1.412T12 4q-.825 0-1.412.588T10 6M6 20V8z"/></svg>
                <h2>Consumos</h2>
            </div>
            <div className="card">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h5v-2H4v-6h18V6c0-1.11-.89-2-2-2m0 4H4V6h16zm-5.07 11.17l-2.83-2.83l-1.41 1.41L14.93 22L22 14.93l-1.41-1.41z"/></svg>
                <h2>Prestamos</h2>
            </div>
            <div className="card">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M3 20q-.825 0-1.413-.588T1 18q0-.825.588-1.413T3 16h.263q.112 0 .237.05l4.55-4.55Q8 11.375 8 11.262V11q0-.825.588-1.413T10 9q.825 0 1.413.588T12 11q0 .05-.05.5l2.55 2.55q.125-.05.238-.05h.525q.112 0 .237.05l3.55-3.55q-.05-.125-.05-.238V10q0-.825.588-1.413T21 8q.825 0 1.413.588T23 10q0 .825-.588 1.413T21 12h-.263q-.112 0-.237-.05l-3.55 3.55q.05.125.05.238V16q0 .825-.588 1.413T15 18q-.825 0-1.413-.588T13 16v-.263q0-.112.05-.237l-2.55-2.55q-.125.05-.238.05H10q-.05 0-.5-.05L4.95 17.5q.05.125.05.238V18q0 .825-.588 1.413T3 20ZM4 9.975l-.625-1.35L2.025 8l1.35-.625L4 6.025l.625 1.35L5.975 8l-1.35.625L4 9.975ZM15 9l-.95-2.05L12 6l2.05-.95L15 3l.95 2.05L18 6l-2.05.95L15 9Z"/></svg>
                <h2>Inversiones</h2>
            </div>
            <div className="card">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m16 6l2.29 2.29l-4.88 4.88l-4-4L2 16.59L3.41 18l6-6l4 4l6.3-6.29L22 12V6z"/></svg>
                <h2>Plazos Fijos</h2>
            </div>
            </Slider>
        </div>
    );
}
