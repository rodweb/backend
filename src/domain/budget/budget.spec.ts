import { asValue, AwilixContainer } from 'awilix'
import { expect } from 'chai'
import * as sinon from 'sinon'

import { Account, AccountFactory } from 'domain/account'
import { Budget, BudgetFactory } from 'domain/budget'
import { Category } from 'domain/category'
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

      expect(account.id).to.be.equal('uuid')
    })

    it('should emit a budget/created event', () => {
      const cb = sinon.fake()
      domainEvents.on('budget/created', cb)

      const budget = budgetFactory.create()

      expect(cb.callCount).to.be.equal(1)
      expect(cb.lastCall.lastArg).to.be.deep.equal({ budgetId: 'uuid' })
    })
  })

  describe('when reconstructing an existing budget', () => {
    it('should display its public properties', () => {
      const accountOne = accountFactory.create('one')
      const accountTwo = accountFactory.create('two')

      const budget = budgetFactory.restore({ id: 'uuid', accounts: [accountOne, accountTwo] })

      expect(budget.accounts).to.have.lengthOf(2)
      expect(budget.id).to.eql('uuid')
    })
  })

  describe('when adding an account', () => {
    it('should add to its public property', () => {
      const budget = budgetFactory.create()
      const account = accountFactory.create('Bank')

      budget.addAccount(account)

      expect(budget.accounts).to.have.lengthOf(1)
    })

    it('should emit a budget/created event', () => {
      const cb = sinon.fake()
      domainEvents.on('budget/created', cb)

      const budget = budgetFactory.create()

      expect(cb.callCount).to.be.equal(1)
      expect(cb.lastCall.lastArg).to.be.deep.equal({ budgetId: 'uuid' })
    })
  })

  describe('when adding a category', () => {
    it('should add to its categories list', () => {
      const budget = new Budget({ domainEvents, id: 'budget-id' })
      const category = new Category({ domainEvents, id: 'category-id', name: 'Name' })

      budget.addCategory(category)

      expect(budget.categories).to.have.lengthOf(1)
      expect(budget.categories[0].id).to.eql('category-id')
    })

    it('should emit a budget/category-added', () => {
      const cb = sinon.fake()
      const budget = new Budget({ domainEvents, id: 'budget-id' })
      const category = new Category({ domainEvents, id: 'category-id', name: 'category name' })

      domainEvents.on('budget/category-added', cb)
      budget.addCategory(category)

      expect(cb.callCount).to.eql(1)
      expect(cb.lastCall.lastArg).to.be.deep.equal({
        budgetId: 'budget-id',
        categoryId: 'category-id',
        categoryName: 'category name',
      })
    })
  })

  describe('when adding a transaction', () => {
    it('should add to its transactions list', () => {})
  })

  afterEach(async () => {
    await scope.dispose()
  })
})

