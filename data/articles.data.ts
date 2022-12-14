import {envLFP} from '../utils/envLFP';
import {mapExternalMedia, mapLFPMedia, mapMetadata} from './_lfp.data';
import {mapAuthor} from './authors.data';
import {mapCategory} from './categories.data';
import {mapType} from './types.data';
import axios from 'axios';
import {NotFoundError} from '../utils/requests';
import {str} from '../utils/serializer';

const ARTICLES_ROOT = envLFP.API_ROOT + '/articles'
const PAGE_SIZE = 10;

export const mapArticle = (d: any): Article => ({
  id: d.id,
  title: str(d.attributes.title),
  slug: d.attributes.slug,
  extract: str(d.attributes.extract),
  body: str(d.attributes.body),
  createdAt: new Date(d.attributes.createdAt),
  updatedAt: new Date(d.attributes.updatedAt),
  publishedAt: new Date(d.attributes.publishedAt),
  cover: d.attributes.cover ? mapLFPMedia(d.attributes.cover) : undefined,
  authors: d.attributes.authors?.data.map(mapAuthor),
  categories: d.attributes.categories?.data.map(mapCategory),
  types: d.attributes.types?.data.map(mapType),
  externalMedia: d.attributes.external_media ? d.attributes.external_media.map(mapExternalMedia) : undefined,
  keywords: d.attributes.keywords ? d.attributes.keywords.map((k: any) => k.keyword) : undefined,
  info: str(d.attributes.info),
  footer: str(d.attributes.footer),
  subjectsId: d.attributes.subjects?.data.map((s: any) => s.id),
})

export const getArticles = async (page: string | string[], populate?: PopulatedArticleOption): Promise<WithMetadata<Article[]>> => {
  const result = (await axios.get(
    ARTICLES_ROOT,
    {
      params: {
        sort: 'publishedAt:desc',
        populate,
        'pagination[page]': page,
        'pagination[pageSize]': PAGE_SIZE,
        'filters[public][$eq]': true,
      }
    })).data;
  return {
    meta: mapMetadata(result.meta),
    data: result.data.map(mapArticle),
  }
}

export const getArticleBySlug = async (slug: string, populate?: PopulatedArticleOption): Promise<Article> => {
  const article = (await axios.get(
    ARTICLES_ROOT,
    {
      params: {
        'filters[slug][$eq]': slug,
        populate
      }
    })).data.data[0];
  if (!article) throw new NotFoundError();
  return mapArticle(article);
}

export const findArticlesByCategory = async (catId: number, page: string | string[], populate?: PopulatedArticleOption): Promise<WithMetadata<Article[]>> => {
  const result = (await axios.get(
    ARTICLES_ROOT,
    {
      params: {
        populate,
        'filters[categories][id][$eq]': catId,
        sort: 'publishedAt:desc',
        'pagination[page]': page,
        'pagination[pageSize]': PAGE_SIZE,
        'filters[public][$eq]': true,
      }
    })).data;
  return {
    meta: mapMetadata(result.meta),
    data: result.data.map(mapArticle),
  }
}

export const findArticlesByType = async (typedId: number, page: string | string[], populate?: PopulatedArticleOption): Promise<WithMetadata<Article[]>> => {
  const result = (await axios.get(
    ARTICLES_ROOT,
    {
      params: {
        populate,
        'filters[types][id][$eq]': typedId,
        sort: 'publishedAt:desc',
        'pagination[page]': page,
        'pagination[pageSize]': PAGE_SIZE,
        'filters[public][$eq]': true,
      }
    })).data;
  return {
    meta: mapMetadata(result.meta),
    data: result.data.map(mapArticle),
  }
}

export const findArticlesByAuthor = async (authorId: number, page: string | string[], populate?: PopulatedArticleOption): Promise<WithMetadata<Article[]>> => {
  const result = (await axios.get(
    ARTICLES_ROOT,
    {
      params: {
        populate,
        'filters[authors][id][$eq]': authorId,
        sort: 'publishedAt:desc',
        'pagination[page]': page,
        'pagination[pageSize]': PAGE_SIZE,
        'filters[public][$eq]': true,
      }
    })).data;
  return {
    meta: mapMetadata(result.meta),
    data: result.data.map(mapArticle),
  }
}

export const findRelatedArticles = async (subjectsId: number[], articleId: number, populate?: PopulatedArticleOption): Promise<Article[]> => {
  let result: Article[] = [];
    for (const s of subjectsId) {
      result = [...result, ...(
        (await axios.get(
            ARTICLES_ROOT,
            {
              params: {
                populate,
                'filters[subjects][id][$eq]': s,
                sort: 'publishedAt:desc',
                'pagination[pageSize]': 50,
                'filters[public][$eq]': true,
              }
            })
        ).data.data.map(mapArticle))]
    }
  return result
    .filter(a => a.id !== articleId)
    .filter((v, i, s) => s.indexOf(s.find(a => a.id === v.id)!) === i);
}
