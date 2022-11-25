import styled from 'styled-components';
import ArticleCard from './ArticleCard';
import Pagination, {PaginatedPageProps} from './Pagination';
import {useEffect, useState} from 'react';

export interface ArticlesListProps extends PaginatedPageProps {
  articles: Article[];
}

const Container = styled.div`
`

const ArticlesList = ({articles, currentPage, totalPages}: ArticlesListProps) => {
  const [rootUrl, setRootUrl] = useState('');

  useEffect(() => {
    setRootUrl(window.location.pathname);
  }, [])

  return (
    <Container>
      {articles.map((article) => {
        return <ArticleCard key={`article-${article.id}`} article={article}/>
      })}
      <Pagination currentPage={currentPage} totalPages={totalPages} rootUrl={rootUrl}/>
    </Container>
  )
}

export default ArticlesList;
