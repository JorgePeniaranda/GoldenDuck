import React from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Search,
  Inject,
} from "@syncfusion/ej2-react-grids";
import Card from "react-credit-cards";
import Stack from "@mui/material/Stack";
import Button from '@mui/material/Button';
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa';

import { cardsData, contextMenuItems, cardsGrid } from "../assets/img/dummy";
import { Header } from "../components";

const Cards = () => {
  const cardNumber = "4111 1111 1111 1111";

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <div className="fixed bottom-4 inset-x-1/2 z-50">
      </div>
      <Header category="Panel de control" title="Tus tarjetas" />
      <div className="grid grid-cols-3 gap-5 place-content-center">
        {cardsData.map((item, index) => (
          <Card
            id={index}
            preview
            name={item.name}
            number={item.number.replace(/\d{4}(?= \d{4})/g, "****")}
            expiry={item.expiry.replace(/^[^/]*/g, "**")}
            issuer={item.issuer}
            cvc={item.cvc}
            locale={{
              valid: "Expira en",
            }}
          />
        ))}
      </div>
      {/*     <CardLayout
      cvc="111"
      expiry="12/18"
      preview
      issuer="visa"
      name="OMAR ZAPATA"
      number={cardNumber.replace(/\d{4}(?= \d{4})/g, "****")}
    /> */}
    </div>
  );
};

export default Cards;
