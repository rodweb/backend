import { Account } from 'domain/account'
import { IDomainEventEmitter } from 'domain/domain-events'
import { UUID } from 'domain/interface'
import { ICreateTransactionFactoryArgs, ITransactionFactory, Transaction } from 'domain/transaction'

export class TransactionFactory implements ITransactionFactory {
  constructor(private domainEvents: IDomainEventEmitter, private uuid: UUID) {}

  public create({ description, amount, from, to }: ICreateTransactionFactoryArgs) {
    return new Transaction(this.domainEvents, this.uuid(), description, amount, from, to)
  }
}

