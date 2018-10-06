import { Category } from 'domain/category'

export interface IAddCategoryUseCase {
  execute(args: AddCategoryArgs): Promise<Category>
}

export type AddCategoryArgs = {
  budgetId: string
  name: string
}

