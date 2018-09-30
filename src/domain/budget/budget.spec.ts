import { asValue, AwilixContainer } from 'awilix'
import { expect } from 'chai'
import * as sinon from 'sinon'

import { Account, AccountFactory } from 'domain/account'
import { Budget, BudgetFactory } from 'domain/budget'
import { IDomainEventEmitter } from 'domain/domain-events'

import container from 'test-container'

describe('Budget domain', () => {
  let scope: AwilixContainer
  let accountFactory: AccountFactory
  let budgetFactory: BudgetFactory
  let domainEvents: IDomainEventEmitter

  beforeEach(() => {
    scope = container.createScope()
    accountFactory = scope.resolve<AccountFactory>('accountFactory')
    budgetFactory = scope.resolve<BudgetFactory>('budgetFactory')
    domainEvents = scope.resolve<IDomainEventEmitter>('domainEvents')
  })

  describe('when creating a budget', () => {
    it('should display its public properties', () => {
      const account = budgetFactory.create()

      expect(account.Id).to.be.equal('uuid')
    })

    it('should emit a budget/created event', () => {
      const cb = sinon.fake()
      domainEvents.on('budget/created', cb)

      const budget = budgetFactory.create()

      expect(cb.callCount).to.be.equal(1)
      expect(cb.lastCall.lastArg).to.be.deep.equal({ budgetId: 'uuid' })
    })
  })

  describe('when adding an account', () => {
    it('should add to its public property', () => {
      const budget = budgetFactory.create()
      const account = accountFactory.create('Bank')

      budget.addAccount(account)

      expect(budget.Accounts).to.have.lengthOf(1)
    })

    it('should emit a budget/created event', () => {
      const cb = sinon.fake()
      domainEvents.on('budget/created', cb)

      const budget = budgetFactory.create()

      expect(cb.callCount).to.be.equal(1)
      expect(cb.lastCall.lastArg).to.be.deep.equal({ budgetId: 'uuid' })
    })
  })

  afterEach(async () => {
    await scope.dispose()
  })
})
