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

type Args = {
  domainEvents: IDomainEventEmitter
  id: string
  name: string
  budgeted?: number
  available?: number
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

  private _name: string
  private _budgeted: number
  private _available: number

  constructor(args: Args) {
    super(args.domainEvents, args.id)
    this._name = args.name
    this._budgeted = args.budgeted || 0
    this._available = args.available || 0
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

