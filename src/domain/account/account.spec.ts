import { expect } from 'chai'
import * as sinon from 'sinon'

import container from 'container'
import { Account, AccountFactory } from 'domain/account'
import { IDomainEventEmitter } from 'domain/domain-events'

describe('Account domain', () => {
  let accountFactory: AccountFactory
  let domainEvents: IDomainEventEmitter

  beforeEach(() => {
    const scope = container.createScope()
    accountFactory = scope.resolve<AccountFactory>('accountFactory')
    domainEvents = scope.resolve<IDomainEventEmitter>('domainEvents')
  })

  describe('when creating an account', () => {
    const accountName = 'Bank'

    it('should display its public properties', () => {
      const account = accountFactory.create(accountName)

      expect(account.id).to.be.a('string')
      expect(account.name).to.be.equal(accountName)
    })

    it('should emit an account/created event', () => {
      const cb = sinon.fake()
      domainEvents.on('account/created', cb)

      const account = accountFactory.create(accountName)

      expect(cb.callCount).to.be.equal(1)
      expect(cb.lastCall.lastArg).to.have.property('id')
    })
  })

  describe('when changing its name', () => {
    const [oldName, newName] = ['Old', 'New']

    it('should change its property', () => {
      const account = accountFactory.create(oldName)
      account.ChangeName(newName)
      expect(account.name).to.be.equal(newName)
    })

    it('should emit an account/updated event', () => {
      const cb = sinon.fake()
      domainEvents.on('account/updated', cb)

      const account = accountFactory.create(oldName)
      account.ChangeName(newName)

      expect(cb.callCount).to.be.equal(1)
      expect(cb.lastCall.lastArg).to.have.property('id')
    })
  })
})

