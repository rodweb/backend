import { AccountFactory } from "domain/account";
import { DomainEvents } from "domain/domain-events";

class Budget {
  constructor(private domainEvents: DomainEvents, private accountFactory: AccountFactory) {}

  public addAccount(name: string) {
    const account = this.accountFactory.create(name);
    this.domainEvents.publish("account/created", { id: account.Id, name });
    return account;
  }
}

export {
  Budget,
};
