import {GetServerSideProps, NextPage} from 'next';
import {getGeneral} from '../../data/general.data';
import {getPages} from '../../data/pages.data';
import {findCategoryBySlug, getCategories} from '../../data/categories.data';
import {getTypes} from '../../data/types.data';
import {s} from '../../utils/serializer';
import ArticlesList from '../../components/ArticlesList';
import Layout from '../../components/Layout';
import {findArticlesByCategory} from '../../data/articles.data';
import styled from 'styled-components';
import typos from '../../theme/typos';
import Divider from '../../components/Divider';
import {Devices} from '../../theme/breakpoints';
import {PaginatedPageProps} from '../../components/Pagination';

interface CategoryProps extends PaginatedPageProps {
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

const CategoryPage: NextPage<CategoryProps> = ({general, pages, categories, types, category, articles, totalPages, currentPage}) => {
  return (
    <Layout general={general} pages={pages} categories={categories} types={types} title={category.name}>
      <Title>{category.name}</Title>
      <Divider/>
      <ArticlesList articles={articles} totalPages={totalPages} currentPage={currentPage}/>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<CategoryProps, { slug: string, page: string }> = async (context) => {
  const general = s(await getGeneral('*'));
  const pages = s((await getPages()).data);
  const categories = s((await getCategories()).data);
  const types = s((await getTypes()).data);
  const category = s((await findCategoryBySlug(context.params!.slug)));
  const articlesRes = await findArticlesByCategory(category.id, context.query?.page ?? '1', '*');
  const articles = s(articlesRes.data);
  const totalPages = articlesRes.meta.pageCount;
  const currentPage = articlesRes.meta.page;
  return {props: {general, pages, categories, types, category, articles, totalPages, currentPage}}
}

export default CategoryPage;

