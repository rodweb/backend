import awilix, { asValue } from 'awilix'
import { expect } from 'chai'
import * as sinon from 'sinon'

import container from 'container'

import { AddAccount, CreateBudget } from 'app'
import { AccountFactory, BudgetFactory } from './domain'

describe('Container', () => {
  it('should build everything correctly', () => {
    const registrations = Object.keys(container.registrations)

    expect(registrations.length).to.be.greaterThan(0)

    // Support
    expect(container.cradle.uuid).to.be.a('function')
    expect(container.cradle.uuid()).to.be.a('string')

    // Factories
    expect(container.cradle.accountFactory).to.be.an.instanceof(AccountFactory)
    expect(container.cradle.budgetFactory).to.be.an.instanceof(BudgetFactory)

    // Use Cases
    expect(container.cradle.addAccount).to.be.an.instanceof(AddAccount)
    expect(container.cradle.createBudget).to.be.an.instanceof(CreateBudget)
  })
})

