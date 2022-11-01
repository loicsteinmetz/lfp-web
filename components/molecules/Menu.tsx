import {useEffect, useState} from 'react';
import MenuIcon from '../atoms/icons/MenuIcon';
import styled from 'styled-components';
import {Colors} from '../theme/colors';
import {Spacings} from '../theme/spacings';
import QuitIcon from '../atoms/icons/QuitIcon';

export interface MenuProps {
  pages: Page[];
  categories: Category[];
  types: Type[];
}

const IconContainer = styled.div`
  &:hover {
    cursor: pointer;
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
      <IconContainer onClick={() => setIsOpen(true)}>
        <MenuIcon alt='menu' size='40px'/>
      </IconContainer>
      <MenuContainer isOpen={isOpen} isVisible={isVisible}>
        <IconContainer onClick={() => setIsOpen(false)}>
          <QuitIcon alt='fermer menu' size='40px'/>
        </IconContainer>
        {categories.map((category) => (
          <p key={'cat-' + category.id}>{category.name}</p>
        ))}
        {types.map((type) => (
          <p key={'type-' + type.id}>{type.name}</p>
        ))}
        {pages.map((page) => (
          <p key={'page-' + page.id}>{page.title}</p>
        ))}
      </MenuContainer>
    </>
  )
}

export default Menu;
