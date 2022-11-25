import React, {FC} from 'react';
import styled from 'styled-components';
import {Colors} from '../theme/colors';
import Head from 'next/head';
import {Spacings} from '../theme/spacings';
import Header from './Header';
import Footer from './Footer';
import {Devices} from '../theme/breakpoints';

export interface LayoutProps {
  title?: string;
  pages: Page[];
  categories: Category[];
  types: Type[];
  general: General;
  children: React.ReactNode;
}

const Container = styled.main`
  padding: ${Spacings.S2} ${Spacings.S2} ${Spacings.S3} ${Spacings.S2};
  background-color: ${Colors.GREY['25']};
  max-width: 900px;
  margin: 0 auto;
  min-height: 50vh;

  @media (${Devices.TABLET}) {
    padding: ${Spacings.S3} ${Spacings.S4};
  }
`

const Layout: FC<LayoutProps> = ({title, pages, categories, types, general, children}) => {
  return (
    <>
      <Head>
        <title>La Fabrique Populaire {title ? `| ${title}` : ''}</title>
        <link rel="icon" type="image/png" href={general.favicon!.url}/>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
      </Head>
      <Header pages={pages} categories={categories} types={types} general={general}/>
      <Container>
        {children}
      </Container>
      <Footer general={general}/>
    </>
  )
}

export default Layout;
