import { Account, AccountFactory } from 'domain/account'
import { IDomainEventEmitter } from 'domain/domain-events'

export class Budget {
  get Id() {
    return this.id
  }
  get Accounts() {
    return this.accounts
  }

  constructor(
    private domainEvents: IDomainEventEmitter,
    private id: string,
    private accounts: Account[] = [],
  ) {
    this.domainEvents.emit('budget/created', { id })
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
