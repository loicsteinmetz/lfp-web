import {testArticle} from '../articles/articles.data.test';
import {getType, getTypes} from './types.data';
import {testMetadata} from '../_lfp/_lfp.data.test';

export const testType = (type: any) => {
  expect(type.id).toBeTruthy();
  expect(type.name).toBeTruthy();
  expect(type.createdAt).toBeTruthy();
  expect(type.updatedAt).toBeTruthy();
}

export const testPopulatedType = (type: any) => {
  testType(type);
  expect(type.articles.length).toBeGreaterThan(0);
  testArticle(type.articles[0]);
}

describe('Types', () => {
  let id: number;

  describe('getTypes', () => {
    it('should fetch types', async () => {
      const typesRes = await getTypes();
      testMetadata(typesRes.meta);
      const types = typesRes.data;
      expect(types.length).toBeGreaterThan(0);
      const type = types[0];
      testType(type);
      id = type.id;
    })

    it('should fetch populated types', async () => {
      const typesRes = await getTypes('*');
      testMetadata(typesRes.meta);
      const types = typesRes.data;
      expect(types.length).toBeGreaterThan(0);
      const type = types[0];
      testPopulatedType(type);
    })
  })

  describe('getType', () => {
    it('should fetch type', async () => {
      const type = await getType(id);
      testType(type);
    })

    it('should fetch populated type', async () => {
      const type = await getType(id, '*');
      testPopulatedType(type);
    })
  })
})
