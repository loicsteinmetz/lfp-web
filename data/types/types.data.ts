import axios from 'axios';
import {mapArticle} from '../articles/articles.data';
import {mapMetadata} from '../_lfp/_lfp.data';
import {envLFP} from '../../utils/envLFP';

const TYPES_ROOT = envLFP.API_ROOT + '/types';

export const mapType = (d: any): Type => ({
  id: d.id,
  name: d.attributes.name,
  createdAt: new Date(d.attributes.createdAt),
  updatedAt: new Date(d.attributes.updatedAt),
  articles: d.attributes.articles?.data.map(mapArticle),
})

export const getTypes = async (populate?: PopulatedTypeOption): Promise<WithMetadata<Type[]>> => {
  const result = (await axios.get(
    TYPES_ROOT,
    {
      params: {
        populate
      }
    })).data;
  return {
    meta: mapMetadata(result.meta),
    data: result.data.map(mapType),
  }
}

export const getType = async (id: number, populate?: PopulatedTypeOption): Promise<Type> => {
  return mapType((await axios.get(
    `${TYPES_ROOT}/${id}`,
    {
      params: {
        populate
      }
    })).data.data);
}
