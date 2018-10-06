import { asClass, asFunction, asValue, createContainer, InjectionMode, Lifetime } from 'awilix'
import * as sinon from 'sinon'

import { registrations } from 'container'

import { Budget } from 'domain/budget'

class BudgetRepositoryMock {
  private budgets: { [id: string]: Budget } = {}

  public add = async (budget: Budget) => {
    this.budgets[budget.id] = budget
    return Promise.resolve()
  }

  public load = async (id: string) => {
    return Promise.resolve(this.budgets[id])
  }
}

const container = createContainer({ injectionMode: InjectionMode.CLASSIC })
container.register(registrations)
container.register({
  budgetRepository: asClass(BudgetRepositoryMock, { lifetime: Lifetime.SCOPED }),
})

const uuid = sinon.fake.returns('uuid')
container.register('uuid', asValue(uuid))

export default container

