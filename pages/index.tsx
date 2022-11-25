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
}

const Home: NextPage<HomeProps> = ({general, pages, categories, types, articles}) => {
  return (
    <Layout general={general} pages={pages} categories={categories} types={types}>
      <ArticlesList articles={articles} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps, {page: string}> = async (context) => {
  const general = s(await getGeneral('*'));
  const pages = s((await getPages()).data);
  const categories = s((await getCategories()).data);
  const types = s((await getTypes()).data);
  const articles = s((await getArticles(context.query?.page ?? '1', '*')).data);
  return {props: {general, pages, categories, types, articles}}
}

export default Home;

