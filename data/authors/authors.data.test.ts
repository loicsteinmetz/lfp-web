export const testAuthor = (author: any) => {
  expect(author.id).toBeTruthy();
  expect(author.createdAt).toBeTruthy();
  expect(author.updatedAt).toBeTruthy();
}
