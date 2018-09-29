import { v4 as uuid } from "uuid";

import { DomainEvents } from "../domain-events";
import { Account, IAccountFactory } from "./";

export class AccountFactory implements IAccountFactory {

  constructor(private domainEvents: DomainEvents) {}

  public create(name: string) {
    const account = new Account(this.domainEvents, uuid(), name);
    return account;
  }
}
