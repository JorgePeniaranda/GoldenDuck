'use client'

import React from 'react'
import InfoCard from '@/components/molecules/cards/stats-card'
import TablePaymentsCard from '@/components/molecules/cards/table-payments-card'
import { cardsIcons } from '@/const/DashboardConst'
import ExpenseChart from '@/components/molecules/charts/expense-chart'

const history = [
  { to: 'Golden Duck', value: 2000, balance: true, date: new Date() },
  { to: 'Golden Duck', value: 2000, balance: false, date: new Date() },
  { to: 'Golden Duck', value: 2000, balance: true, date: new Date() },
  { to: 'Golden Duck', value: 2000, balance: true, date: new Date() },
  { to: 'Golden Duck', value: 2000, balance: true, date: new Date() },
  { to: 'Golden Duck', value: 2000, balance: true, date: new Date() },
  { to: 'Golden Duck', value: 2000, balance: true, date: new Date() },
  { to: 'Golden Duck', value: 2000, balance: true, date: new Date() },
  { to: 'Golden Duck', value: 2000, balance: true, date: new Date() },
  { to: 'Golden Duck', value: 2000, balance: true, date: new Date() },
  { to: 'Golden Duck', value: 2000, balance: true, date: new Date() },
  { to: 'Golden Duck', value: 2000, balance: true, date: new Date() },
  { to: 'Golden Duck', value: 2000, balance: true, date: new Date() }
]

export default function MoneyTemplate (): JSX.Element {
  return (
    <>
        <div className='flex flex-wrap gap-7'>
            <InfoCard title='Tu dinero' value='ARS$2.000' progress={10} classname='flex-1' icon={cardsIcons.Money.icon} iconBGColor={cardsIcons.Money.color}/>
            <InfoCard title='Tus ganancias' value='ARS$2.000' progress={10} classname='flex-1' icon={cardsIcons.Graph.icon} iconBGColor={cardsIcons.Graph.color}/>
            <InfoCard title='Dinero gastado' value='ARS$2.000' progress={10} classname='flex-1' icon={cardsIcons.Expenses.icon} iconBGColor={cardsIcons.Expenses.color}/>
        </div>
        <section className='flex gap-7 mt-7'>
            <article className='flex-[2] bg-white rounded-2xl shadow-[0_0_2rem_0_rgba(136,152,170,.15)] p-5'>
                <h2 className='font-medium text-lg'>Registro Semanal</h2>
                <ExpenseChart/>
            </article>
            <TablePaymentsCard history={history} title='Ultimos Movimientos' classname='flex-1'/>
        </section>
    </>
  )
}
