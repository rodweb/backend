import { Account, AccountFactory } from "domain/account";
import { DomainEvents } from "domain/domain-events";

export class Budget {
  get Id() {
    return this.id;
  }
  get Accounts() {
    return this.accounts;
  }
  constructor(private domainEvents: DomainEvents, private id: string, private accounts: Account[] = []) {
    this.domainEvents.publish("budget/created", { id });
  }

  public addAccount(account: Account) {
    this.accounts.push(account);
    this.domainEvents.publish("budget/account-added", { id: account.Id, name });
  }
}
