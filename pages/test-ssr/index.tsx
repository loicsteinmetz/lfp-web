import type {GetServerSideProps, NextPage} from 'next'
import {getArticles} from '../../data/articles/articles.data';
import {s} from '../../utils/serializer';

interface TestProps {
  data: WithMetadata<Article[]>;
}

const Test: NextPage<TestProps> = ({data}) => {
  return (
    <div>
      {data.data.map(article => {
        return (
          <p key={article.id}><strong>{article.title}</strong></p>
        )
      })}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<TestProps> = async () => {
  return {
    props: {
      data: s(await getArticles()),
    }
  }
}

export default Test;
