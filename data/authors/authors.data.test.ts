import {testLFPMedia, testMetadata} from '../_lfp/_lfp.data.test';
import {testArticle, testPopulatedArticle} from '../articles/articles.data.test';
import {testCategory} from '../categories/categories.data.test';
import {getAuthor, getAuthors} from './authors.data';

export const testAuthor = (author: any) => {
  expect(author.id).toBeTruthy();
  expect(author.displayName).toBeTruthy();
  expect(author.slug).toBeTruthy();
  expect(author.createdAt).toBeTruthy();
  expect(author.updatedAt).toBeTruthy();
}

export const testPopulatedAuthor = (author: any) => {
  testAuthor(author);
  testLFPMedia(author.picture);
  expect(author.articles.length).toBeGreaterThan(0);
  testArticle(author.articles[0]);
}

describe('Authors', () => {
  let id: number;

  describe('getAuthors', () => {
    it('should fetch authors', async () => {
      const authorsRes = await getAuthors();
      testMetadata(authorsRes.meta);
      const authors = authorsRes.data;
      expect(authors.length).toBeGreaterThan(0);
      const author = authors[0];
      testAuthor(author);
      id = author.id;
    })

    it('should fetch populated authors', async () => {
      const authorsRes = await getAuthors('*');
      testMetadata(authorsRes.meta);
      const authors = authorsRes.data;
      expect(authors.length).toBeGreaterThan(0);
      const author = authors[0];
      testPopulatedAuthor(author);
    })
  })

  describe('getAuthor', () => {
    it('should fetch author', async () => {
      const author = await getAuthor(id);
      testAuthor(author);
    })

    it('should fetch populated author', async () => {
      const author = await getAuthor(id, '*');
      testPopulatedAuthor(author);
    })
  })
})
