import { Account, AccountFactory } from 'domain/account'
import { Category } from 'domain/category'
import { IDomainEventEmitter } from 'domain/domain-events'
import { Entity } from 'domain/entity'
import { Transaction, TransactionType } from 'domain/transaction'

// tslint:disable-next-line
type Args = {
  domainEvents: IDomainEventEmitter
  id: string
  accounts?: Account[]
  categories?: Category[]
  transactions?: Transaction[]
}

export class Budget extends Entity {
  get accounts() {
    return this._accounts
  }

  get categories() {
    return this._categories
  }

  get transactions() {
    return this._transactions
  }

  private _accounts: Account[] = []
  private _categories: Category[] = []
  private _transactions: Transaction[] = []

  constructor(args: Args) {
    super(args.domainEvents, args.id)
    this._accounts = args.accounts || []
    this._categories = args.categories || []
    this._transactions = args.transactions || []
    this.domainEvents.emit('budget/created', { budgetId: args.id })
  }

  public addAccount(account: Account) {
    this.accounts.push(account)
    this.domainEvents.emit('budget/account-added', {
      accountId: account.id,
      accountName: account.name,
      budgetId: this.id,
    })
  }

  public addTransaction(transaction: Transaction) {
    const category = this.categories.find(cat => cat.id === transaction.category.id)
    if (!category) {
      throw Error('Category not found')
    }

    switch (transaction.type) {
      case TransactionType.Credit: {
        category.increaseBudget(transaction.amount)
        break
      }
      case TransactionType.Debit: {
        category.spendBudget(transaction.amount)
        break
      }
    }

    this.transactions.push(transaction)
    this.domainEvents.emit('budget/transaction-added', {
      description: transaction.description,
      id: transaction.id,
    })
  }

  public addCategory(category: Category) {
    this._categories.push(category)
    this.domainEvents.emit('budget/category-added', {
      budgetId: this._id,
      categoryId: category.id,
      categoryName: category.name,
    })
  }
}

