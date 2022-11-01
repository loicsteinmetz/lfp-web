import React, {FC} from 'react';
import styled from 'styled-components';
import Banner from '../atoms/media/Banner';
import HeaderNav from '../molecules/HeaderNav';

export interface HeaderProps {
  logo: LFPMedia;
  pages: Page[];
  categories: Category[];
  types: Type[];
}

const Container = styled.header`
`

const Header: FC<HeaderProps> = ({logo, pages, categories, types}) => {
  return (
    <Container>
      <Banner/>
      <HeaderNav logo={logo} pages={pages} categories={categories} types={types}/>
    </Container>
  )
}

export default Header;
