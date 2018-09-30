import { Category } from 'domain/category'

// tslint:disable-next-line
export interface CreateCategoryFactoryArgs {
  id?: string
  name: string
  available?: number
  budgeted?: number
}

export interface ICategoryFactory {
  create(args: CreateCategoryFactoryArgs): Category
}

