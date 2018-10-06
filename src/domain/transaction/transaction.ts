import { Account, AccountFactory } from 'domain/account'
import { Category } from 'domain/category'
import { IDomainEventEmitter } from 'domain/domain-events'
import { Entity } from 'domain/entity'

// tslint:disable-next-line
type Args = {
  domainEvents: IDomainEventEmitter
  id: string
  budgetId: string
  description: string
  category: Category
  amount: number
  from?: Account
  to?: Account
}

export class Transaction extends Entity {
  get budgetId() {
    return this._budgetId
  }
  get description() {
    return this._description
  }
  get category() {
    return this._category
  }
  get amount() {
    return this._amount
  }
  get from() {
    return this._from
  }
  get to() {
    return this._to
  }

  private _budgetId: string
  private _description: string
  private _amount: number
  private _category?: Category
  private _from?: Account
  private _to?: Account

  constructor(args: Args) {
    super(args.domainEvents, args.id)
    this._budgetId = args.budgetId
    this._description = args.description
    this._category = args.category
    this._amount = args.amount
    this._from = args.from
    this._to = args.to

    this.domainEvents.emit('transaction/created', { id: this._id, description: this.description })
  }
}

