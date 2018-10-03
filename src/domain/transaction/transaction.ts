import { Account, AccountFactory } from 'domain/account'
import { IDomainEventEmitter } from 'domain/domain-events'
import { Entity } from 'domain/entity'

export class Transaction extends Entity {
  get description() {
    return this._description
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

  constructor(
    protected domainEvents: IDomainEventEmitter,
    protected _id: string,
    private _description: string,
    private _amount: number,
    private _from?: Account,
    private _to?: Account,
  ) {
    super(domainEvents, _id)

    this.domainEvents.emit('transaction/added', { id: _id, description: _description })
  }
}

