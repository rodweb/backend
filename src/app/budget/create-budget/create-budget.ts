import { IUnitOfWork } from 'app'
import { ICreateBudgetCommand } from 'app/budget'
import { Budget, IBudgetFactory, IBudgetRepository } from 'domain/budget'

export class CreateBudget {
  constructor(
    private uow: IUnitOfWork,
    private budgetFactory: IBudgetFactory,
    private budgetRepository: IBudgetRepository,
  ) {}

  public async execute(command: ICreateBudgetCommand) {
    const budget = this.budgetFactory.create()
    await this.budgetRepository.add(budget)

    return this.uow.done()
  }
}
