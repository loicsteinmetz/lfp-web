import axios from 'axios';
import {envLFP} from '../utils/envLFP';

const LEGAL_ROOT = envLFP.API_ROOT + '/legal'

export const mapGeneral = (d: any): Legal => ({
  id: d.id,
  content: d.attributes.content,
})

export const getLegal = async (populate?: PopulatedLegalOption): Promise<Legal> => {
  return mapGeneral((await axios.get(
    LEGAL_ROOT,
    {
      params: {
        populate
      }
    })).data.data);
}
