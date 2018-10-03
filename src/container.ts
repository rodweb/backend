import { asClass, asFunction, asValue, createContainer, InjectionMode, Lifetime } from 'awilix'
import * as sinon from 'sinon'
import { v4 as uuid } from 'uuid'

import { AddAccount, CreateBudget } from 'app'
import {
  AccountFactory,
  BudgetFactory,
  CategoryFactory,
  DomainEventEmitter,
  TransactionFactory,
} from './domain'

const container = createContainer({ injectionMode: InjectionMode.CLASSIC })

// tslint:disable:object-literal-sort-keys
export const registrations = {
  // Support
  uuid: asFunction(() => uuid, { lifetime: Lifetime.SINGLETON }),
  domainEvents: asClass(DomainEventEmitter, { lifetime: Lifetime.SCOPED }),
  uow: asValue({ done: sinon.fake() }),

  // Factories
  accountFactory: asClass(AccountFactory, { lifetime: Lifetime.SCOPED }),
  budgetFactory: asClass(BudgetFactory, { lifetime: Lifetime.SCOPED }),
  categoryFactory: asClass(CategoryFactory, { lifetime: Lifetime.SCOPED }),
  transactionFactory: asClass(TransactionFactory, { lifetime: Lifetime.SCOPED }),

  // Repositories
  budgetRepository: asValue({ add: sinon.fake(), load: sinon.fake() }),

  // Use Cases
  addAccount: asClass(AddAccount, { lifetime: Lifetime.SCOPED }),
  createBudget: asClass(CreateBudget, { lifetime: Lifetime.SCOPED }),
}

container.register(registrations)

export default container

