import { asClass, asFunction, asValue, createContainer, InjectionMode, Lifetime } from 'awilix'
import * as sinon from 'sinon'
import { v4 as uuid } from 'uuid'

import { AddAccount, CreateBudget } from 'app'
import { AccountFactory, BudgetFactory, DomainEventEmitter } from './domain'

const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
})

// tslint:disable:object-literal-sort-keys
container.register({
  // Support
  uuid: asFunction(() => uuid, { lifetime: Lifetime.SINGLETON }),
  domainEvents: asClass(DomainEventEmitter, { lifetime: Lifetime.SCOPED }),
  uow: asValue({ done: sinon.fake() }),

  // Factories
  accountFactory: asClass(AccountFactory, { lifetime: Lifetime.SCOPED }),
  budgetFactory: asClass(BudgetFactory, { lifetime: Lifetime.SCOPED }),

  // Repositories
  budgetRepository: asValue({ add: sinon.fake(), load: sinon.fake() }),

  // Use Cases
  addAccount: asClass(AddAccount, { lifetime: Lifetime.SCOPED }),
  createBudget: asClass(CreateBudget, { lifetime: Lifetime.SCOPED }),
})

export default container
