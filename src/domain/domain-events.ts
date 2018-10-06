import { IAccountCreated, IAccountNameChanged } from 'domain/account'
import { IAccountAdded, IBudgetCreated, ICategoryAdded } from 'domain/budget'
import { ITransactionAdded } from 'domain/transaction'

export interface IEventEmitter<T> {
  on<K extends keyof T>(eventType: K, callback: (payload: T[K]) => void): void
  emit<K extends keyof T>(eventType: K, payload: T[K]): void
}

type DomainEvents =
  | 'account/created'
  | 'account/name-changed'
  | 'account/updated'
  | 'budget/account-added'
  | 'budget/category-added'
  | 'budget/transaction-added'
  | 'budget/created'
  | 'transaction/created'

interface IDomainEvents {
  'account/created': IAccountCreated
  'account/name-changed': IAccountNameChanged
  'account/updated': { id: string; name: string }
  'budget/account-added': IAccountAdded
  'budget/category-added': ICategoryAdded
  'budget/transaction-added': ITransactionAdded
  'budget/created': IBudgetCreated
  'transaction/created': ITransactionAdded
}

export interface IDomainEventEmitter extends IEventEmitter<IDomainEvents> {}

export class DomainEventEmitter implements IDomainEventEmitter {
  private subscribers: { [eventType: string]: Array<(payload: any) => void> } = {}

  public on<K extends DomainEvents>(eventType: K, callback: (payload: IDomainEvents[K]) => void) {
    if (!this.subscribers[eventType]) {
      this.subscribers[eventType] = []
    }
    this.subscribers[eventType].push(callback)
  }

  public emit<K extends DomainEvents>(eventType: K, payload: IDomainEvents[K]) {
    ;(this.subscribers[eventType] || []).forEach(cb => cb(payload))
  }
}

