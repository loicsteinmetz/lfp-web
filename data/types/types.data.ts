import axios from 'axios';
import {mapArticle} from '../articles/articles.data';

const TYPES_ROOT = process.env.API_ROOT + '/types';

export const mapType = (d: any): Type => ({
  id: d.id,
  name: d.attributes.name,
  createdAt: new Date(d.attributes.createdAt),
  updatedAt: new Date(d.attributes.updatedAt),
  articles: d.attributes.articles?.data.map(mapArticle),
})

export const getTypes = async (populate?: PopulatedTypeOption): Promise<Type[]> => {
  return (await axios.get(
    TYPES_ROOT,
    {
      params: {
        populate
      }
    })).data.data.map(mapType);
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
