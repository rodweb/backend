import { v4 as uuid } from "uuid";

import { Budget } from "domain/budget";
import { DomainEvents } from "domain/domain-events";

export class BudgetFactory {
  constructor(private domainEvents: DomainEvents) {}

  public create() {
    const budget = new Budget(this.domainEvents, uuid());
    return budget;
  }
}
