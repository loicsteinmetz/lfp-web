import {useEffect, useState} from 'react';
import MenuIcon from '../atoms/icons/MenuIcon';
import styled from 'styled-components';
import {Colors} from '../theme/colors';
import {Spacings} from '../theme/spacings';
import QuitIcon from '../atoms/icons/QuitIcon';
import MenuLink from '../atoms/actions/MenuLink';
import Dropdown from './Dropdown';
import {Devices} from '../theme/breakpoints';

export interface MenuProps {
  pages: Page[];
  categories: Category[];
  types: Type[];
}

const MenuIconContainer = styled.div`
  &:hover {
    cursor: pointer;
  }

  @media(${Devices.TABLET}) {
    display: none;
  }
`

const QuitIconContainer = styled.div`
  display: inline-block;
  margin-bottom: ${Spacings.S2};
  
  &:hover {
    cursor: pointer;
  }

  @media(${Devices.TABLET}) {
    display: none;
  }
`

const MenuContainer = styled.div<{ isOpen: boolean, isVisible: boolean }>`
  position: absolute;
  background-color: ${Colors.GREY['0']};
  left: ${({isOpen}) => isOpen ? '0' : '100vw'};
  right: 0;
  top: 0;
  bottom: 0;
  transition: left 300ms;
  visibility: ${({isVisible}) => isVisible ? 'visible' : 'hidden'};
  padding: ${Spacings.S2};

  @media(${Devices.TABLET}) {
    position: initial;
    visibility: visible;
    display: flex;
    width: 100%;
  }
`

const Menu = ({pages, categories, types}: MenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 300)
    }
  }, [isOpen])

  return (
    <>
      <MenuIconContainer onClick={() => setIsOpen(true)}>
        <MenuIcon alt='menu' size='40px'/>
      </MenuIconContainer>
      <MenuContainer isOpen={isOpen} isVisible={isVisible}>
        <QuitIconContainer onClick={() => setIsOpen(false)}>
          <QuitIcon alt='fermer menu' size='40px'/>
        </QuitIconContainer>
        <Dropdown title={'Thématiques'} id={'categories'} links={categories.map(c => ({href: `/categories/${c.id}`, label: c.name}))}/>
        <Dropdown title={'Formats'} id={'types'} links={types.map(t => ({href: `/types/${t.id}`, label: t.name}))}/>
        {pages.map((page) => (
          <MenuLink key={'page-' + page.id} label={page.title} href={`/pages/${page.slug}`} />
        ))}
      </MenuContainer>
    </>
  )
}

export default Menu;
