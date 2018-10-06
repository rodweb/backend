import { IAddCategoryUseCase, IUnitOfWork } from 'app'
import { Budget, IBudgetRepository } from 'domain/budget'
import { Category, ICategoryFactory } from 'domain/category'
import { IDomainEventEmitter } from 'domain/domain-events'
import * as Typemoq from 'typemoq'

import { AddCategoryUseCase } from '../add-category/use-case'

describe('Add category use case', () => {
  describe('when adding a new category', () => {
    it('should emit a new budget/category-added event', async () => {
      const domainEvents = Typemoq.Mock.ofType<IDomainEventEmitter>().object
      const budget = new Budget({ domainEvents, id: 'budget-id' })
      const category = new Category({ domainEvents, id: 'category-id', name: 'category-name' })

      const uow = Typemoq.Mock.ofType<IUnitOfWork>()

      const budgetRepository = Typemoq.Mock.ofType<IBudgetRepository>()
      budgetRepository.setup(x => x.load('budget-id')).returns(() => Promise.resolve(budget))

      const categoryFactory = Typemoq.Mock.ofType<ICategoryFactory>()
      categoryFactory.setup(x => x.create({ name: 'category-name' })).returns(() => category)

      const useCase: IAddCategoryUseCase = new AddCategoryUseCase(
        uow.object,
        budgetRepository.object,
        categoryFactory.object,
      )

      const result = await useCase.execute({ budgetId: 'budget-id', name: 'category-name' })
    })
  })
})

