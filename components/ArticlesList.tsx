import styled from 'styled-components';
import ArticleCard from './ArticleCard';
import Pagination, {PaginatedPageProps} from './Pagination';
import ArticleCardFront from './ArticleCardFront';
import LibraryBanner from './LibraryBanner';
import useRootUrl from '../utils/rootUrl';
import Events from './Events';
import PostsList from './PostsList';

export interface ArticlesListProps extends PaginatedPageProps {
  articles: Article[];
  frontPageDisplay?: boolean;
}

const Container = styled.div`
`

const ArticlesList = ({articles, frontPageDisplay, currentPage, totalPages}: ArticlesListProps) => {
  const rootUrl = useRootUrl();

  return (
    <Container>
      {articles.map((article, i) => {
        if (i === 0 && currentPage === 1 && frontPageDisplay) {
          return (new Date().getTime() - new Date(article.createdAt).getTime()) < (1000 * 60 * 60 * 24 * 14) ? (
            <>
              <ArticleCardFront key={`article-${article.id}`} article={article}/>
              <Events/>
              <PostsList posts={[1, 2, 3, 4]}/>
              <LibraryBanner/>
            </>
          ) : (
            <>
              <Events/>
              <PostsList posts={[1, 2, 3, 4]}/>
              <ArticleCard key={`article-${article.id}`} article={article}/>
              <LibraryBanner/>
            </>
          )
        } else {
          return <ArticleCard key={`article-${article.id}`} article={article}/>
        }
      })}
      <Pagination currentPage={currentPage} totalPages={totalPages} rootUrl={rootUrl}/>
    </Container>
  )
}

export default ArticlesList;
