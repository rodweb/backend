export interface IUnitOfWork {
  done: () => Promise<void>
}
