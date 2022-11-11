import {testLFPMedia} from '../_lfp/_lfp.data.test';
import {getGeneral} from './general.data';

export const testGeneral = (general: any) => {
  expect(general.id).toBeTruthy();
  expect(general.facebook).toBeTruthy();
  expect(general.youtube).toBeTruthy();
  expect(general.email).toBeTruthy();
  expect(general.createdAt).toBeTruthy();
  expect(general.updatedAt).toBeTruthy();
  expect(general.publishedAt).toBeTruthy();
}

export const testPopulatedGeneral = (general: any) => {
  testGeneral(general);
  testLFPMedia(general.banner);
  testLFPMedia(general.favicon);
  testLFPMedia(general.logo);
  testLFPMedia(general.logoLg);
}

describe('General', () => {
  describe('getGeneral', () => {
    it('should fetch general', async () => {
      const general = await getGeneral();
      testGeneral(general)
    })

    it('should fetch populated general', async () => {
      const general = await getGeneral('*');
      testPopulatedGeneral(general);
    })
  })
})
