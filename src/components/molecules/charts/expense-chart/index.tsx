'use client'

import React from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const labels = ['Domingo', 'Lunes', 'Martes', 'Jueves', 'Viernes', 'Sabado']

export const data = {
  type: 'line',
  labels,
  datasets: [
    {
      label: 'Ingresos',
      data: labels.map(() => 2),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)'
    },
    {
      label: 'Gastos',
      data: labels.map(() => 2),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)'
    }
  ]
}

interface Props {
  className?: string
}

export default function ExpenseChart ({ className }: Props): JSX.Element {
  return (
    <Line
      data={data}
      options={{
        responsive: true,
        plugins: {
          title: {
            display: false
          },
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            grid: {
              drawTicks: false
            }
          }
        }
      }}
      className={className}
    />
  )
}
