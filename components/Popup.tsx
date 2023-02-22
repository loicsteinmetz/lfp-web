import styled from 'styled-components';
import {Colors} from '../theme/colors';
import {Devices} from '../theme/breakpoints';
import React, {useEffect} from 'react';
import banner from './Banner';
import Icon from './Icon';
import {Spacings} from '../theme/spacings';

export interface PopupProps {
  visible: boolean;
  onQuit: () => void;
  children: React.ReactNode;
}

const MainContainer = styled.div<{visible: boolean}>`
  opacity: ${({visible}) => visible ? 1 : 0};
  transition: opacity 300ms;
  z-index: 999;
`

const Background = styled.div<{visible: boolean}>`
  position: fixed;
  top: 0;
  bottom: ${({visible}) => visible ? 0 : '100vh'};
  left: 0;
  right: 0;
  background-color: ${Colors.GREY['200']};
  opacity: 0.5;
  z-index: 999;
`

const Container = styled.div<{visible: boolean}>`
  position: fixed;
  top: ${({visible}) => visible ? '50px' : '-100vh'};
  bottom:  ${({visible}) => visible ? '50px' : 'inherit'};
  left: 5%;
  right: 5%;
  background-color: ${Colors.GREY['0']};
  border-radius: 5px;
  z-index: 999;
  display: flex;
  flex-direction: column;
  padding: ${Spacings.S2} ${Spacings.S1};
  overflow-y: scroll;

  @media (${Devices.TABLET}) {
    top: ${({visible}) => visible ? '120px' : '-100vh'};
    bottom:  ${({visible}) => visible ? '120px' : 'inherit'};
    left: 10%;
    right: 10%;
    padding: ${Spacings.S2};
  }

  @media (${Devices.DESKTOP}) {
    left: 15%;
    right: 15%;
  }
`

const QuitContainer = styled.div`
  position: fixed;
  right: calc(${Spacings.S1} + 5%);
  
  &:hover {
    cursor: pointer;
  }
  
  @media (${Devices.TABLET}) {
    right: calc(${Spacings.S2} + 10%);
  }

  @media (${Devices.DESKTOP}) {
    right: calc(${Spacings.S2} + 15%);
  }
`

const Content = styled.div`
  width: 100%;
  max-width: 900px;
`

const Popup = ({visible, onQuit, children}: PopupProps) => {
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [visible])

  return (
    <MainContainer visible={visible}>
      <Background onClick={onQuit} visible={visible}/>
      <Container visible={visible}>
        <Content>
          <QuitContainer onClick={onQuit}>
            <Icon icon={'quit'}/>
          </QuitContainer>
          {children}
        </Content>
      </Container>
    </MainContainer>
  )
}

export default Popup;
