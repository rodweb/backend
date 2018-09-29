import { asClass, asFunction, asValue, createContainer, InjectionMode, Lifetime } from "awilix";
import * as sinon from "sinon";

import { AddAccount } from "./app/budget";
import { AccountFactory } from "./domain/account";
import { DomainEvents } from "./domain/domain-events";

const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
});

container.register({
  accountFactory: asClass(AccountFactory, { lifetime: Lifetime.SCOPED }),
  addAccount: asClass(AddAccount, { lifetime: Lifetime.SCOPED }),
  budgetRepository: asValue({ add: () => {}, load: () => {} }),
  domainEvents: asClass(DomainEvents, { lifetime: Lifetime.SCOPED }),
  uow: asValue({ done: () => Promise.resolve() }),
});

export default container;
