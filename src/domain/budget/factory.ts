import { Budget, IBudgetFactory } from 'domain/budget'
import { IDomainEventEmitter } from 'domain/domain-events'

export class BudgetFactory implements IBudgetFactory {
  constructor(private domainEvents: IDomainEventEmitter, private uuid: () => string) {}

  public create() {
    const budget = new Budget(this.domainEvents, this.uuid())
    return budget
  }
}
