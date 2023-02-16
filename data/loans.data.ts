import axios from 'axios';
import {mapArticle} from './articles.data';
import {envLFP} from '../utils/envLFP';
import {mapLFPMedia, mapMetadata} from './_lfp.data';
import {NotFoundError} from '../utils/requests';
import {mapCategory} from './categories.data';
import {mapBookTheme} from './book-themes.data';
import {mapBook} from './books.data';
import {mapOwner} from './owners.data';

const LOANS_ROOT = envLFP.API_ROOT + '/loans';

export const mapLoan = (d: any): Loan => ({
  id: d.id,
  createdAt: new Date(d.attributes.createdAt),
  updatedAt: new Date(d.attributes.updatedAt),
  owner:  d.attributes.owner ? mapOwner(d.attributes.owner) : undefined,
  name: d.attributes.string,
  book: d.attributes.book ? mapBook(d.attributes.book) : undefined,
  contact_tel: d.attributes.contact_tel,
  contact_name: d.attributes.contact_name,
  status: d.attributes.status,
  loan_date: new Date(d.attributes.loan_date),
  estimated_return_date: new Date(d.attributes.estimated_return_date)
});
