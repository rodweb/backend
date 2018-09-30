import { IDomainEventEmitter } from 'domain/domain-events'

export class Account {
  get Id() {
    return this.id
  }
  get Name() {
    return this.name
  }

  constructor(private domainEvents: IDomainEventEmitter, private id: string, private name: string) {
    this.domainEvents.emit('account/created', { id: this.id, name })
  }

  public ChangeName(name: string) {
    this.name = name
    this.domainEvents.emit('account/updated', { id: this.id, name })
  }
}
