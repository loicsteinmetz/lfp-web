import React, {FC} from 'react';
import styled from 'styled-components';
import {Devices} from '../theme/breakpoints';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import {Colors} from '../theme/colors';
import Head from 'next/head';
import {Spacings} from '../theme/spacings';

export interface LayoutProps {
  title?: string;
  pages: Page[];
  categories: Category[];
  types: Type[];
  general: General;
  children: React.ReactNode;
}

const Container = styled.div`
  @media(${Devices.MOBILE}) {
    padding: ${Spacings.S2};
    background-color: ${Colors.GREY['25']};
    max-width: 1200px;
    margin: 0 auto;
  }
`

const Layout: FC<LayoutProps> = ({title, pages, categories, types, general, children}) => {
  return (
    <>
      <Head>
        <title>La Fabrique Populaire {title ? `| ${title}` : ''}</title>
        <link rel="icon" type="image/png" href={general.favicon!.url} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header pages={pages} categories={categories} types={types} general={general}/>
      <Container>
        {children}
      </Container>
      <Footer/>
    </>
  )
}

export default Layout;
