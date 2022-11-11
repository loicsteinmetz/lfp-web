import React, {FC} from 'react';
import styled from 'styled-components';
import Banner from '../atoms/media/Banner';
import HeaderNav from '../molecules/HeaderNav';

export interface HeaderProps {
  logo: LFPMedia;
  pages: Page[];
  categories: Category[];
  types: Type[];
  general: General;
}

const Container = styled.header`
`

const Header: FC<HeaderProps> = ({logo, pages, categories, types, general}) => {
  return (
    <Container>
      <Banner/>
      <HeaderNav logo={logo} pages={pages} categories={categories} types={types} general={general}/>
    </Container>
  )
}

export default Header;
