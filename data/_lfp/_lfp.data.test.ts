export const testLFPMedia = (lfpMedia: any) => {
  expect(lfpMedia.id).toBeTruthy();
}

export const testMetadata = (res: any) => {
  expect(res.page).toBeTruthy();
  expect(res.pageSize).toBeTruthy();
  expect(res.pageCount).toBeTruthy();
  expect(res.total).toBeTruthy();
}

test(' __ Tests running', () => {
  expect('lfp').toBeTruthy();
})
