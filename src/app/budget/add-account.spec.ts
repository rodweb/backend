import { expect } from "chai";
import "mocha";
import * as sinon from "sinon";

import { AddAccount } from "app/budget";
import { Account, AccountFactory } from "domain/account";
import { DomainEvents } from "domain/domain-events";

import container from "../../container";

describe("Add account use case", () => {
  describe("when adding a new account", () => {
    let useCase: AddAccount;
    let domainEvents: DomainEvents;

    beforeEach(() => {
      const scope = container.createScope();
      useCase = scope.resolve<AddAccount>("addAccount");
      domainEvents = scope.resolve<DomainEvents>("domainEvents");
    });

    it("should emit an event", async () => {
      const cb = sinon.fake();
      domainEvents.subscribe("account/created", cb);

      const command = { budgetId: "uuid", accountName: "Bank" };
      const account = await useCase.execute(command);

      expect(cb.lastCall.lastArg).to.has.property("id");
    });
  });
});
