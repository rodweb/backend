import { asValue, AwilixContainer } from 'awilix'
import { expect } from 'chai'
import * as sinon from 'sinon'

import { AddTransaction, IAddTransaction } from 'app'
import { Account, IAccountFactory } from 'domain/account'
import { Budget, IBudgetFactory, IBudgetRepository } from 'domain/budget'
import { Category } from 'domain/category'
import { IDomainEventEmitter } from 'domain/domain-events'
import { ITransactionFactory, Transaction, TransactionType } from 'domain/transaction'

import container from 'test-container'

describe('Add transaction use case', () => {
  const defaultArgs = {
    amount: 800,
    budgetId: 'uuid',
    categoryId: 'category-1',
    description: 'transaction',
    type: TransactionType.Debit,
  }

  describe('when adding a new transaction', () => {
    let scope: AwilixContainer
    let budgetFactory: IBudgetFactory
    let accountFactory: IAccountFactory
    let transactionFactory: ITransactionFactory
    let useCase: IAddTransaction
    let domainEvents: IDomainEventEmitter
    let budgetRepository: IBudgetRepository

    beforeEach(async () => {
      scope = container.createScope()
      budgetFactory = scope.resolve<IBudgetFactory>('budgetFactory')
      accountFactory = scope.resolve<IAccountFactory>('accountFactory')
      transactionFactory = scope.resolve<ITransactionFactory>('transactionFactory')
      useCase = scope.resolve<IAddTransaction>('addTransaction')
      domainEvents = scope.resolve<IDomainEventEmitter>('domainEvents')
      budgetRepository = scope.resolve<IBudgetRepository>('budgetRepository')
      const budget = new Budget({
        accounts: [
          new Account(domainEvents, 'account-1', 'Account 1'),
          new Account(domainEvents, 'account-2', 'Account 2'),
        ],
        categories: [
          new Category({
            available: 1000,
            budgeted: 1000,
            domainEvents,
            id: 'category-1',
            name: 'Category 1',
          }),
        ],
        domainEvents,
        id: 'uuid',
      })
      await budgetRepository.add(budget)
    })

    it('should return the transaction with an id and all properties given', async () => {
      const transaction = await useCase.execute(defaultArgs)

      expect(transaction).to.include({
        amount: 800,
        budgetId: 'uuid',
        description: 'transaction',
        id: 'uuid',
      })
    })

    it('should emit a budget/transaction-added event', async () => {
      const cb = sinon.fake()
      domainEvents.on('budget/transaction-added', cb)

      await useCase.execute(defaultArgs)

      expect(cb.callCount).to.eql(1)
      expect(cb.lastCall.lastArg).to.have.property('id')
      expect(cb.lastCall.lastArg).to.have.property('description')
    })

    it("should decrease its budget availabe for the category when it's a debit", async () => {
      await useCase.execute(defaultArgs)
      const budget = await budgetRepository.load('uuid')

      const category = budget.categories.find(cat => cat.id === defaultArgs.categoryId) as Category

      expect(category).to.have.property('id')
      expect(category.available).to.eql(200)
    })

    it("should increase its budget availabe for the category when it's a credit", async () => {
      const args = { ...defaultArgs, type: TransactionType.Credit }

      await useCase.execute(args)
      const budget = await budgetRepository.load('uuid')

      const category = budget.categories.find(cat => cat.id === defaultArgs.categoryId) as Category

      expect(category).to.have.property('id')
      expect(category.available).to.eql(1800)
    })
  })
})

