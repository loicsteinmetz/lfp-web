import styled from 'styled-components';
import {Spacings} from '../theme/spacings';
import Link from 'next/link';
import Logo from './Logo';
import {Devices} from '../theme/breakpoints';
import {Colors} from '../theme/colors';
import BooksMenu from './BooksMenu';

export interface BooksHeaderNavProps {
  logo: LFPMedia;
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

const BooksHeaderNav = ({logo, general}: BooksHeaderNavProps) => {
  return (
    <Flex>
      <Container>
        <LogoContainer>
        <Link href={'/'}><a><Logo logo={logo}/></a></Link>
        </LogoContainer>
        <BooksMenu general={general}/>
      </Container>
    </Flex>
  )
}

export default BooksHeaderNav;
