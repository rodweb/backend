import { asValue, AwilixContainer } from 'awilix'
import { expect } from 'chai'
import * as sinon from 'sinon'

import { AddTransaction, IAddTransaction } from 'app'
import { Account, IAccountFactory } from 'domain/account'
import { Budget, IBudgetFactory, IBudgetRepository } from 'domain/budget'
import { IDomainEventEmitter } from 'domain/domain-events'
import { ITransactionFactory, Transaction } from 'domain/transaction'

import container from 'test-container'

describe('Add transaction use case', () => {
  const defaultArgs = {
    amount: 1000,
    budgetId: 'uuid',
    categoryId: 'uuid',
    description: 'transaction',
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
      await budgetRepository.add(budgetFactory.create())
    })

    it('should return the transaction with an id and all properties given', async () => {
      const transaction = await useCase.execute(defaultArgs)

      expect(transaction).to.include({
        amount: 1000,
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

    it('should increase its budget cateogry if to account belongs to the same budget', async () => {
      await useCase.execute(defaultArgs)
      const budget = await budgetRepository.load('uuid')

      const category = budget.categories.find(cat => cat.id === defaultArgs.categoryId)
    })
  })
})

