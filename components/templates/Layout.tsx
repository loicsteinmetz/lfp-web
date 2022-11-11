import React, {FC} from 'react';
import styled from 'styled-components';
import {Devices} from '../theme/breakpoints';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import {Colors} from '../theme/colors';
import Head from 'next/head';

export interface LayoutProps {
  title: string;
  pages: Page[];
  categories: Category[];
  types: Type[];
  general: General;
  children: React.ReactNode;
}

const Container = styled.div`
  @media(${Devices.MOBILE}) {
    background-color: ${Colors.GREY['25']};
    height: 100%;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }
`

const Layout: FC<LayoutProps> = ({title, pages, categories, types, general, children}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
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
