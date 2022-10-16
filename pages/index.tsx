import {NextPage} from 'next';
import Link from 'next/link';
import {envLFP} from '../utils/envLFP';

const Home: NextPage = () => {
  return (
    <div>{envLFP.API_ROOT}</div>
  )
}

export default Home;
