import MoneyTemplate from '@/components/templates/dashboard/money'
import React from 'react'

const user = {
  currentMoney: 2138,
  earnedMoney: 3210,
  spentMoney: 2422,
  history: [
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
}

export default function Money (): JSX.Element {
  return (
    <MoneyTemplate currentMoney={user.currentMoney} earnedMoney={user.earnedMoney} spentMoney={user.spentMoney} history={user.history}/>
  )
}
