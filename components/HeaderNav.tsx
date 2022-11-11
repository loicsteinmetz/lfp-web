import styled from 'styled-components';
import Menu from './Menu';
import {Spacings} from '../theme/spacings';
import Link from 'next/link';
import Logo from './Logo';

export interface HeaderNavProps {
  logo: LFPMedia;
  pages: Page[];
  categories: Category[];
  types: Type[];
  general: General;
}

const Container = styled.div`
  padding: ${Spacings.S2};
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const HeaderNav = ({logo, pages, categories, types, general}: HeaderNavProps) => {
  return (
    <Container>
      <Link href={'/'}>
        <a><Logo logo={logo}/></a>
      </Link>
      <Menu pages={pages} categories={categories} types={types} general={general}/>
    </Container>
  )
}

export default HeaderNav;
