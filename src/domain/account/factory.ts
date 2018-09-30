import { Account, IAccountFactory } from 'domain/account'
import { IDomainEventEmitter } from 'domain/domain-events'

export class AccountFactory implements IAccountFactory {
  constructor(private domainEvents: IDomainEventEmitter, private uuid: () => string) {}

  public create(name: string) {
    const account = new Account(this.domainEvents, this.uuid(), name)
    return account
  }
}
