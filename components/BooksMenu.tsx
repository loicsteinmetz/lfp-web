import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Colors} from '../theme/colors';
import {Spacings} from '../theme/spacings';
import {Devices} from '../theme/breakpoints';
import Networks from './Networks';
import Icon from './Icon';

export interface BooksMenuProps {
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

const BooksMenu = ({general}: BooksMenuProps) => {
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

  return (
    <>
      <MenuIconContainer onClick={() => setIsOpen(true)}>
        <Icon icon={'menu'}/>
      </MenuIconContainer>
      <MenuContainer isOpen={isOpen} isVisible={isVisible}>
        <QuitIconContainer onClick={() => setIsOpen(false)}>
          <Icon icon={'quit'}/>
        </QuitIconContainer>
        <NetworksContainer>
          <Networks youtubeUrl={general.youtube} facebookUrl={general.facebook} instagramUrl={general.instagram} twitterUrl={general.twitter}
                    email={general.email}/>
        </NetworksContainer>
      </MenuContainer>
    </>
  )
}

export default BooksMenu;
