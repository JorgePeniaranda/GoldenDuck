export interface ITransaction {
  id: number
  idSender: number
  idReceiver: number
  amount: number | string
  idCategory?: number
  createdAt: Date
  canceled: boolean
}