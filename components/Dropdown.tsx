import styled from 'styled-components';
import {Spacings} from '../theme/spacings';
import {Colors} from '../theme/colors';
import typos from '../theme/typos';
import {useCallback, useEffect, useState} from 'react';
import Link from 'next/link';
import {Devices} from '../theme/breakpoints';

export const DROPDOWN_EVENT = 'dropdown-open';

export interface DropdownProps {
  title: string;
  links: {href: string, label: string}[];
  id: string;
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

const HeaderContainer = styled.div``

const ItemsContainer = styled.div<{isOpen: boolean, itemsNumber: number}>`
  max-height: ${({isOpen, itemsNumber}) => isOpen ? itemsNumber * 50 + 'px' : '0px'};
  overflow: hidden;
  transition: max-height 350ms;
  pointer-events: ${({isOpen}) => isOpen ? 'all' : 'none'};

  @media(${Devices.TABLET}) {
    position: absolute;
    margin-top: ${Spacings.S2};
    margin-left: -${Spacings.S2};
    background-color: ${Colors.GREY['0']};
    padding: 0 ${Spacings.S2} ${Spacings.S2} ${Spacings.S2};
    width: 150px;
  }
`

const Text = styled.p<{isOpen: boolean}>`
  ${typos.OVERLINE1};
  transition: color 300ms, margin-bottom 300ms;
  margin-bottom: ${({isOpen}) => isOpen ? Spacings.S2 : 0};
  user-select: none;
  
  &:hover {
    cursor: pointer;
    color: ${Colors.PRIMARY['500']};
  }
  
  &:after {
    content: '';
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid ${Colors.GREY['800']};
    position: absolute;
    margin-left: ${Spacings.S1};
    margin-top: 7px;
    transition: border-top 300ms, transform 300ms;
    transform: rotate(${({isOpen}) => isOpen ? '-180deg' : '0deg'});
  }
  
  &:hover:after {
    border-top: 5px solid ${Colors.PRIMARY['500']};
  }

  @media(${Devices.TABLET}) {
    margin-bottom: 0;
  }
`

const ItemText = styled.a`
  ${typos.BODY1};
  text-decoration: none;
  transition: color 300ms;
  display: block;
  padding: ${Spacings.S2} 0;
  
  &:hover {
    cursor: pointer;
    color: ${Colors.PRIMARY['500']};
  }
`

const Dropdown = ({title, links, id, onClick}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEvent = useCallback(() => {
    window.addEventListener(DROPDOWN_EVENT, (e) => {
      if ((e as CustomEvent).detail !== id && isOpen) {
        setIsOpen(false);
      }
    })
  }, [isOpen, id]);

  useEffect(() => {
    handleEvent();
  }, [handleEvent]);

  useEffect(() => {
    if (isOpen) {
      window.dispatchEvent(new CustomEvent(DROPDOWN_EVENT, {detail: id}))
    }
  }, [isOpen, id]);

  return (
    <Container>
      <HeaderContainer>
        <Text onClick={() => setIsOpen(!isOpen)} isOpen={isOpen}>{title}</Text>
      </HeaderContainer>
      <ItemsContainer isOpen={isOpen} itemsNumber={links.length}>
        {links.map((link, index) => (
          <Link key={title + '-' + index} href={link.href}><ItemText onClick={onClick}>{link.label}</ItemText></Link>
        ))}
      </ItemsContainer>
    </Container>
  )
}

export default Dropdown;
