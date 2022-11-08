import React from "react";

import LycokatLogo from "../../assets/img/LycokatLogo.png";

import "./footer.scss";

const footer = () => {
  return (
    <footer>
      <img src={LycokatLogo} alt="LycokatLogo" />
      <div className="iconicaFrase">
        <p>Fortuna y seguridad, en un solo lugar.</p>
      </div>
      <div className="redes">
        <a
          href="https://www.facebook.com/profile.php?id=100081120383944"
          target="_blank"
          rel="noreferrer"
          title="Facebook"
        >
          F
        </a>
        <a
          href="https://www.instagram.com/lycokat/"
          target="_blank"
          rel="noreferrer"
          title="Instagram"
        >
          I
        </a>
        <a
          href="mailto:lycokat.co@gmail.com"
          target="_blank"
          rel="noreferrer"
          tooltip="LycoKat.Co@Gmail.Com"
        >
          M
        </a>
        <a
          href="https://www.linkedin.com/in/LycoKat"
          target="_blank"
          rel="noreferrer"
          title="LinkedIn"
        >
          L
        </a>
        <a
          href="https://twitter.com/lycokat"
          rel="noreferrer"
          target="_blank"
          title="Twitter"
        >
          T
        </a>
      </div>
      <small>Lycokat™ 2022 | Todos los derechos reservados</small>
    </footer>
  );
};
export default footer;
