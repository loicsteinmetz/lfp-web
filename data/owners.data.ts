import {envLFP} from '../utils/envLFP';
import {mapBook} from './books.data';

const OWNERS_ROOT = envLFP.API_ROOT + '/owners';

export const mapOwner = (d: any): Owner => ({
  id: d.id,
  name: d.attributes.name,
  createdAt: new Date(d.attributes.createdAt),
  updatedAt: new Date(d.attributes.updatedAt),
  tel: d.attributes.tel,
  books: d.attributes.books?.data.map(mapBook),
  slug: d.attributes.slug,
})
