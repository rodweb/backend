import { Account } from 'domain/account'
import { Category } from 'domain/category'
import { Transaction, TransactionType } from 'domain/transaction'

export interface ICreateTransactionFactoryArgs {
  budgetId: string
  description: string
  amount: number
  category: Category
  type: TransactionType
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

