import {NextPage} from 'next';
import Error from '../components/Error';

interface NotFoundPageProps {
}

const NotFoundPage: NextPage<NotFoundPageProps> = () => {
  return (
    <Error code={404}/>
  )
}

export default NotFoundPage;
