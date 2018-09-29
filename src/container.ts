import { asClass, asFunction, asValue, createContainer, InjectionMode, Lifetime } from "awilix";
import * as sinon from "sinon";

import { AddAccount } from "./app";
import {
  AccountFactory,
  BudgetFactory,
  DomainEvents,
} from "./domain";

const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
});

// tslint:disable:object-literal-sort-keys
container.register({
  // Support
  domainEvents: asClass(DomainEvents, { lifetime: Lifetime.SCOPED }),
  uow: asValue({ done: sinon.fake() }),

  // Factories
  accountFactory: asClass(AccountFactory, { lifetime: Lifetime.SCOPED }),
  budgetFactory: asClass(BudgetFactory, { lifetime: Lifetime.SCOPED }),

  // Repositories
  budgetRepository: asValue({ add: sinon.fake(), load: sinon.fake() }),

  // Use Cases
  addAccount: asClass(AddAccount, { lifetime: Lifetime.SCOPED }),
});

export default container;
