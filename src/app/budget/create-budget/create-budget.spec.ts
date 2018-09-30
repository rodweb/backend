import { asValue, AwilixContainer } from 'awilix'
import { expect } from 'chai'
import * as sinon from 'sinon'

import { CreateBudget } from 'app/budget'
import { IDomainEventEmitter } from 'domain/domain-events'

import container from 'test-container'

describe('Create budget use case', () => {
  let scope: AwilixContainer

  beforeEach(() => {
    scope = container.createScope()
  })

  describe('when creating a budget', () => {
    it('should emit a budget/created event', async () => {
      const useCase = scope.resolve<CreateBudget>('createBudget')
      const domainEvents = scope.resolve<IDomainEventEmitter>('domainEvents')

      const cb = sinon.fake()
      domainEvents.on('budget/created', cb)

      const budget = await useCase.execute({})

      expect(cb.callCount).to.be.equal(1)
      expect(cb.lastCall.lastArg).to.be.deep.equal({ budgetId: 'uuid' })
    })
  })

  afterEach(async () => {
    await scope.dispose()
  })
})
