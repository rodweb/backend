import { Category } from 'domain/category'
import { Budget } from './'

export interface IBudgetFactory {
  create(): Budget
}

export interface IBudgetRepository {
  add: (budget: Budget) => Promise<void>
  load: (id: string) => Promise<Budget>
}

export interface ICategoryAdded {
  budgetId: string
  categoryId: string
  categoryName: string
}

