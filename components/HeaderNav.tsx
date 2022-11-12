import styled from 'styled-components';
import Menu from './Menu';
import {Spacings} from '../theme/spacings';
import Link from 'next/link';
import Logo from './Logo';
import {Devices} from '../theme/breakpoints';

export interface HeaderNavProps {
  logo: LFPMedia;
  pages: Page[];
  categories: Category[];
  types: Type[];
  general: General;
}

const Flex = styled.div`
  @media (${Devices.DESKTOP}) {
    display: flex;
    justify-content: center;
  }
`

const Container = styled.div`
  padding: ${Spacings.S2};
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (${Devices.DESKTOP}) {
    width: 100%;
    max-width: 1200px;
  }
`

const HeaderNav = ({logo, pages, categories, types, general}: HeaderNavProps) => {
  return (
    <Flex>
      <Container>
        <Link href={'/'}>
          <a><Logo logo={logo}/></a>
        </Link>
        <Menu pages={pages} categories={categories} types={types} general={general}/>
      </Container>
    </Flex>
  )
}

export default HeaderNav;
