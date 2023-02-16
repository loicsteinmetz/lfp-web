import axios from 'axios';
import {mapArticle} from './articles.data';
import {envLFP} from '../utils/envLFP';
import {mapLFPMedia, mapMetadata} from './_lfp.data';
import {NotFoundError} from '../utils/requests';
import {mapCategory} from './categories.data';
import {mapBook} from './books.data';

const BOOK_AUTHORS_ROOT = envLFP.API_ROOT + '/book-authors';

export const mapBookAuthor = (d: any): BookAuthor => ({
  id: d.id,
  name: d.attributes.name,
  createdAt: new Date(d.attributes.createdAt),
  updatedAt: new Date(d.attributes.updatedAt),
  books:  d.attributes.books?.data.map(mapBook),
})
