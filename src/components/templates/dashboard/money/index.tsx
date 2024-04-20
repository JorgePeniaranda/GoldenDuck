import InfoCard from '@/components/molecules/cards/stats-card'
import TablePaymentsCard from '@/components/molecules/cards/table-payments-card'
import ExpenseChart from '@/components/molecules/charts/expense-chart'
import { Currency, cardsIcons } from '@/constants/DashboardConst'
import { type Movement } from '@/types'

interface Props {
  currentMoney: number
  earnedMoney: number
  spentMoney: number
  history: Movement[]
}

export default function MoneyTemplate ({
  currentMoney,
  earnedMoney,
  spentMoney,
  history
}: Props): JSX.Element {
  return (
    <>
      <div className="flex flex-wrap gap-7">
        <InfoCard
          title="Tu dinero"
          value={`${Currency}$${currentMoney}`}
          progress={10}
          classname="flex-1"
          icon={cardsIcons.Money.icon}
          iconBGColor={cardsIcons.Money.color}
        />
        <InfoCard
          title="Tus ganancias"
          value={`${Currency}$${earnedMoney}`}
          progress={10}
          classname="flex-1"
          icon={cardsIcons.Graph.icon}
          iconBGColor={cardsIcons.Graph.color}
        />
        <InfoCard
          title="Dinero gastado"
          value={`${Currency}$${spentMoney}`}
          progress={-10}
          classname="flex-1"
          icon={cardsIcons.Expenses.icon}
          iconBGColor={cardsIcons.Expenses.color}
        />
      </div>
      <section className="flex gap-7 mt-7">
        <article className="flex-[2] bg-white rounded-2xl shadow-[0_0_2rem_0_rgba(136,152,170,.15)] p-5 gap-10">
          <h2 className="font-medium text-lg">Registro Semanal</h2>
          <ExpenseChart className="py-6 px-4" />
        </article>
        <TablePaymentsCard history={history} title="Ultimos Movimientos" classname="flex-1" />
      </section>
    </>
  )
}
