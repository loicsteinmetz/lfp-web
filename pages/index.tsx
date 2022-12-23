import {GetServerSideProps, NextPage} from 'next';
import {s} from '../utils/serializer';
import {getGeneral} from '../data/general.data';
import {getPages} from '../data/pages.data';
import {getCategories} from '../data/categories.data';
import {getTypes} from '../data/types.data';
import {getArticles} from '../data/articles.data';
import Layout from '../components/Layout';
import ArticlesList from '../components/ArticlesList';

interface HomeProps {
  general: General;
  pages: Page[];
  categories: Category[];
  types: Type[];
  articles: Article[];
  totalPages: number;
  currentPage: number;
  url: string;
}

const Home: NextPage<HomeProps> = ({url, general, pages, categories, types, articles, currentPage, totalPages}) => {
  return (
    <Layout url={url} general={general} pages={pages} categories={categories} types={types}>
      <ArticlesList articles={articles} currentPage={currentPage} totalPages={totalPages} frontPageDisplay={true}/>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps, { page: string }> = async (context) => {
  const general = s(await getGeneral('*'));
  const pages = s((await getPages()).data);
  const categories = s((await getCategories()).data);
  const types = s((await getTypes()).data);
  const articlesRes = await getArticles(context.query?.page ?? '1', '*');
  const articles = s(articlesRes.data);
  const totalPages = articlesRes.meta.pageCount;
  const currentPage = articlesRes.meta.page;
  const url = context.req.headers.host + context.resolvedUrl;
  return {props: {general, pages, categories, types, articles, currentPage, totalPages, url}}
}

export default Home;
