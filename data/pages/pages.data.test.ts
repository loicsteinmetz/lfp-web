export const testPage = (page: any) => {
  expect(page.id).toBeTruthy();
  expect(page.createdAt).toBeTruthy();
  expect(page.updatedAt).toBeTruthy();
}
