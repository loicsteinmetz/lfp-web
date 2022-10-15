import {NextPage} from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <ul>
      <li><Link href={'/test-csr'}><a>Test CSR</a></Link></li>
      <li><Link href={'/test-ssr'}><a>Test SSR</a></Link></li>
    </ul>
  )
}

export default Home;
