import axios from 'axios';
import {envLFP} from '../utils/envLFP';
import {mapLFPMedia, mapMetadata} from './_lfp.data';
import {mapArticle} from './articles.data';
import {A} from '@storybook/components';
import {NotFoundError} from '../utils/requests';

const AUTHOR_ROOT = envLFP.API_ROOT + '/authors'

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

export const getAuthor = async (id: number, populate?: PopulatedAuthorOption): Promise<Author> => {
  const author = (await axios.get(
    `${AUTHOR_ROOT}/${id}`,
    {
      params: {
        populate
      }
    })).data.data;
  if (!author) throw new NotFoundError();
  return mapAuthor(author);
}

export const getAuthorBySlug = async (slug: string, populate?: PopulatedAuthorOption): Promise<Author> => {
  const author = (await axios.get(
    AUTHOR_ROOT,
    {
      params: {
        'filters[slug][$eq]': slug,
        populate
      }
    })).data.data[0];
  if (!author) throw new NotFoundError();
  return mapAuthor(author);
}
