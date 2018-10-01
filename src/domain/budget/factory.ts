import { Account } from 'domain/account'
import { Budget, IBudgetFactory } from 'domain/budget'
import { IDomainEventEmitter } from 'domain/domain-events'
import { UUID } from 'domain/interface'

// tslint:disable
export interface RestoreBudgetFactoryArgs {
  id: string
  accounts: Account[]
}

export class BudgetFactory implements IBudgetFactory {
  constructor(private domainEvents: IDomainEventEmitter, private uuid: UUID) {}

  public create() {
    const budget = new Budget(this.domainEvents, this.uuid())
    return budget
  }

  public restore(budget: RestoreBudgetFactoryArgs) {
    return new Budget(this.domainEvents, budget.id, budget.accounts)
  }
}

