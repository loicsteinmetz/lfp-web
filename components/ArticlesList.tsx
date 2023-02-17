import styled from 'styled-components';
import ArticleCard from './ArticleCard';
import Pagination, {PaginatedPageProps} from './Pagination';
import {useEffect, useState} from 'react';
import ArticleCardFront from './ArticleCardFront';

export interface ArticlesListProps extends PaginatedPageProps {
  articles: Article[];
  frontPageDisplay?: boolean;
}

const Container = styled.div`
`

const ArticlesList = ({articles, frontPageDisplay, currentPage, totalPages}: ArticlesListProps) => {
  const [rootUrl, setRootUrl] = useState('');

  useEffect(() => {
    setRootUrl(window.location.pathname);
  }, [])

  return (
    <Container>
      {articles.map((article, i) => {
        if (i === 0 && currentPage === 1 && frontPageDisplay) {
          return <ArticleCardFront key={`article-${article.id}`} article={article}/>
        } else {
          return <ArticleCard key={`article-${article.id}`} article={article}/>
        }
      })}
      <Pagination currentPage={currentPage} totalPages={totalPages} rootUrl={rootUrl}/>
    </Container>
  )
}

export default ArticlesList;
