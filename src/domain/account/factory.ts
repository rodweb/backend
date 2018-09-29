import { v4 as uuid } from "uuid";

import { Account, IAccountFactory } from "domain/account";
import { DomainEvents } from "domain/domain-events";

export class AccountFactory implements IAccountFactory {

  constructor(private domainEvents: DomainEvents) {}

  public create(name: string) {
    const account = new Account(this.domainEvents, uuid(), name);
    return account;
  }
}
