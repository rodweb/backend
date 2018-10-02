import { IAddAccountCommand, IUnitOfWork } from 'app'
import { Account, IAccountFactory } from 'domain/account'
import { Budget, IBudgetRepository } from 'domain/budget'

export class AddAccount {
  constructor(
    private uow: IUnitOfWork,
    private accountFactory: IAccountFactory,
    private budgetRepository: IBudgetRepository,
  ) {}

  public async execute(command: IAddAccountCommand) {
    const budget = await this.budgetRepository.load(command.budgetId)
    const account = this.accountFactory.create(command.accountName)
    budget.addAccount(account)

    await this.uow.done()
    return account
  }
}

