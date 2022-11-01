import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';

import { expensesData, contextMenuItems, expensesGrid } from '../assets/img/dummy';
import { Header } from '../components';

const Expenses = () => {
  return (
    <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
      <Header category="Panel de control" title="Tus gastos" />
      <GridComponent id="gridcomp" dataSource={expensesData} allowPaging allowSorting>
        <ColumnsDirective>
          {expensesGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[ Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport ]} />
      </GridComponent>
    </div>
  )
}

export default Expenses