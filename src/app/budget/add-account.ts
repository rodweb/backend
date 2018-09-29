import { Account } from "domain/account";
import { Budget } from "domain/budget";

interface IAddAccountCommand {
  budgetId: string;
  accountName: string;
}

interface IUnitOfWork {
  done: () => Promise<void>;
}

interface IBudgetRepository {
  add: (account: Account) => Promise<void>;
  load: (id: string) => Promise<Budget>;
}

class AddAccount {
  constructor(private uow: IUnitOfWork, private budgetRepository: IBudgetRepository) {}

  public async execute(command: IAddAccountCommand) {
    const budget = await this.budgetRepository.load(command.budgetId);
    const account = budget.addAccount(command.accountName);

    await this.uow.done();
    return account;
  }
}

export {
  AddAccount,
};
