import React, {FC} from 'react';
import styled from 'styled-components';
import {Devices} from '../theme/breakpoints';

export interface FooterProps {
}

const Container = styled.div`
  @media(${Devices.MOBILE}) {
    height: 200px;
    width: 100%;
    background-color: blue;
  }
`

const Footer: FC<FooterProps> = ({}) => {
  return (
    <Container/>
  )
}

export default Footer;
