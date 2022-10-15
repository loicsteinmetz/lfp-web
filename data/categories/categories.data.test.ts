import {getCategories, getCategory} from './categories.data';
import {testArticle} from '../articles/articles.data.test';

export const testCategory = (category: any) => {
  expect(category.id).toBeTruthy();
  expect(category.name).toBeTruthy();
  expect(category.createdAt).toBeTruthy();
  expect(category.updatedAt).toBeTruthy();
}

export const testPopulatedCategory = (category: any) => {
  testCategory(category);
  expect(category.articles.length).toBeGreaterThan(0);
  testArticle(category.articles[0]);
}

describe('Categories', () => {
  let id: number;

  describe('getCategories', () => {
    it('should fetch categories', async () => {
      const categories = await getCategories();
      expect(categories.length).toBeGreaterThan(0);
      const category = categories[0];
      testCategory(category);
      id = category.id;
    })

    it('should fetch populated categories', async () => {
      const categories = await getCategories('*');
      expect(categories.length).toBeGreaterThan(0);
      const category = categories[0];
      testPopulatedCategory(category);
    })
  })

  describe('getCategory', () => {
    it('should fetch category', async () => {
      const category = await getCategory(id);
      testCategory(category);
    })

    it('should fetch populated category', async () => {
      const category = await getCategory(id, '*');
      testPopulatedCategory(category);
    })
  })
})
