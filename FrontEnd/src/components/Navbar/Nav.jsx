import React from "react";
import { Link } from "react-router-dom";

import Logo from "../../assets/img/GoldenDuckLogo.png";
import "./nav.scss";

const SingleNavResponsive = () => {
  return (
    <nav>
      <img src={Logo} alt="GoldenDuck-Logo" />
      <div className="homeCont" tooltip="Volver" flow="down">
        <Link to={"/"} className="material-icons-outlined home">
          home
        </Link>
      </div>
    </nav>
  );
};

const OptionsNavResponsive = () => {
  return (
    <nav>
      <img src={Logo} alt="GoldenDuck-Logo" />
      <div className="homeCont" tooltip="Volver" flow="down">
        <Link to={"/"} className="material-icons-outlined home">
          home
        </Link>
      </div>
    </nav>
  );
};

const navList = { SingleNavResponsive, OptionsNavResponsive };

export default navList;
