import { AddCategoryArgs, IAddCategoryUseCase, IUnitOfWork } from 'app'
import { Budget, IBudgetRepository } from 'domain/budget'
import { Category, ICategoryFactory } from 'domain/category'

export class AddCategoryUseCase implements IAddCategoryUseCase {
  constructor(
    private uow: IUnitOfWork,
    private budgetRepository: IBudgetRepository,
    private categoryFactory: ICategoryFactory,
  ) {}
  public async execute({ budgetId, name }: AddCategoryArgs) {
    const budget = await this.budgetRepository.load(budgetId)
    const category = this.categoryFactory.create({ name })
    budget.addCategory(category)

    await this.uow.done()
    return category
  }
}

