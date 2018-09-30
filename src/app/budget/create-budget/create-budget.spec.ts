import { asValue } from 'awilix'
import { expect } from 'chai'
import * as sinon from 'sinon'

import { CreateBudget } from 'app/budget'
import { IDomainEventEmitter } from 'domain/domain-events'

import container from 'container'

describe('Create budget use case', () => {
  describe('when creating a budget', () => {
    it('should emit a budget/created event', async () => {
      const scope = container.createScope()
      scope.register('uuid', asValue(() => 'uuid'))
      const useCase = scope.resolve<CreateBudget>('createBudget')
      const domainEvents = scope.resolve<IDomainEventEmitter>('domainEvents')

      const cb = sinon.fake()
      domainEvents.on('budget/created', cb)

      const budget = await useCase.execute({})

      expect(cb.callCount).to.be.equal(1)
      expect(cb.lastCall.lastArg).to.have.property('id')
    })
  })
})
