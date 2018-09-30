import { IDomainEventEmitter } from 'domain/domain-events'

export abstract class Entity {
  get id() {
    return this._id
  }

  constructor(private domainEvents: IDomainEventEmitter, private _id: string) {}
}

