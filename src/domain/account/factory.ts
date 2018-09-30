import { Account, IAccountFactory } from 'domain/account'
import { IDomainEventEmitter } from 'domain/domain-events'
import { UUID } from 'domain/interface'

export class AccountFactory implements IAccountFactory {
  constructor(private domainEvents: IDomainEventEmitter, private uuid: UUID) {}

  public create(name: string) {
    const account = new Account(this.domainEvents, this.uuid(), name)
    return account
  }
}

