import { IAddTransaction, IUnitOfWork } from 'app'
import { Budget, IBudgetRepository } from 'domain/budget'
import { Category } from 'domain/category'
import { ITransactionFactory, Transaction } from 'domain/transaction'

// tslint:disable-next-line
type Args = {
  budgetId: string
  categoryId: string
  description: string
  amount: number
}

export class AddTransaction implements IAddTransaction {
  constructor(
    private uow: IUnitOfWork,
    private budgetRepository: IBudgetRepository,
    private transactionFactory: ITransactionFactory,
  ) {}

  public async execute({ budgetId, description, amount, categoryId }: Args) {
    const budget = await this.budgetRepository.load(budgetId)
    const category = budget.categories.find(cat => cat.id === categoryId) as Category

    const transaction = this.transactionFactory.create({
      amount,
      budgetId,
      category,
      description,
      // from,
      // to,
    })
    budget.addTransaction(transaction)

    await this.uow.done()
    return transaction
  }
}

