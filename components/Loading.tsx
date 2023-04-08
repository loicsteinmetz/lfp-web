import styled from 'styled-components';
import {FC} from 'react';
import {Spacings} from '../theme/spacings';
import {Colors} from '../theme/colors';
import {Devices} from '../theme/breakpoints';

const Container = styled.div`
  position: fixed;
  bottom: ${Spacings.S1};
  left: ${Spacings.S1};
  transform: scale(0.5);
  z-index: 999999999;

  @media (${Devices.TABLET}) {
    bottom: ${Spacings.S2};
    left: ${Spacings.S2};
  }
`

const Anim = styled.div`
  @keyframes anim {
    0 % {transform: rotate(0deg);}
    100% {transform: rotate(360deg);}
  }
  width: 60px;
  height: 60px;
  border: 10px solid ${Colors.PRIMARY['500']};
  border-top-color: transparent;
  border-radius: 50%;
  animation: anim 1s linear infinite;
`

const Loading: FC = ({}) => {
  return (
    <Container>
        <Anim></Anim>
    </Container>
  )
};

export default Loading;
