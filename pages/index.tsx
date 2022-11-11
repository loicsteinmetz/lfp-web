import {GetServerSideProps, NextPage} from 'next';
import Layout from '../components/templates/Layout';
import {getGeneral} from '../data/general/general.data';
import {s} from '../utils/serializer';
import {getPages} from '../data/pages/pages.data';
import {getCategories} from '../data/categories/categories.data';
import {getTypes} from '../data/types/types.data';
import ArticlesList from '../components/organisms/ArticlesList';
import {getArticles} from '../data/articles/articles.data';

interface HomeProps {
  general: General;
  pages: Page[];
  categories: Category[];
  types: Type[];
  articles: Article[];
}

const Home: NextPage<HomeProps> = ({general, pages, categories, types, articles}) => {
  return (
    <Layout general={general} pages={pages} title="Hello world" categories={categories} types={types}>
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

