import {GetServerSideProps, NextPage} from 'next';
import {s} from '../utils/serializer';
import {getArticles} from '../data/articles.data';
import Layout from '../components/Layout';
import ArticlesList from '../components/ArticlesList';
import {provideData} from '../utils/requests';

export interface BaseProps {
  general: General;
  pages: Page[];
  categories: Category[];
  types: Type[];
  url: string;
}

export interface PaginatedProps extends BaseProps {
  totalPages: number;
  currentPage: number;
}

interface HomePageProps extends PaginatedProps {
  articles: Article[];
}

const HomePage: NextPage<HomePageProps> = ({url, general, pages, categories, types, articles, currentPage, totalPages}) => {
  return (
    <Layout url={url} general={general} pages={pages} categories={categories} types={types}>
      <ArticlesList articles={articles} currentPage={currentPage} totalPages={totalPages} frontPageDisplay={true}/>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<HomePageProps, { page: string }> = async (context) => {
  return await provideData(
    context,
    async () => {
      const articlesRes = await getArticles(context.query?.page ?? '1', '*');
      const articles = s(articlesRes.data);
      const totalPages = articlesRes.meta.pageCount;
      const currentPage = articlesRes.meta.page;
      return {articles, currentPage, totalPages};
    }
  );
}

export default HomePage;
