import type { NextPage } from 'next'
import {useQuery} from '@tanstack/react-query';
import {getArticles} from '../../data/articles/articles.data';

const Test: NextPage = () => {
  const query = useQuery(['articles'], () => getArticles());

  if (query.isError) {
    return <p>Error</p>
  } else if (query.isLoading) {
    return <p>Loading...</p>
  } else if (query.isSuccess) {
    return (
      <div>
        {query.data.data.map(article => {
          return (
            <p key={article.id}><strong>{article.title}</strong></p>
          )
        })}
      </div>
    )
  } else {
    return <p></p>;
  }
}

export default Test;
