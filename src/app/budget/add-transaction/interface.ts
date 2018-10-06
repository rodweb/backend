import { Transaction } from 'domain/transaction'

// tslint:disable-next-line
interface Args {
  budgetId: string
  description: string
  amount: number
}

export interface IAddTransaction {
  execute(transaction: Args): Promise<Transaction>
}

