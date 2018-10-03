import { Account } from 'domain/account'
import { Transaction } from 'domain/transaction'

export interface ICreateTransactionFactoryArgs {
  description: string
  amount: number
  from?: Account
  to?: Account
}

export interface ITransactionFactory {
  create(transaction: ICreateTransactionFactoryArgs): Transaction
}

export interface ITransactionAdded {
  id: string
  description: string
}

