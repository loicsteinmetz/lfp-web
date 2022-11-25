import styled from 'styled-components';
import Menu from './Menu';
import {Spacings} from '../theme/spacings';
import Link from 'next/link';
import Logo from './Logo';
import {Devices} from '../theme/breakpoints';
import {Colors} from '../theme/colors';

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

  @media (${Devices.TABLET}) {
    border-bottom: 3px solid ${Colors.PRIMARY['500']};
  }

  @media (${Devices.DESKTOP}) {
    width: 100%;
    max-width: 1200px;
  }
`

const LogoContainer = styled.div`
  margin-right: -30px;
  z-index: 10;
`

const HeaderNav = ({logo, pages, categories, types, general}: HeaderNavProps) => {
  return (
    <Flex>
      <Container>
        <LogoContainer>
        <Link href={'/'}><a><Logo logo={logo}/></a></Link>
        </LogoContainer>
        <Menu pages={pages} categories={categories} types={types} general={general}/>
      </Container>
    </Flex>
  )
}

export default HeaderNav;
