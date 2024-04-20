import React from 'react'
import { Currency } from '@/constants/DashboardConst'
import { type Movement } from '@/types'
import classNames from 'classnames'
import style from './styles.module.scss'

interface Props {
  title: string
  classname?: string
  history: Movement[]
}

export default function TablePaymentsCard ({ title, classname, history }: Props): React.ReactNode {
  const classes = classNames(style.TablePayments, classname)

  return (
    <section className={classes}>
      <h2>{title}</h2>
      <table>
        <tbody>
          {history.slice(0, 5).map((m, i) => {
            return (
              <tr
                key={i}
                className={classNames(
                  { [style.positive]: m.balance },
                  { [style.negative]: !m.balance }
                )}
              >
                <td>
                  <h3>{m.to}</h3>
                  <p>
                    {m.date.toLocaleDateString('es', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </td>
                <td>
                  {Currency}${m.value}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  )
}
