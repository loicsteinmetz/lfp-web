import {testMetadata} from '../_lfp/_lfp.data.test';
import {getPage, getPages} from './pages.data';

export const testPage = (page: any) => {
  expect(page.id).toBeTruthy();
  expect(page.title).toBeTruthy();
  expect(page.slug).toBeTruthy();
  expect(page.body).toBeTruthy();
  expect(page.createdAt).toBeTruthy();
  expect(page.updatedAt).toBeTruthy();
  expect(page.publishedAt).toBeTruthy();
}


describe('Pages', () => {
  let id: number;

  describe('getPages', () => {
    it('should fetch pages', async () => {
      const pagesRes = await getPages();
      testMetadata(pagesRes.meta);
      const pages = pagesRes.data;
      expect(pages.length).toBeGreaterThan(0);
      const page = pages[0];
      testPage(page);
      id = page.id;
    })
  })

  describe('getPage', () => {
    it('should fetch page', async () => {
      const page = await getPage(id);
      testPage(page);
    })
  })
})
