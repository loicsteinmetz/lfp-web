import {GetServerSideProps, NextPage} from 'next';
import Layout from '../components/templates/Layout';
import {s} from '../utils/serializer';
import ArticlesList from '../components/organisms/ArticlesList';
import {getGeneral} from '../data/general.data';
import {getPages} from '../data/pages.data';
import {getCategories} from '../data/categories.data';
import {getTypes} from '../data/types.data';
import {getArticles} from '../data/articles.data';

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

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const general = s(await getGeneral('*'));
  const pages = s((await getPages()).data);
  const categories = s((await getCategories()).data);
  const types = s((await getTypes()).data);
  const articles = s((await getArticles('*')).data);
  return {props: {general, pages, categories, types, articles}}
}

export default Home;

