import { Account, AccountFactory } from 'domain/account'
import { IDomainEventEmitter } from 'domain/domain-events'

export class Budget {
  get id() {
    return this._id
  }
  get accounts() {
    return this._accounts
  }

  constructor(
    private domainEvents: IDomainEventEmitter,
    private _id: string,
    private _accounts: Account[] = [],
  ) {
    this.domainEvents.emit('budget/created', { budgetId: _id })
  }

  public addAccount(account: Account) {
    this.accounts.push(account)
    this.domainEvents.emit('budget/account-added', {
      accountId: account.Id,
      accountName: account.Name,
      budgetId: this.id,
    })
  }
}


