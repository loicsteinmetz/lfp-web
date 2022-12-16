import axios from 'axios';
import {mapLFPMedia} from './_lfp.data';
import {envLFP} from '../utils/envLFP';

const GENERAL_ROOT = envLFP.API_ROOT + '/general'

export const mapGeneral = (d: any): General => ({
  id: d.id,
  facebook: d.attributes.facebook,
  youtube: d.attributes.youtube,
  email: d.attributes.email,
  twitter: d.attributes.twitter,
  instagram: d.attributes.instagram,
  createdAt: d.attributes.createdAt,
  updatedAt: d.attributes.updatedAt,
  publishedAt: d.attributes.publishedAt,
  banner: d.attributes.banner ? mapLFPMedia(d.attributes.banner) : undefined,
  logo: d.attributes.logo ? mapLFPMedia(d.attributes.logo) : undefined,
  logoLg: d.attributes.logo ? mapLFPMedia(d.attributes.logo_lg) : undefined,
  favicon: d.attributes.favicon ? mapLFPMedia(d.attributes.favicon) : undefined,
  maintenance: d.attributes.maintenance,
  description: d.attributes.description,
  cover: d.attributes.cover ? mapLFPMedia(d.attributes.cover) : undefined,
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
