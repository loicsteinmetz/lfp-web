import axios from 'axios';
import {mapArticle} from '../articles/articles.data';
import {mapMetadata} from '../_lfp/_lfp.data';
import {envLFP} from '../../utils/envLFP';

const CATEGORIES_ROOT = envLFP.API_ROOT + '/categories';

export const mapCategory = (d: any): Category => ({
  id: d.id,
  name: d.attributes.name,
  createdAt: new Date(d.attributes.createdAt),
  updatedAt: new Date(d.attributes.updatedAt),
  articles: d.attributes.articles?.data.map(mapArticle),
})

export const getCategories = async (populate?: PopulatedCategoryOption): Promise<WithMetadata<Category[]>> => {
  const result = (await axios.get(
    CATEGORIES_ROOT,
    {
      params: {
        populate
      }
    })).data;
  return {
    meta: mapMetadata(result.meta),
    data: result.data.map(mapCategory),
  }
}

export const getCategory = async (id: number, populate?: PopulatedCategoryOption): Promise<Category> => {
  return mapCategory((await axios.get(
    `${CATEGORIES_ROOT}/${id}`,
    {
      params: {
        populate
      }
    })).data.data);
}
