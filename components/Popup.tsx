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
  pointer-events: ${({visible}) => visible ? 'all' : 'none'};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Background = styled.div<{visible: boolean}>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${({visible}) => visible ? 0 : '150vw'};
  right: 0;
  background-color: ${Colors.GREY['200']};
  opacity: 0.5;
  z-index: 999;
`

const Container = styled.div<{visible: boolean}>`
  width: ${({visible}) => visible ? '90%' : '0'};
  height:  ${({visible}) => visible ? '90%' : '0'};
  background-color: ${Colors.GREY['0']};
  border-radius: 5px;
  z-index: 999;
  display: flex;
  flex-direction: column;
  padding: ${Spacings.S2} ${Spacings.S1};
  overflow-y: scroll;
  align-items: center;

  @media (${Devices.TABLET}) {
    width: ${({visible}) => visible ? '80%' : '0'};
    height:  ${({visible}) => visible ? '80%' : '0'};
    padding: ${Spacings.S1} ${Spacings.S2};
  }

  @media (${Devices.TABLET}) {
    width: ${({visible}) => visible ? '70%' : '0'};
  }
`

const QuitContainer = styled.div`
  position: fixed;
  top: 5.5%;
  right: calc(${Spacings.S1} + 5%);
  border: 1px solid ${Colors.GREY['200']};
  border-radius: 5px;
  background-color: ${Colors.GREY['0']};
  
  &:hover {
    cursor: pointer;
    border: 1px solid ${Colors.PRIMARY['500']};
  }
  
  @media (${Devices.TABLET}) {
    top: 12%;
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
            <Icon icon={'quit'} scale={0.6}/>
          </QuitContainer>
          {children}
        </Content>
      </Container>
    </MainContainer>
  )
}

export default Popup;
