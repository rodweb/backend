import { v4 as uuid } from "uuid";

import { DomainEvents } from "../domain-events";
import { Budget } from "./";

export class BudgetFactory {
  constructor(private domainEvents: DomainEvents) {}

  public create() {
    const budget = new Budget(this.domainEvents, uuid());
    return budget;
  }
}
