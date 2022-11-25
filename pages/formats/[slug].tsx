import {GetServerSideProps, NextPage} from 'next';
import {getGeneral} from '../../data/general.data';
import {getPages} from '../../data/pages.data';
import {getCategories} from '../../data/categories.data';
import {findTypeBySlug, getTypes} from '../../data/types.data';
import {s} from '../../utils/serializer';
import ArticlesList from '../../components/ArticlesList';
import Layout from '../../components/Layout';
import {findArticlesByType} from '../../data/articles.data';
import styled from 'styled-components';
import typos from '../../theme/typos';
import Divider from '../../components/Divider';
import {Devices} from '../../theme/breakpoints';
import {PaginatedPageProps} from '../../components/Pagination';
import {Spacings} from '../../theme/spacings';

interface TypeProps extends PaginatedPageProps {
  general: General;
  pages: Page[];
  categories: Category[];
  types: Type[];
  type: Type;
  articles: Article[];
}

const Title = styled.h1`
  ${typos.H2};
  margin-top: ${Spacings.S2};

  @media (${Devices.TABLET}) {
    ${typos.H1};
  }
`

const TypePage: NextPage<TypeProps> = ({general, pages, categories, types, type, articles, currentPage, totalPages}) => {
  return (
    <Layout general={general} pages={pages} categories={categories} types={types} title={type.name}>
      <Title>{type.name}</Title>
      <Divider/>
      <ArticlesList articles={articles} currentPage={currentPage} totalPages={totalPages}/>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<TypeProps, { slug: string, page: string }> = async (context) => {
  const general = s(await getGeneral('*'));
  const pages = s((await getPages()).data);
  const categories = s((await getCategories()).data);
  const types = s((await getTypes()).data);
  const type = s((await findTypeBySlug(context.params!.slug)));
  const articlesRes = await findArticlesByType(type.id, context.query?.page ?? '1', '*');
  const articles = s(articlesRes.data);
  const totalPages = articlesRes.meta.pageCount;
  const currentPage = articlesRes.meta.page;
  return {props: {general, pages, categories, types, type, articles, currentPage, totalPages}}
}

export default TypePage;

