import styled from 'styled-components';
import Logo from '../atoms/media/Logo';
import Menu from './Menu';
import {Spacings} from '../theme/spacings';
import Link from 'next/link';

export interface HeaderNavProps {
  logo: LFPMedia;
  pages: Page[];
  categories: Category[];
  types: Type[];
}

const Container = styled.div`
  padding: ${Spacings.S2};
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const HeaderNav = ({logo, pages, categories, types}: HeaderNavProps) => {
  return (
    <Container>
      <Link href={'/'}>
        <a><Logo logo={logo}/></a>
      </Link>
      <Menu pages={pages} categories={categories} types={types}/>
    </Container>
  )
}

export default HeaderNav;
