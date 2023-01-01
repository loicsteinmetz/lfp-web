import {GetServerSideProps} from 'next';
import {s} from '../../utils/serializer';
import {getPageBySlug} from '../../data/pages.data';
import Layout from '../../components/Layout';
import FormattedContent from '../../components/FormattedContent';
import styled from 'styled-components';
import typos from '../../theme/typos';
import Divider from '../../components/Divider';
import React from 'react';
import {Spacings} from '../../theme/spacings';
import {provideData} from '../../utils/requests';
import {BaseProps} from '../index';

interface PageProps extends BaseProps {
  page: Page;
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

export const getServerSideProps: GetServerSideProps<PageProps, { slug: string }> = async (context) => {
  return await provideData(
    context,
    async () => {
      const page = s((await getPageBySlug(context.params!.slug)));
      return {page};
    }
  );
}
