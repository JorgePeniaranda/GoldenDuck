"use client"

import DataTable from '@/components/organisms/table/data-table'
import React, { useMemo } from 'react'
import { ITransaction } from '../types/entity'
import { ColumnDef } from '@tanstack/react-table'

interface Props {
  data: ITransaction[]
}

export default function TransactionsTable({ data }: Props) {
  const columns: ColumnDef<ITransaction>[] = useMemo(() => [
    {
      header: 'ID',
      accessorKey: 'id'
    }, {
      header: 'Sender',
      accessorKey: 'idSender'
    }, {
      header: 'Receiver',
      accessorKey: 'idReceiver'
    }, {
      header: 'Category',
      accessorKey: 'idCategory'
    }, {
      header: 'Created At',
      accessorKey: 'createdAt'
    }, {
      header: 'Canceled',
      accessorKey: 'canceled'
    }
  ], [])

  return (
    <DataTable columns={columns} data={data} />
  )
}
