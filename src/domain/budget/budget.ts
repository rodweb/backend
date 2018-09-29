import { Account, AccountFactory } from "domain/account";
import { DomainEvents } from "domain/domain-events";

class Budget {
  get Accounts() {
    return this.accounts;
  }
  constructor(private domainEvents: DomainEvents, private accounts: Account[] = []) {}

  public addAccount(account: Account) {
    this.accounts.push(account);
    this.domainEvents.publish("budget/account-added", { id: account.Id, name });
  }
}

export {
  Budget,
};
