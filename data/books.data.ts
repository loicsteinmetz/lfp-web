import axios from 'axios';
import {envLFP} from '../utils/envLFP';
import {mapLFPMedia, mapMetadata} from './_lfp.data';
import {NotFoundError} from '../utils/requests';
import {mapBookTheme} from './book-themes.data';
import {mapOwner} from './owners.data';
import {mapBookAuthor} from './book-authors.data';
import {mapLoan} from './loans.data';

const BOOKS_ROOT = envLFP.API_ROOT + '/books';
const PAGE_SIZE = 15;

export const mapBook = (d: any): Book => ({
  id: d.id,
  name: d.attributes.name,
  createdAt: new Date(d.attributes.createdAt),
  updatedAt: new Date(d.attributes.updatedAt),
  publishedAt: new Date(d.attributes.publishedAt),
  slug: d.attributes.slug,
  abstract: d.attributes.abstract,
  editor: d.attributes.editor,
  year: d.attributes.year,
  cover: d.attributes.cover ? mapLFPMedia(d.attributes.cover) : undefined,
  owner: d.attributes.owner ? mapOwner(d.attributes.owner.data) : undefined,
  authors: d.attributes.authors?.data.map(mapBookAuthor),
  loans: d.attributes.loans?.data.map(mapLoan),
  themes: d.attributes.themes?.data.map(mapBookTheme),
});

export const getBook = async (id: number, populate?: PopulatedBookOption): Promise<Book> => {
  const book = (await axios.get(
    `${BOOKS_ROOT}/${id}`,
    {
      params: {
        populate
      }
    })).data.data;
  if (!book) throw new NotFoundError();
  return mapBook(book);
}

export const getBookBySlug = async (slug: string, populate?: PopulatedBookOption): Promise<Book> => {
  const book = (await axios.get(
    BOOKS_ROOT,
    {
      params: {
        'filters[slug][$eq]': slug,
        populate
      }
    })).data.data[0];
  if (!book) throw new NotFoundError();
  return mapBook(book);
}

export const getBooks = async (page: string | string[], populate?: PopulatedBookOption): Promise<WithMetadata<Book[]>> => {
  const result = (await axios.get(
    BOOKS_ROOT,
    {
      params: {
        sort: 'publishedAt:desc',
        populate,
        'pagination[page]': page,
        'pagination[pageSize]': PAGE_SIZE,
      }
    })).data;
  return {
    meta: mapMetadata(result.meta),
    data: result.data.map(mapBook),
  }
}
