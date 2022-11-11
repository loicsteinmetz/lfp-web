import {envLFP} from '../utils/envLFP';
import {mapExternalMedia, mapLFPMedia, mapMetadata} from './_lfp.data';
import {mapAuthor} from './authors.data';
import {mapCategory} from './categories.data';
import {mapType} from './types.data';
import axios from 'axios';

const ARTICLES_ROOT = envLFP.API_ROOT + '/articles'

export const mapArticle = (d: any): Article => ({
  id: d.id,
  title: d.attributes.title,
  slug: d.attributes.slug,
  extract: d.attributes.extract,
  body: d.attributes.body,
  createdAt: new Date(d.attributes.createdAt),
  updatedAt: new Date(d.attributes.updatedAt),
  publishedAt: new Date(d.attributes.publishedAt),
  cover: d.attributes.cover ? mapLFPMedia(d.attributes.cover) : undefined,
  authors: d.attributes.authors?.data.map(mapAuthor),
  categories: d.attributes.categories?.data.map(mapCategory),
  types: d.attributes.types?.data.map(mapType),
  externalMedia: d.attributes.external_media ? d.attributes.external_media.map(mapExternalMedia) : undefined
})

export const getArticles = async (populate?: PopulatedArticleOption): Promise<WithMetadata<Article[]>> => {
  const result = (await axios.get(
    ARTICLES_ROOT,
    {
      params: {
        populate
      }
    })).data;
  return {
    meta: mapMetadata(result.meta),
    data: result.data.map(mapArticle),
  }
}

export const getArticle = async (id: number, populate?: PopulatedArticleOption): Promise<Article> => {
  return mapArticle((await axios.get(
    `${ARTICLES_ROOT}/${id}`,
    {
      params: {
        populate
      }
    })).data.data);
}

export const findArticleBySlug = async (slug: string, populate?: PopulatedArticleOption): Promise<Article> => {
  return mapArticle((await axios.get(
    ARTICLES_ROOT,
    {
      params: {
        'filters[slug][$eq]': slug,
        populate
      }
    })).data.data[0]);
}