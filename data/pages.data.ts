import axios from 'axios';
import {envLFP} from '../utils/envLFP';
import {mapMetadata} from './_lfp.data';
import {NotFoundError} from '../utils/requests';
import {str} from '../utils/serializer';

const PAGES_ROOT = envLFP.API_ROOT + '/pages'

export const mapPage = (d: any): Page => ({
  id: d.id,
  title: str(d.attributes.title),
  slug: d.attributes.slug,
  body: str(d.attributes.body),
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

export const getPageBySlug = async (slug: string, populate?: PopulatedPageOption): Promise<Page> => {
  const page = (await axios.get(
    PAGES_ROOT,
    {
      params: {
        'filters[slug][$eq]': slug,
        populate
      }
    })).data.data[0];
  if (!page) throw new NotFoundError();
  return mapPage(page);
}
