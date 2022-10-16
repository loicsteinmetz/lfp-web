import React, {FC} from 'react';
import styled from 'styled-components';
import {Devices} from '../theme/breakpoints';
import {Colors} from '../theme/colors';

export interface FooterProps {
}

const Container = styled.div`
  @media(${Devices.MOBILE}) {
    height: 100px;
    width: 100%;
    background-color: ${Colors.GREY['300']};
    flex-grow: 0;
    flex-shrink: 0;
  }
`

const Footer: FC<FooterProps> = ({}) => {
  return (
    <Container/>
  )
}

export default Footer;
