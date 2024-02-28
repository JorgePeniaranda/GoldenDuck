'use client'

import React, { createContext } from 'react'

const user = {
  name: 'John',
  lastName: 'Doe',
  profileURL:
    'https://i.pinimg.com/originals/56/a6/14/56a614261d423da1825452363174c685.gif',
  currentMoney: 2138,
  earnedMoney: 3210,
  spentMoney: 2422,
  messages: [
    {
      from: 'pepe',
      profileURL:
        'https://i.pinimg.com/originals/56/a6/14/56a614261d423da1825452363174c685.gif',
      message: 'coso',
      date: new Date()
    },
    {
      from: 'pepe',
      profileURL:
        'https://i.pinimg.com/originals/56/a6/14/56a614261d423da1825452363174c685.gif',
      message: 'coso',
      date: new Date()
    },
    {
      from: 'pepe',
      profileURL:
        'https://i.pinimg.com/originals/56/a6/14/56a614261d423da1825452363174c685.gif',
      message: 'coso',
      date: new Date()
    },
    {
      from: 'pepe',
      profileURL:
        'https://i.pinimg.com/originals/56/a6/14/56a614261d423da1825452363174c685.gif',
      message: 'coso',
      date: new Date()
    }
  ],
  notifications: [
    { message: 'coso', date: new Date() },
    { message: 'coso', date: new Date() },
    { message: 'coso', date: new Date() },
    { message: 'coso', date: new Date() },
    { message: 'coso', date: new Date() },
    { message: 'coso', date: new Date() },
    { message: 'coso', date: new Date() },
    { message: 'coso', date: new Date() },
    { message: 'coso', date: new Date() }
  ],
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

export const userContext = createContext(user)

export function UserProvider ({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  return <userContext.Provider value={user}>{children}</userContext.Provider>
}
