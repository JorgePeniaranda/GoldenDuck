import { QUERYAllTransaction } from "@/modules/transactions/api";
import TransactionsTable from "@/modules/transactions/components/table";

export default async function Dashboard() {
  const data = await QUERYAllTransaction()

  return (
    <div className="p-20">
      <TransactionsTable data={data} />
    </div>
  )
}
