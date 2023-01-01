import {GetServerSideProps} from 'next';
import {s} from '../../utils/serializer';
import Layout from '../../components/Layout';
import FormattedContent from '../../components/FormattedContent';
import styled from 'styled-components';
import typos from '../../theme/typos';
import Divider from '../../components/Divider';
import {getLegal} from '../../data/legal.data';
import {Spacings} from '../../theme/spacings';
import {provideData} from '../../utils/requests';
import {BaseProps} from '../index';

interface PageProps extends BaseProps {
  legal: Legal;
}

const Container = styled.div`
  margin-bottom: ${Spacings.S3};
`

const Title = styled.h1`
  ${typos.H1};
`

export default function PagePage({url, general, pages, categories, types, legal}: PageProps) {
  return (
    <Layout url={url} pages={pages} categories={categories} types={types} general={general} title={'Mentions légales'}>
      <Container>
        <Title>Mentions légales</Title>
        <Divider/>
        <FormattedContent content={legal.content}/>
        <Divider/>
      </Container>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<PageProps, { slug: string }> = async (context) => {
  return await provideData(
    context,
    async () =>  {
      const legal = s(await getLegal());
      return {legal};
    }
  );
}
