import { Account } from 'domain/account'
import { IDomainEventEmitter } from 'domain/domain-events'
import { UUID } from 'domain/interface'
import { ICreateTransactionFactoryArgs, ITransactionFactory, Transaction } from 'domain/transaction'

export class TransactionFactory implements ITransactionFactory {
  constructor(private domainEvents: IDomainEventEmitter, private uuid: UUID) {}

  public create({
    budgetId,
    category,
    description,
    amount,
    from,
    to,
    type,
  }: ICreateTransactionFactoryArgs) {
    return new Transaction({
      amount,
      budgetId,
      category,
      description,
      domainEvents: this.domainEvents,
      from,
      id: this.uuid(),
      to,
      type,
    })
  }
}

