import { Category, CreateCategoryFactoryArgs, ICategoryFactory } from 'domain/category'
import { IDomainEventEmitter } from 'domain/domain-events'
import { UUID } from 'domain/interface'

export class CategoryFactory implements ICategoryFactory {
  constructor(private domainEvents: IDomainEventEmitter, private uuid: UUID) {}

  public create({ id, name, budgeted, available }: CreateCategoryFactoryArgs) {
    return new Category({
      available,
      budgeted,
      domainEvents: this.domainEvents,
      id: id || this.uuid(),
      name,
    })
  }
}

