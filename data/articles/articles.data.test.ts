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

test(' __ Tests running', () => {
  expect('lfp').toBeTruthy();
})
