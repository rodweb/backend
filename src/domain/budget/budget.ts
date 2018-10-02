import { Account, AccountFactory } from 'domain/account'
import { IDomainEventEmitter } from 'domain/domain-events'
import { Entity } from 'domain/entity'

export class Budget extends Entity {
  get accounts() {
    return this._accounts
  }

  constructor(domainEvents: IDomainEventEmitter, _id: string, private _accounts: Account[] = []) {
    super(domainEvents, _id)
    this.domainEvents.emit('budget/created', { budgetId: _id })
  }

  public addAccount(account: Account) {
    this.accounts.push(account)
    this.domainEvents.emit('budget/account-added', {
      accountId: account.id,
      accountName: account.name,
      budgetId: this.id,
    })
  }
}

