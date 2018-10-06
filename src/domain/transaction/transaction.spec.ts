import { asValue, AwilixContainer } from 'awilix'
import { expect } from 'chai'
import * as sinon from 'sinon'

import { Account, IAccountFactory } from 'domain/account'
import { ICategoryFactory } from 'domain/category'
import { IDomainEventEmitter } from 'domain/domain-events'
import {
  ICreateTransactionFactoryArgs,
  ITransactionFactory,
  Transaction,
  TransactionType,
} from 'domain/transaction'

import container from 'test-container'

describe('Transaction domain', () => {
  let scope: AwilixContainer
  let accountFactory: IAccountFactory
  let categoryFactory: ICategoryFactory
  let transactionFactory: ITransactionFactory
  let domainEvents: IDomainEventEmitter
  let defaultArgs: ICreateTransactionFactoryArgs

  beforeEach(() => {
    scope = container.createScope()
    accountFactory = scope.resolve<IAccountFactory>('accountFactory')
    categoryFactory = scope.resolve<ICategoryFactory>('categoryFactory')
    transactionFactory = scope.resolve<ITransactionFactory>('transactionFactory')
    domainEvents = scope.resolve<IDomainEventEmitter>('domainEvents')

    const fromAccount = accountFactory.create('Bank A')
    const toAccount = accountFactory.create('Bank B')
    const category = categoryFactory.create({ name: 'Category A', budgeted: 1000, available: 1000 })
    defaultArgs = {
      amount: 1000,
      budgetId: 'uuid',
      category,
      description: 'New transaction',
      from: fromAccount,
      to: toAccount,
      type: TransactionType.Credit,
    }
  })

  describe('when creating a transaction', () => {
    it('should display its public properties', () => {
      const transaction = transactionFactory.create(defaultArgs)

      expect(transaction).to.includes(defaultArgs)
    })

    it('should emit a transaction/created event', () => {
      const cb = sinon.fake()
      domainEvents.on('transaction/created', cb)

      const transaction = transactionFactory.create(defaultArgs)

      expect(cb.callCount).to.eql(1)
      expect(cb.lastCall.lastArg).to.deep.equal({
        description: defaultArgs.description,
        id: 'uuid',
      })
    })
  })
})

