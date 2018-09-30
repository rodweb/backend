import { Budget, IBudgetFactory } from 'domain/budget'
import { IDomainEventEmitter } from 'domain/domain-events'
import { UUID } from 'domain/interface'

export class BudgetFactory implements IBudgetFactory {
  constructor(private domainEvents: IDomainEventEmitter, private uuid: UUID) {}

  public create() {
    const budget = new Budget(this.domainEvents, this.uuid())
    return budget
  }
}

