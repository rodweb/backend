import { expect } from "chai";
import "mocha";
import * as sinon from "sinon";

import container from "container";
import { Account, AccountFactory } from "domain/account";
import { Budget, BudgetFactory } from "domain/budget";
import { DomainEvents } from "domain/domain-events";

describe("Budget domain", () => {
  let accountFactory: AccountFactory;
  let budgetFactory: BudgetFactory;
  let domainEvents: DomainEvents;

  beforeEach(() => {
    const scope = container.createScope();
    accountFactory = scope.resolve<AccountFactory>("accountFactory");
    budgetFactory = scope.resolve<BudgetFactory>("budgetFactory");
    domainEvents = scope.resolve<DomainEvents>("domainEvents");
  });

  describe("when creating a budget", () => {
    it("should display its public properties", () => {
      const account = budgetFactory.create();

      expect(account.Id).to.be.a("string");
    });

    it("should emit a budget/created event", () => {
      const cb = sinon.fake();
      domainEvents.subscribe("budget/created", cb);

      const budget = budgetFactory.create();

      expect(cb.callCount).to.be.equal(1);
      expect(cb.lastCall.lastArg).to.has.property("id");
    });
  });

  describe("when adding an account", () => {
    it("should add to its public property", () => {
      const budget = budgetFactory.create();
      const account = accountFactory.create("Bank");

      budget.addAccount(account);

      expect(budget.Accounts).to.has.lengthOf(1);
    });

    it("should emit a budget/account-added event", () => {
      const cb = sinon.fake();
      domainEvents.subscribe("budget/created", cb);

      const budget = budgetFactory.create();

      expect(cb.callCount).to.be.equal(1);
      expect(cb.lastCall.lastArg).to.has.property("id");
    });
  });
});
