import axios from 'axios';
import {mapArticle} from './articles.data';
import {envLFP} from '../utils/envLFP';
import {mapLFPMedia, mapMetadata} from './_lfp.data';
import {NotFoundError} from '../utils/requests';
import {mapCategory} from './categories.data';
import {mapBookTheme} from './book-themes.data';
import {mapBook} from './books.data';

const OWNERS_ROOT = envLFP.API_ROOT + '/owners';

export const mapOwner = (d: any): Owner => ({
  id: d.id,
  name: d.attributes.name,
  createdAt: new Date(d.attributes.createdAt),
  updatedAt: new Date(d.attributes.updatedAt),
  tel: d.attributes.tel,
  books:  d.attributes.books?.data.map(mapBook),
  slug: d.attributes.slug,
})
