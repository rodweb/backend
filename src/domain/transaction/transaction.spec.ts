import { asValue, AwilixContainer } from 'awilix'
import { expect } from 'chai'
import * as sinon from 'sinon'

import { Account, IAccountFactory } from 'domain/account'
import { IDomainEventEmitter } from 'domain/domain-events'
import { ICreateTransactionFactoryArgs, ITransactionFactory, Transaction } from 'domain/transaction'

import container from 'test-container'

describe('Transaction domain', () => {
  let scope: AwilixContainer
  let accountFactory: IAccountFactory
  let transactionFactory: ITransactionFactory
  let domainEvents: IDomainEventEmitter
  let defaultArgs: ICreateTransactionFactoryArgs

  beforeEach(() => {
    scope = container.createScope()
    accountFactory = scope.resolve<IAccountFactory>('accountFactory')
    transactionFactory = scope.resolve<ITransactionFactory>('transactionFactory')
    domainEvents = scope.resolve<IDomainEventEmitter>('domainEvents')

    const fromAccount = accountFactory.create('Bank A')
    const toAccount = accountFactory.create('Bank B')
    defaultArgs = {
      amount: 1000,
      description: 'New transaction',
      from: fromAccount,
      to: toAccount,
    }
  })

  describe('when creating a transaction', () => {
    it('should display its public properties', () => {
      const transaction = transactionFactory.create(defaultArgs)

      expect(transaction).to.includes(defaultArgs)
    })

    it('should emit a transaction/added event', () => {
      const cb = sinon.fake()
      domainEvents.on('transaction/added', cb)

      const transaction = transactionFactory.create(defaultArgs)

      expect(cb.callCount).to.eql(1)
      expect(cb.lastCall.lastArg).to.deep.equal({
        description: defaultArgs.description,
        id: 'uuid',
      })
    })
  })
})

