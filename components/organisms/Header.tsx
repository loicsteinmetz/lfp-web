import React, {FC} from 'react';
import styled from 'styled-components';
import Banner from '../atoms/media/Banner';
import HeaderNav from '../molecules/HeaderNav';

export interface HeaderProps {
  pages: Page[];
  categories: Category[];
  types: Type[];
  general: General;
}

const Container = styled.header`
`

const Header: FC<HeaderProps> = ({pages, categories, types, general}) => {
  return (
    <Container>
      <Banner banner={general.banner!} logoLg={general.logoLg!}/>
      <HeaderNav logo={general.logo!} pages={pages} categories={categories} types={types} general={general}/>
    </Container>
  )
}

export default Header;
