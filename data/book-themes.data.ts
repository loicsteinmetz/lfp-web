import axios from 'axios';
import {mapArticle} from './articles.data';
import {envLFP} from '../utils/envLFP';
import {mapMetadata} from './_lfp.data';
import {NotFoundError} from '../utils/requests';
import {mapBook} from './books.data';

const BOOK_THEMES_ROOT = envLFP.API_ROOT + '/book-themes';

export const mapBookTheme = (d: any): BookTheme => ({
  id: d.id,
  name: d.attributes.name,
  createdAt: new Date(d.attributes.createdAt),
  updatedAt: new Date(d.attributes.updatedAt),
  books: d.attributes.books?.data.map(mapBook),
})
