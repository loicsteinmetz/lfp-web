import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Colors} from '../theme/colors';
import {Spacings} from '../theme/spacings';
import Dropdown, {DROPDOWN_EVENT} from './Dropdown';
import {Devices} from '../theme/breakpoints';
import Networks from './Networks';
import MenuLink from './MenuLink';
import Icon from './Icon';

export interface MenuProps {
  pages: Page[];
  categories: Category[];
  types: Type[];
  general: General;
}

const MenuIconContainer = styled.div`
  &:hover {
    cursor: pointer;
  }

  @media (${Devices.TABLET}) {
    display: none;
  }
`

const QuitIconContainer = styled.div`
  display: inline-block;
  margin-bottom: ${Spacings.S2};

  &:hover {
    cursor: pointer;
  }

  @media (${Devices.TABLET}) {
    display: none;
  }
`

const MenuContainer = styled.div<{ isOpen: boolean, isVisible: boolean }>`
  position: fixed;
  background-color: ${Colors.GREY['0']};
  left: ${({isOpen}) => isOpen ? '0' : '100vw'};
  right: ${({isOpen}) => isOpen ? '0' : '-100vw'};
  top: 0;
  bottom: 0;
  transition: left 300ms, right 300ms;
  visibility: ${({isVisible}) => isVisible ? 'visible' : 'hidden'};
  padding: ${Spacings.S2};
  z-index: 11;

  @media (${Devices.TABLET}) {
    position: initial;
    visibility: visible;
    display: flex;
    width: 100%;
    align-items: center;
    padding: 0 ${Spacings.S2};
    z-index: 9;
  }
`

const NetworksContainer = styled.div`
  margin-top: ${Spacings.S3};

  @media (${Devices.TABLET}) {
    margin-top: 0;
    margin-left: auto;
  }
`

const Menu = ({pages, categories, types, general}: MenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      setTimeout(() => setIsVisible(false), 300);
      document.body.style.overflow = 'auto';
    }
  }, [isOpen])

  const onAction = () => {
    setIsOpen(false);
    window.dispatchEvent(new CustomEvent(DROPDOWN_EVENT, {detail: 'no-id'}));
  }

  return (
    <>
      <MenuIconContainer onClick={() => setIsOpen(true)}>
        <Icon icon={'menu'}/>
      </MenuIconContainer>
      <MenuContainer isOpen={isOpen} isVisible={isVisible}>
        <QuitIconContainer onClick={() => setIsOpen(false)}>
          <Icon icon={'quit'}/>
        </QuitIconContainer>
        <Dropdown onClick={onAction} title={'Th??matiques'} id={'categories'} links={categories.map(c => ({href: `/thematiques/${c.slug}`, label: c.name}))}/>
        <Dropdown onClick={onAction} title={'Formats'} id={'types'} links={types.map(t => ({href: `/formats/${t.slug}`, label: t.name}))}/>
        {pages.map((page) => (
          <MenuLink key={'page-' + page.id} label={page.title} href={`/pages/${page.slug}`} onClick={onAction}/>
        ))}
        <NetworksContainer>
          <Networks youtubeUrl={general.youtube} facebookUrl={general.facebook} instagramUrl={general.instagram} twitterUrl={general.twitter}
                    email={general.email}/>
        </NetworksContainer>
      </MenuContainer>
    </>
  )
}

export default Menu;
