import { IDomainEventEmitter } from 'domain/domain-events'
import { Entity } from 'domain/entity'

export class Account extends Entity {
  get name() {
    return this._name
  }

  constructor(
    protected domainEvents: IDomainEventEmitter,
    protected _id: string,
    private _name: string,
  ) {
    super(domainEvents, _id)
    this.domainEvents.emit('account/created', { id: this._id, name: this._name })
  }

  public ChangeName(name: string) {
    this._name = name
    this.domainEvents.emit('account/updated', { id: this._id, name: this._name })
  }
}

