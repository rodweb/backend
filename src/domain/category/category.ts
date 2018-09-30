import { IDomainEventEmitter } from 'domain/domain-events'
import { Entity } from 'domain/entity'

// tslint:disable
const Contract = (valid: boolean, message: string) => {
  if (!valid) {
    throw Error(message)
  }
}

const messages = {
  positiveAmount: 'amount_must_be_positive',
  insuficientBudget: 'insuficient_budget',
}

export class Category extends Entity {
  get name() {
    return this._name
  }

  get budgeted() {
    return this._budgeted
  }

  get available() {
    return this._available
  }

  constructor(
    domainEvents: IDomainEventEmitter,
    _id: string,
    private _name: string,
    private _budgeted: number = 0,
    private _available: number = 0,
  ) {
    super(domainEvents, _id)
  }

  public increaseBudget(amount: number) {
    Contract(amount > 0, messages.positiveAmount)

    this._budgeted += amount
    this._available += amount
  }

  public decreaseBudget(amount: number) {
    Contract(amount > 0, messages.positiveAmount)

    this._budgeted -= amount
    this._available -= amount
  }

  public spendBudget(amount: number) {
    Contract(amount > 0, messages.positiveAmount)
    Contract(amount < this._available, messages.insuficientBudget)

    this._available -= amount
  }
}

