import { IDomainEventEmitter } from 'domain/domain-events'

export abstract class Entity {
  get id() {
    return this._id
  }

  constructor(protected domainEvents: IDomainEventEmitter, protected _id: string) {}
}

