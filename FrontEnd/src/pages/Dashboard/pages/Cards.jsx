import React from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Search,
  Inject,
} from "@syncfusion/ej2-react-grids";
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
        TARJETUNGAS
      </div>
    </div>
  );
};

export default Cards;
