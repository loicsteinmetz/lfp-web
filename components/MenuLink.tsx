import styled from 'styled-components';
import Link from 'next/link';
import typos from '../theme/typos';
import {Colors} from '../theme/colors';
import {Spacings} from '../theme/spacings';
import {Devices} from '../theme/breakpoints';

export interface MenuLinkProps {
  href: string;
  label: string;
  onClick?: () => void;
}

const Container = styled.div`
  padding: ${Spacings.S2} 0;
  border-bottom: 1px solid ${Colors.GREY['200']};

  @media(${Devices.TABLET}) {
    padding: 0;
    border-bottom: 0;
    margin-left: ${Spacings.S4};
  }
`

const Text = styled.a`
  ${typos.OVERLINE1};
  text-decoration: none;
  transition: color 300ms;
  display: block;
  user-select: none;
  
  &:hover {
    cursor: pointer;
    color: ${Colors.PRIMARY['500']};
  }
`

const MenuLink = ({href, label, onClick}: MenuLinkProps) => {
  return (
    <Container onClick={onClick}>
      <Link href={href}><Text>{label}</Text></Link>
    </Container>
  )
}

export default MenuLink;
