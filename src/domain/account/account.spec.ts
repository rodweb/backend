import { expect } from "chai";
import "mocha";
import * as sinon from "sinon";

import container from "container";
import { Account, AccountFactory } from "domain/account";
import { DomainEvents } from "domain/domain-events";

describe("Account domain", () => {
  let accountFactory: AccountFactory;
  let domainEvents: DomainEvents;

  beforeEach(() => {
    const scope = container.createScope();
    accountFactory = scope.resolve<AccountFactory>("accountFactory");
    domainEvents = scope.resolve<DomainEvents>("domainEvents");
  });

  describe("when creating an account", () => {
    const accountName = "Bank";

    it("should display its public properties", () => {
      const account = accountFactory.create(accountName);

      expect(account.Id).to.be.a("string");
      expect(account.Name).to.be.equal(accountName);
    });
  });

  describe("when changing its name", () => {
    const [oldName, newName] = ["Old", "New"];

    it("should change its property", () => {
      const account = accountFactory.create(oldName);
      account.ChangeName(newName);
      expect(account.Name).to.be.equal(newName);
    });

    it("should emit an account/updated event", () => {
      const accountUpdatedCallback = sinon.fake();
      domainEvents.subscribe("account/updated", accountUpdatedCallback);

      const account = accountFactory.create(oldName);
      account.ChangeName(newName);

      expect(accountUpdatedCallback.callCount).to.be.equal(1);
      expect(accountUpdatedCallback.lastCall.lastArg).to.has.property("id");
    });
  });
});
