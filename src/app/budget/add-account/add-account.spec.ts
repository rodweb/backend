import awilix, { asValue } from 'awilix'
import { expect } from 'chai'
import * as sinon from 'sinon'

import { AddAccount } from 'app/budget'
import { Account, AccountFactory } from 'domain/account'
import { Budget, BudgetFactory } from 'domain/budget'
import { IDomainEventEmitter } from 'domain/domain-events'

import container from 'container'

describe('Add account use case', () => {
  describe('when adding a new account', () => {
    let scope: awilix.AwilixContainer
    let useCase: AddAccount
    let domainEvents: IDomainEventEmitter

    beforeEach(() => {
      scope = container.createScope()
      const budgetFactory = scope.resolve<BudgetFactory>('budgetFactory')
      const budget = budgetFactory.create()
      scope.register({
        budgetId: asValue(budget.id),
        budgetRepository: asValue({ load: () => Promise.resolve(budget) }),
      })
      useCase = scope.resolve<AddAccount>('addAccount')
      domainEvents = scope.resolve<IDomainEventEmitter>('domainEvents')
    })

    it('should emit a budget/account-added event', async () => {
      const cb = sinon.fake()
      domainEvents.on('budget/account-added', cb)

      const budgetId = scope.resolve<string>('budgetId')
      const command = { budgetId, accountName: 'Bank' }
      const account = await useCase.execute(command)

      expect(cb.lastCall.lastArg).to.have.property('accountId')
      expect(cb.lastCall.lastArg).to.have.property('accountName')
      expect(cb.lastCall.lastArg).to.have.property('budgetId')
      expect(true).to.be.equal(true)
    })

    afterEach(async () => {
      await scope.dispose()
    })
  })
})

