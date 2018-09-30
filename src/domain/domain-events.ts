type DomainEvent =
  | 'noop'
  | 'account/updated'
  | 'budget/account-added'
  | 'budget/created'
  | 'category/created'
  | 'category/updated'
  | 'payee/created'
  | 'payee/updated'

export interface IEventPayload {
  id: string
}

// tslint:disable-next-line
export class DomainEvents {
  private subscribers: { [event: string]: Array<(payload: any) => void> } = {}

  public subscribe<T>(event: DomainEvent, callback: (payload: T) => void) {
    if (!this.subscribers[event]) {
      this.subscribers[event] = []
    }
    this.subscribers[event].push(callback)
  }

  public publish<T>(event: DomainEvent, payload: T) {
    ;(this.subscribers[event] || []).forEach(cb => cb(payload))
  }
}
