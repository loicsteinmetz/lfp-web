import axios from 'axios';
import {envLFP} from '../utils/envLFP';
import {mapBook} from './books.data';
import {mapOwner} from './owners.data';

const LOANS_ROOT = envLFP.API_ROOT + '/loans';

export const mapLoan = (d: any): Loan => ({
  id: d.id,
  createdAt: new Date(d.attributes.createdAt),
  updatedAt: new Date(d.attributes.updatedAt),
  owner: d.attributes.owner ? mapOwner(d.attributes.owner) : undefined,
  name: d.attributes.string,
  book: d.attributes.book ? mapBook(d.attributes.book) : undefined,
  contact_tel: d.attributes.contact_tel,
  contact_name: d.attributes.contact_name,
  status: d.attributes.status,
  loan_date: new Date(d.attributes.loan_date),
  estimated_return_date: new Date(d.attributes.estimated_return_date)
});
export const createLoanDemand = async (data: {
  bookId: number,
  contact: string,
  name: string,
  recaptcha: string,
}): Promise<Loan> => {
  const result = (await axios.post(
    LOANS_ROOT,
    {
      data: {
        book: data.bookId,
        status: 'demand',
        contact_name: data.name,
        contact_tel: data.contact,
        recaptcha: data.recaptcha,
      }
    })).data;
  return mapLoan(result.data);
}
