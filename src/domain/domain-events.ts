type DomainEvent = "account/created"
  | "account/updated";

interface IEventPayload {
  id: string;
}

// tslint:disable-next-line
class DomainEvents {
  private subscribers: {[event: string]: Array<(payload: any) => void>} = {};

  public subscribe<T>(event: DomainEvent, callback: (payload: T) => void) {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }
    this.subscribers[event].push(callback);
  }

  public publish<T>(event: DomainEvent, payload: T) {
    (this.subscribers[event] || []).forEach((cb) => cb(payload));
  }
}

export {
  IEventPayload,
  DomainEvents,
};
