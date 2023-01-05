import axios from 'axios';
import {envLFP} from '../utils/envLFP';
import {NotFoundError} from '../utils/requests';
import {str} from '../utils/serializer';

const LEGAL_ROOT = envLFP.API_ROOT + '/legal'

export const mapLegal = (d: any): Legal => ({
  id: d.id,
  content: str(d.attributes.content),
})

export const getLegal = async (populate?: PopulatedLegalOption): Promise<Legal> => {
  const legal = (await axios.get(
    LEGAL_ROOT,
    {
      params: {
        populate
      }
    })).data.data;
  if (!legal) throw new NotFoundError();
  return mapLegal(legal);
}
