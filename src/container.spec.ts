import awilix, { asValue } from 'awilix'
import { expect } from 'chai'
import * as sinon from 'sinon'

import container from 'container'

import { AddAccount } from './app'
import { AccountFactory, BudgetFactory } from './domain'

describe('Container', () => {
  it('should build everything correctly', () => {
    const registrations = Object.keys(container.registrations)

    // Factories
    expect(container.cradle.accountFactory).to.be.an.instanceof(AccountFactory)
    expect(container.cradle.budgetFactory).to.be.an.instanceof(BudgetFactory)

    // Use Cases
    expect(container.cradle.addAccount).to.be.an.instanceof(AddAccount)

    expect(registrations).to.have.lengthOf(6)
  })
})
