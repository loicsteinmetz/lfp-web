import axios from 'axios';
import {envLFP} from '../utils/envLFP';
import {mapArticle} from './articles.data';
import {mapMetadata} from './_lfp.data';
import {mapCategory} from './categories.data';
import {NotFoundError} from '../utils/requests';

const TYPES_ROOT = envLFP.API_ROOT + '/types';

export const mapType = (d: any): Type => ({
  id: d.id,
  name: d.attributes.name,
  createdAt: new Date(d.attributes.createdAt),
  updatedAt: new Date(d.attributes.updatedAt),
  articles: d.attributes.articles?.data.map(mapArticle),
  slug: d.attributes.slug,
})

export const getTypes = async (populate?: PopulatedTypeOption): Promise<WithMetadata<Type[]>> => {
  const result = (await axios.get(
    TYPES_ROOT,
    {
      params: {
        populate,
        sort: 'rank:asc'
      }
    })).data;
  return {
    meta: mapMetadata(result.meta),
    data: result.data.map(mapType),
  }
}

export const getTypeBySlug = async (slug: string, populate?: PopulatedTypeOption): Promise<Type> => {
  const type = (await axios.get(
    TYPES_ROOT,
    {
      params: {
        'filters[slug][$eq]': slug,
        populate
      }
    })).data.data[0];
  if (!type) throw new NotFoundError();
  return mapType(type);
}
