import {mapLFPMedia, mapMetadata} from '../_lfp/_lfp.data';
import {mapArticle} from '../articles/articles.data';
import axios from 'axios';

const AUTHOR_ROOT = process.env.API_ROOT + '/authors'

export const mapAuthor = (d: any): Author => ({
  id: d.id,
  displayName: d.attributes.displayName,
  slug: d.attributes.slug,
  facebook: d.attributes.facebook,
  twitter: d.attributes.twitter,
  instagram: d.attributes.instagram,
  bio: d.attributes.bio,
  createdAt: new Date(d.attributes.createdAt),
  updatedAt: new Date(d.attributes.updatedAt),
  picture: d.attributes.picture ? mapLFPMedia(d.attributes.picture) : undefined,
  articles: d.attributes.articles?.data.map(mapArticle),
})

export const getAuthors = async (populate?: PopulatedAuthorOption): Promise<WithMetadata<Author[]>> => {
  const result = (await axios.get(
    AUTHOR_ROOT,
    {
      params: {
        populate
      }
    })).data;
  return {
    meta: mapMetadata(result.meta),
    data: result.data.map(mapAuthor),
  }
}

export const getAuthor = async (id: number, populate?: PopulatedAuthorOption): Promise<Author> => {
  return mapAuthor((await axios.get(
    `${AUTHOR_ROOT}/${id}`,
    {
      params: {
        populate
      }
    })).data.data);
}
