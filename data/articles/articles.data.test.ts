import {testLFPMedia, testMetadata} from '../_lfp/_lfp.data.test';
import {testAuthor} from '../authors/authors.data.test';
import {testCategory} from '../categories/categories.data.test';
import {testType} from '../types/types.data.test';
import {getArticle, getArticles} from './articles.data';

export const testArticle = (article: any) => {
  expect(article.id).toBeTruthy();
  expect(article.title).toBeTruthy();
  expect(article.slug).toBeTruthy();
  expect(article.extract).toBeTruthy();
  expect(article.body).toBeTruthy();
  expect(article.createdAt).toBeTruthy();
  expect(article.updatedAt).toBeTruthy();
  expect(article.publishedAt).toBeTruthy();
}

export const testPopulatedArticle = (article: any) => {
  testArticle(article);
  expect(article.authors.length).toBeGreaterThan(0);
  testAuthor(article.authors[0]);
  expect(article.categories.length).toBeGreaterThan(0);
  testCategory(article.categories[0]);
  expect(article.types.length).toBeGreaterThan(0);
  testType(article.types[0]);
}

describe('Articles', () => {
  let id: number;

  describe('getArticles', () => {
    it('should fetch articles', async () => {
      const articlesRes = await getArticles();
      testMetadata(articlesRes.meta);
      const articles = articlesRes.data;
      expect(articles.length).toBeGreaterThan(0);
      const article = articles[0];
      testArticle(article);
      id = article.id;
    })

    it('should fetch populated articles', async () => {
      const articlesRes = await getArticles('*');
      testMetadata(articlesRes.meta);
      const articles = articlesRes.data;
      expect(articles.length).toBeGreaterThan(0);
      const article = articles[0];
      testPopulatedArticle(article);
    })
  })

  describe('getArticle', () => {
    it('should fetch article', async () => {
      const article = await getArticle(id);
      testArticle(article);
    })

    it('should fetch populated article', async () => {
      const article = await getArticle(id, '*');
      testPopulatedArticle(article);
    })
  })
})
