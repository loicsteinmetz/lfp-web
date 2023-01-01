import {GetServerSideProps, NextPage} from 'next';
import {getTypeBySlug} from '../../data/types.data';
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
import {provideData} from '../../utils/requests';
import {BaseProps} from '../index';

interface TypeProps extends PaginatedPageProps, BaseProps {
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

const TypePage: NextPage<TypeProps> = ({url, general, pages, categories, types, type, articles, currentPage, totalPages}) => {
  return (
    <Layout url={url} general={general} pages={pages} categories={categories} types={types} title={type.name}>
      <Title>{type.name}</Title>
      <Divider/>
      <ArticlesList articles={articles} currentPage={currentPage} totalPages={totalPages}/>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<TypeProps, { slug: string, page: string }> = async (context) => {
  return await provideData(
    context,
    async () => {
      const type = s((await getTypeBySlug(context.params!.slug)));
      const articlesRes = await findArticlesByType(type.id, context.query?.page ?? '1', '*');
      const articles = s(articlesRes.data);
      const totalPages = articlesRes.meta.pageCount;
      const currentPage = articlesRes.meta.page;
      return {type, articles, currentPage, totalPages};
    }
  );
}

export default TypePage;

