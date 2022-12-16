import {GetServerSideProps} from 'next';
import {s} from '../../utils/serializer';
import {getGeneral} from '../../data/general.data';
import {findPageBySlug, getPages} from '../../data/pages.data';
import {getCategories} from '../../data/categories.data';
import {getTypes} from '../../data/types.data';
import Layout from '../../components/Layout';
import FormattedContent from '../../components/FormattedContent';
import styled from 'styled-components';
import typos from '../../theme/typos';
import Divider from '../../components/Divider';
import React from 'react';
import {Spacings} from '../../theme/spacings';

interface PageProps {
  general: General;
  pages: Page[];
  categories: Category[];
  types: Type[];
  page: Page;
  url: string;
}

const Container = styled.div`
  margin-bottom: ${Spacings.S3};
`

const Title = styled.h1`
  ${typos.H1};
`

export default function PagePage({url, general, pages, categories, types, page}: PageProps) {
  return (
    <Layout url={url} pages={pages} categories={categories} types={types} general={general} title={page.title}>
      <Container>
        <Title>{page.title}</Title>
        <Divider/>
        <FormattedContent content={page.body}/>
        <Divider/>
      </Container>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<PageProps, {slug: string}> = async (context) => {
  const url = context.req.headers.host + context.resolvedUrl;
  const general = s(await getGeneral('*'));
  const pages = s((await getPages()).data);
  const categories = s((await getCategories()).data);
  const types = s((await getTypes()).data);
  const page = s((await findPageBySlug(context.params!.slug)));
  return {props: {general, pages, categories, types, page, url}}
}
