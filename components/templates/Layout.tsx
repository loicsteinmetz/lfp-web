import React, {FC} from 'react';
import styled from 'styled-components';
import {Devices} from '../theme/breakpoints';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import {Colors} from '../theme/colors';
import Head from 'next/head';

export interface LayoutProps {
  title: string;
  children: React.ReactNode;
}

const Container = styled.div`
  @media(${Devices.MOBILE}) {
    background-color: ${Colors.GREY['100']};
    height: 100%;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }
`

const Layout: FC<LayoutProps> = ({title, children}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header/>
      <Container>
        {children}
      </Container>
      <Footer/>
    </>
  )
}

export default Layout;
