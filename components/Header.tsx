import React, {FC} from 'react';
import styled from 'styled-components';
import Banner from './Banner';
import HeaderNav from './HeaderNav';

export interface HeaderProps {
  pages: Page[];
  categories: Category[];
  types: Type[];
  general: General;
}

const Container = styled.header`
`

const Title = styled.h1`
  visibility: hidden;
  height: 0;
  width: 0;
`

const Header: FC<HeaderProps> = ({pages, categories, types, general}) => {
  return (
    <Container>
      <Title>La Fabrique Populaire</Title>
      <Banner banner={general.banner!} logoLg={general.logoLg!}/>
      <HeaderNav logo={general.logo!} pages={pages} categories={categories} types={types} general={general}/>
    </Container>
  )
}

export default Header;
