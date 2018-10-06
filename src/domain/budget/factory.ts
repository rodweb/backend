import { Account } from 'domain/account'
import { Budget, IBudgetFactory } from 'domain/budget'
import { Category } from 'domain/category'
import { IDomainEventEmitter } from 'domain/domain-events'
import { UUID } from 'domain/interface'
import { Transaction } from 'domain/transaction'

// tslint:disable
export interface RestoreBudgetFactoryArgs {
  id: string
  accounts?: Account[]
  categories?: Category[]
  transactions?: Transaction[]
}

export class BudgetFactory implements IBudgetFactory {
  constructor(private domainEvents: IDomainEventEmitter, private uuid: UUID) {}

  public create() {
    return new Budget({
      domainEvents: this.domainEvents,
      id: this.uuid(),
    })
  }

  public restore(budget: RestoreBudgetFactoryArgs) {
    return new Budget({
      domainEvents: this.domainEvents,
      id: budget.id,
      accounts: budget.accounts,
      categories: budget.categories,
      transactions: budget.transactions,
    })
  }
}

