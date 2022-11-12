import {GetServerSideProps, NextPage} from 'next';
import {getGeneral} from '../../data/general.data';
import {getPages} from '../../data/pages.data';
import {getCategories} from '../../data/categories.data';
import {findTypeBySlug, getTypes} from '../../data/types.data';
import {s} from '../../utils/serializer';
import ArticlesList from '../../components/ArticlesList';
import Layout from '../../components/Layout';
import {getArticle} from '../../data/articles.data';
import styled from 'styled-components';
import typos from '../../theme/typos';
import Divider from '../../components/Divider';
import {Devices} from '../../theme/breakpoints';

interface TypeProps {
  general: General;
  pages: Page[];
  categories: Category[];
  types: Type[];
  type: Type;
  articles: Article[];
}

const Title = styled.h1`
  ${typos.H2};

  @media (${Devices.TABLET}) {
    ${typos.H1};
  }
`

const TypePage: NextPage<TypeProps> = ({general, pages, categories, types, type, articles}) => {
  return (
    <Layout general={general} pages={pages} categories={categories} types={types} title={type.name}>
      <Title>{type.name}</Title>
      <Divider/>
      <ArticlesList articles={articles}/>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<TypeProps, { slug: string }> = async (context) => {
  const general = s(await getGeneral('*'));
  const pages = s((await getPages()).data);
  const categories = s((await getCategories()).data);
  const types = s((await getTypes()).data);
  const type = s((await findTypeBySlug(context.params!.slug, '*')));
  const articles = await Promise.all(type.articles.map(async (a: any) => s(((await getArticle(a.id, '*'))))));
  return {props: {general, pages, categories, types, type, articles}}
}

export default TypePage;

