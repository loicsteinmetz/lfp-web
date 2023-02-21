import styled from 'styled-components';
import {Colors} from '../theme/colors';
import {Spacings} from '../theme/spacings';
import {Breakpoints, Devices} from '../theme/breakpoints';

export interface DividerProps {
  marginY?: string;
  displayHide?: {mobile?: boolean, tablet?: boolean, desktop?: boolean}
}

const Line = styled.div<{marginY?: string, mobile?: boolean, tablet?: boolean, desktop?: boolean}>`
  width: 100%;
  height: 1px;
  background-color: ${Colors.GREY['200']};
  margin: ${({marginY}) => marginY ?? Spacings.S3} 0;

  @media (${Devices.MOBILE}) and (max-width: ${Breakpoints.MEDIUM}px) {
    display: ${({mobile}) => !mobile ? 'auto' : 'none'};
  }
  
  @media (${Devices.TABLET}) and (max-width: ${Breakpoints.LARGE}px) {
    display: ${({tablet}) => !tablet ? 'auto' : 'none'};
  }

  @media (${Devices.DESKTOP}) {
    display: ${({desktop}) => !desktop ? 'auto' : 'none'};
  }
`

const Divider = ({marginY, displayHide}: DividerProps) => {
  return (
    <Line marginY={marginY} tablet={displayHide?.tablet} desktop={displayHide?.desktop} mobile={displayHide?.mobile}/>
  )
}

export default Divider;
