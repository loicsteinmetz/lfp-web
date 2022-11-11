import ArticleCard from '../molecules/ArticleCard';
import styled from 'styled-components';
import {Spacings} from '../theme/spacings';

export interface ArticlesListProps {
  articles: Article[];
}

const Container = styled.div`
`

const ArticlesList = ({articles}: ArticlesListProps) => {
  return (
    <Container>
      {articles.map((article) => {
        return <ArticleCard key={`article-${article.id}`} article={article}/>
      })}
    </Container>
  )
}

export default ArticlesList;
