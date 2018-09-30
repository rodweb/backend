import { expect } from 'chai'

import { Category, ICategoryFactory } from 'domain/category'
import container from 'test-container'

describe('Category domain', () => {
  const categoryName = 'Category'
  let categoryFactory: ICategoryFactory
  let newCategory: Category
  let existingCategory: Category
  beforeEach(() => {
    categoryFactory = container.resolve<ICategoryFactory>('categoryFactory')
    newCategory = categoryFactory.create({ name: categoryName })
    existingCategory = categoryFactory.create({ name: categoryName, available: 200, budgeted: 200 })
  })

  describe('when creating a category', () => {
    it('should display its public properties', () => {
      const category = categoryFactory.create({ name: categoryName })

      expect(category).to.include({ id: 'uuid', name: categoryName })
    })
  })

  describe('when retrieving an existing category', () => {
    it('should display its public properties', () => {
      const args = {
        available: 200,
        budgeted: 1000,
        id: 'existing-uuid',
        name: categoryName,
      }
      const category = categoryFactory.create(args)

      expect(category).to.include(args)
    })
  })

  describe('when increasing its budget', () => {
    it('should update its budgeted and available amount', () => {
      existingCategory.increaseBudget(100)

      expect(existingCategory.budgeted).to.eql(300)
      expect(existingCategory.available).to.eql(300)
    })

    it('should throw for less than to zero amount', () => {
      const fn = () => existingCategory.increaseBudget(-1)

      expect(fn).to.throw()
    })

    it('should throw for zero amount', () => {
      const fn = () => existingCategory.increaseBudget(0)

      expect(fn).to.throw()
    })
  })

  describe('when decreasing its budget', () => {
    it('should update its budgeted and available amount', () => {
      existingCategory.decreaseBudget(100)

      expect(existingCategory.budgeted).to.eql(100)
      expect(existingCategory.available).to.eql(100)
    })

    it('should throw for less than zero amount', () => {
      const fn = () => existingCategory.decreaseBudget(-1)

      expect(fn).to.throw()
    })

    it('should throw for zero amount', () => {
      const fn = () => existingCategory.decreaseBudget(0)

      expect(fn).to.throw()
    })
  })

  describe('when spending its budget', () => {
    it('should update its available amount', () => {
      existingCategory.spendBudget(100)

      expect(existingCategory.budgeted).to.eql(200)
      expect(existingCategory.available).to.eql(100)
    })

    it('should throw for less than zero amount', () => {
      const fn = () => existingCategory.spendBudget(-1)

      expect(fn).to.throw()
    })

    it('should throw for zero amount', () => {
      const fn = () => existingCategory.spendBudget(0)

      expect(fn).to.throw()
    })

    it(`should throw when there's no budget available`, () => {
      const fn = () => existingCategory.spendBudget(201)

      expect(fn).to.throw()
    })
  })
})

