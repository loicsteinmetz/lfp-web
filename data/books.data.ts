import axios from 'axios';
import {mapArticle} from './articles.data';
import {envLFP} from '../utils/envLFP';
import {mapLFPMedia, mapMetadata} from './_lfp.data';
import {NotFoundError} from '../utils/requests';
import {mapCategory} from './categories.data';
import {mapBookTheme} from './book-themes.data';
import {mapOwner} from './owners.data';
import {mapBookAuthor} from './book-authors.data';
import {mapLoan} from './loans.data';

const BOOKS_ROOT = envLFP.API_ROOT + '/books';

export const mapBook = (d: any): Book => ({
  id: d.id,
  name: d.attributes.name,
  createdAt: new Date(d.attributes.createdAt),
  updatedAt: new Date(d.attributes.updatedAt),
  slug: d.attributes.slug,
  abstract: d.attributes.abstract,
  editor: d.attributes.editor,
  year: d.attributes.year,
  cover: d.attributes.cover ? mapLFPMedia(d.attributes.cover) : undefined,
  owner: d.attributes.owner ? mapOwner(d.attributes.owner.data) : undefined,
  authors: d.attributes.authors?.data.map(mapBookAuthor),
  loans: d.attributes.loans?.data.map(mapLoan),
  themes:  d.attributes.themes?.data.map(mapBookTheme),
})

export const getBooks = async (populate?: PopulatedBookOption): Promise<WithMetadata<Book[]>> => {
  const result = (await axios.get(
    BOOKS_ROOT,
    {
      params: {
        populate,
      }
    })).data;
  return {
    meta: mapMetadata(result.meta),
    data: result.data.map(mapBook),
  }
}
