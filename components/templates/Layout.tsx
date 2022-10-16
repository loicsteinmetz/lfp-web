import React, {FC} from 'react';
import styled from 'styled-components';
import {Devices} from '../theme/breakpoints';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';

export interface LayoutProps {
}

const Container = styled.div`
  @media(${Devices.MOBILE}) {
    background-color: green;
    height: 50px;
    min-height: 100%;
  }
`

const Layout: FC<LayoutProps> = ({}) => {
  return (
    <>
      <Header/>
      <Container/>
      <Footer/>
    </>
  )
}

export default Layout;
