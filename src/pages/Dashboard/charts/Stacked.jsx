import React from 'react'
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, StackingColumnSeries, Tooltip } from '@syncfusion/ej2-react-charts'
import { stackedCustomSeries, stackedPrimaryXAxis, stackedPrimaryYAxis } from '../assets/img/dummy'

const Stacked = ({ width, height }) => {
  return (
    <ChartComponent
      id="charts"
      width={width}
      height={height}
      primaryXAxis={stackedPrimaryXAxis}
      primaryYAxis={stackedPrimaryYAxis}
      chartArea={{ border: { width: 0 }}}
      tooltip={{ enable: true}}
      legendSettings={{ background: 'white' }}
    >
      <Inject services={[ StackingColumnSeries, Category, Legend, Tooltip ]} />
      <SeriesCollectionDirective>
        {stackedCustomSeries.map((item, index)=> <SeriesDirective
          key={index}
          {...item}
        />
        )}
      </SeriesCollectionDirective>
    </ChartComponent>
  )
}

export default Stacked