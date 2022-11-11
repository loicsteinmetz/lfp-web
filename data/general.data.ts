import axios from 'axios';
import {mapLFPMedia} from './_lfp.data';
import {envLFP} from '../utils/envLFP';

const GENERAL_ROOT = envLFP.API_ROOT + '/general'

export const mapGeneral = (d: any): General => ({
  id: d.id,
  facebook: d.attributes.facebook,
  youtube: d.attributes.youtube,
  email: d.attributes.email,
  createdAt: d.attributes.createdAt,
  updatedAt: d.attributes.updatedAt,
  publishedAt: d.attributes.publishedAt,
  banner: d.attributes.banner ? mapLFPMedia(d.attributes.banner) : undefined,
  logo: d.attributes.logo ? mapLFPMedia(d.attributes.logo) : undefined,
  logoLg: d.attributes.logo ? mapLFPMedia(d.attributes.logo_lg) : undefined,
  favicon: d.attributes.favicon ? mapLFPMedia(d.attributes.favicon) : undefined,
})

export const getGeneral = async (populate?: PopulatedGeneralOption): Promise<General> => {
  return mapGeneral((await axios.get(
    GENERAL_ROOT,
    {
      params: {
        populate
      }
    })).data.data);
}
