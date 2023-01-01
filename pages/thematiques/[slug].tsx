import {GetServerSideProps, NextPage} from 'next';
import {getCategoryBySlug} from '../../data/categories.data';
import {s} from '../../utils/serializer';
import ArticlesList from '../../components/ArticlesList';
import Layout from '../../components/Layout';
import {findArticlesByCategory} from '../../data/articles.data';
import styled from 'styled-components';
import typos from '../../theme/typos';
import Divider from '../../components/Divider';
import {Devices} from '../../theme/breakpoints';
import {PaginatedPageProps} from '../../components/Pagination';
import {Spacings} from '../../theme/spacings';
import {provideData} from '../../utils/requests';
import {BaseProps} from '../index';

interface CategoryProps extends PaginatedPageProps, BaseProps {
  category: Category;
  articles: Article[];
}

const Title = styled.h1`
  ${typos.H2};
  margin-top: ${Spacings.S2};

  @media (${Devices.TABLET}) {
    ${typos.H1};
  }
`

const CategoryPage: NextPage<CategoryProps> = ({url, general, pages, categories, types, category, articles, totalPages, currentPage}) => {
  return (
    <Layout url={url} general={general} pages={pages} categories={categories} types={types} title={category.name}>
      <Title>{category.name}</Title>
      <Divider/>
      <ArticlesList articles={articles} totalPages={totalPages} currentPage={currentPage}/>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<CategoryProps, { slug: string, page: string }> = async (context) => {
  return await provideData(
    context,
    async () => {
      const category = s((await getCategoryBySlug(context.params!.slug)));
      const articlesRes = await findArticlesByCategory(category.id, context.query?.page ?? '1', '*');
      const articles = s(articlesRes.data);
      const totalPages = articlesRes.meta.pageCount;
      const currentPage = articlesRes.meta.page;
      return {category, articles, totalPages, currentPage};
    }
  );
}

export default CategoryPage;

