'use client'

import React, { useContext } from 'react'
import MoneyTemplate from '@/components/templates/dashboard/money'
import { userContext } from '@/context/userContext'

export default function Money (): React.ReactNode {
  const user = useContext(userContext)

  return (
    <MoneyTemplate
      currentMoney={user.currentMoney}
      earnedMoney={user.earnedMoney}
      spentMoney={user.spentMoney}
      history={user.history}
    />
  )
}
