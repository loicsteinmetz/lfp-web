export const testAuthor = (author: any) => {
  expect(author.id).toBeTruthy();
  expect(author.createdAt).toBeTruthy();
  expect(author.updatedAt).toBeTruthy();
}

test(' __ Tests running', () => {
  expect('lfp').toBeTruthy();
})
