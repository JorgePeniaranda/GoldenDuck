import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import $ from "jquery";

import "./App.scss";
import "./assets/rootList.css";
import "bootstrap/dist/css/bootstrap.min.css";

import NotFound from "./pages/NotFound/NotFound";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Forget from "./pages/ForgotPassword/ForgotPassword";
import Dashboard from "./pages/Dashboard/Dashboard";
import TermsAndConditions from "./pages/TermsAndConditions/TermsAndConditions";
import {
  AutoDebit,
  Calendar,
  Cards,
  Claims,
  Editor,
  Expenses,
  FixedTerm,
  Insurances,
  Investment,
  Loan,
  Money,
  Payment,
  Settings,
  Support,
  Transfer,
  Wallet,
} from "./pages/Dashboard/pages";
import {
  Area,
  Bar,
  Financial,
  Line,
  Pie,
  Pyramid,
  Stacked,
} from "./pages/Charts";

import DarkMode from "./utils/darkMode";


const oneTab = () => {
  localStorage.openpages = Date.now();
  var onLocalStorageEvent = function(e){
      if(e.key == "openpages"){
        localStorage.page_available = Date.now();
      }
      if(e.key == "page_available"){
        alert("GoldenDuck abierto en 2 o mas pestañas")
      }
  };
  window.addEventListener('storage', onLocalStorageEvent, false);
}

export default function App() {
  console.log(
    "%c ¡NO USAR CONSOLA DE COMANDOS A MENOS DE QUE SEPAS LO QUE ESTAS HACIENDO, USAR UN COMANDO EQUIVOCADO PUEDE VULNERAR TU SEGURIDAD, GOLDEN DUCK NO SE HACE RESPONSABLE DE DICHOS ACTOS Y SUS CONSECUENCIAS! ",
    "font-size:20px; background: #FF0000; color: #fff"
  );
  console.log(
    "%c ¡NO USAR CONSOLA DE COMANDOS A MENOS DE QUE SEPAS LO QUE ESTAS HACIENDO, USAR UN COMANDO EQUIVOCADO PUEDE VULNERAR TU SEGURIDAD, GOLDEN DUCK NO SE HACE RESPONSABLE DE DICHOS ACTOS Y SUS CONSECUENCIAS! ",
    "font-size:20px; background: #FF0000; color: #fff"
  );
  console.log(
    "%c ¡NO USAR CONSOLA DE COMANDOS A MENOS DE QUE SEPAS LO QUE ESTAS HACIENDO, USAR UN COMANDO EQUIVOCADO PUEDE VULNERAR TU SEGURIDAD, GOLDEN DUCK NO SE HACE RESPONSABLE DE DICHOS ACTOS Y SUS CONSECUENCIAS! ",
    "font-size:20px; background: #FF0000; color: #fff"
  );
  DarkMode.DarkMode();
  useEffect(() => {
    setTimeout(() => {
      $("#root").addClass("loaded");
      $(".App").css("display", "block");
    }, 500);
    oneTab();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Main routes */}
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Register />} />
        <Route path="/forgot-my-password" element={<Forget />} />
        <Route path="/Terms-And-Conditions" element={<TermsAndConditions />} />
        <Route path="/dashboard/" element={<Dashboard />}>
          {/* Control panel routes  */}
          <Route path="/dashboard/money" element={<Money />} />
          <Route path="/dashboard/auto-debit" element={<AutoDebit />} />
          <Route path="/dashboard/calendar" element={<Calendar />} />
          <Route path="/dashboard/cards" element={<Cards />} />
          <Route path="/dashboard/claims" element={<Claims />} />
          <Route path="/dashboard/editor" element={<Editor />} />
          <Route path="/dashboard/expenses" element={<Expenses />} />
          <Route path="/dashboard/fixed-term" element={<FixedTerm />} />
          <Route path="/dashboard/insurances" element={<Insurances />} />
          <Route path="/dashboard/investments" element={<Investment />} />
          <Route path="/dashboard/loans" element={<Loan />} />
          <Route path="/dashboard/payment" element={<Payment />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route path="/dashboard/support" element={<Support />} />
          <Route path="/dashboard/transfer" element={<Transfer />} />
          <Route path="/dashboard/wallet" element={<Wallet />} />

          {/* Testing charts */}
          <Route path="/dashboard/charts/area" element={<Area />} />
          <Route path="/dashboard/charts/bar" element={<Bar />} />
          <Route path="/dashboard/charts/financial" element={<Financial />} />
          <Route path="/dashboard/charts/line" element={<Line />} />
          <Route path="/dashboard/charts/pie" element={<Pie />} />
          <Route path="/dashboard/charts/pyramid" element={<Pyramid />} />
          <Route path="/dashboard/charts/stacked" element={<Stacked />} />
        </Route>
      </Routes>
    </Router>
  );
}
