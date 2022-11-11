import axios from 'axios';
import {envLFP} from '../utils/envLFP';
import {mapMetadata} from './_lfp.data';

const PAGES_ROOT = envLFP.API_ROOT + '/pages'

export const mapPage = (d: any): Page => ({
  id: d.id,
  title: d.attributes.title,
  slug: d.attributes.slug,
  body: d.attributes.body,
  createdAt: new Date(d.attributes.createdAt),
  updatedAt: new Date(d.attributes.updatedAt),
  publishedAt: new Date(d.attributes.publishedAt),
})

export const getPages = async (populate?: PopulatedPageOption): Promise<WithMetadata<Page[]>> => {
  const result = (await axios.get(
    PAGES_ROOT,
    {
      params: {
        populate
      }
    })).data;
  return {
    meta: mapMetadata(result.meta),
    data: result.data.map(mapPage),
  }
}

export const getPage = async (id: number, populate?: PopulatedPageOption): Promise<Page> => {
  return mapPage((await axios.get(
    `${PAGES_ROOT}/${id}`,
    {
      params: {
        populate
      }
    })).data.data);
}
