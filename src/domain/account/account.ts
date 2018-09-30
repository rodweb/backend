import { DomainEvents } from 'domain/domain-events'

export class Account {
  get Id() {
    return this.id
  }
  get Name() {
    return this.name
  }
  constructor(private domainEvents: DomainEvents, private id: string, private name: string) {}

  public ChangeName(name: string) {
    this.name = name
    this.domainEvents.publish('account/updated', { id: this.id, name })
  }
}
