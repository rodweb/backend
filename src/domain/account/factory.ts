import { v4 as uuid } from "uuid";

import { DomainEvents } from "../domain-events";

import { Account } from "./";

class AccountFactory {

  constructor(private domainEvents: DomainEvents) {}

  public create(name: string) {
    const id = uuid();
    const account = new Account(this.domainEvents, id, name);
    return account;
  }
}

export {
  AccountFactory,
};
