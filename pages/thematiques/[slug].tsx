import {GetServerSideProps, NextPage} from 'next';
import {getGeneral} from '../../data/general.data';
import {getPages} from '../../data/pages.data';
import {findCategoryBySlug, getCategories} from '../../data/categories.data';
import {findTypeBySlug, getTypes} from '../../data/types.data';
import {s} from '../../utils/serializer';
import ArticlesList from '../../components/ArticlesList';
import Layout from '../../components/Layout';
import {getArticle} from '../../data/articles.data';
import styled from 'styled-components';
import typos from '../../theme/typos';
import Divider from '../../components/Divider';
import {Devices} from '../../theme/breakpoints';

interface CategoryProps {
  general: General;
  pages: Page[];
  categories: Category[];
  types: Type[];
  category: Category;
  articles: Article[];
}

const Title = styled.h1`
  ${typos.H2};

  @media (${Devices.TABLET}) {
    ${typos.H1};
  }
`

const CategoryPage: NextPage<CategoryProps> = ({general, pages, categories, types, category, articles}) => {
  return (
    <Layout general={general} pages={pages} categories={categories} types={types}>
      <Title>{category.name}</Title>
      <Divider/>
      <ArticlesList articles={articles}/>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<CategoryProps, { slug: string }> = async (context) => {
  const general = s(await getGeneral('*'));
  const pages = s((await getPages()).data);
  const categories = s((await getCategories()).data);
  const types = s((await getTypes()).data);
  const category = s((await findCategoryBySlug(context.params!.slug, '*')));
  const articles = await Promise.all(category.articles.map(async (a: any) => s(((await getArticle(a.id, '*'))))));
  return {props: {general, pages, categories, types, category, articles}}
}

export default CategoryPage;

