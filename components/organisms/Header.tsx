import React, {FC} from 'react';
import styled from 'styled-components';
import {Devices} from '../theme/breakpoints';

export interface HeaderProps {
}

const Container = styled.div`
  @media(${Devices.MOBILE}) {
    height: 200px;
    width: 100%;
    background-color: red;
  }
`

const Header: FC<HeaderProps> = ({}) => {
  return (
    <Container/>
  )
}

export default Header;
