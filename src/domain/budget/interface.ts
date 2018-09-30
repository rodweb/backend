import { Budget } from './'

export interface IBudgetFactory {
  create(): Budget
}

export interface IBudgetRepository {
  add: (budget: Budget) => Promise<void>
  load: (id: string) => Promise<Budget>
}
