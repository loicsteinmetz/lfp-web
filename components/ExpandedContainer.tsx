import Article from './Article';
import React from 'react';
import styled, {StyledComponentProps} from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import {Spacings} from '../theme/spacings';
import {Colors} from '../theme/colors';
import typos from '../theme/typos';
import Divider from './Divider';
import Label from './Label';
import {Devices} from '../theme/breakpoints';
import {formatDate} from '../utils/date';
import ReactMarkdown from 'react-markdown';
import children = ReactMarkdown.propTypes.children;

export interface ExpandedContainerProps {
  children: React.ReactNode;
  backgroundColor?: string;
  radius?: boolean;
}

const Container = styled.div<{backgroundColor?: string, radius?: boolean}>`
  margin-bottom: ${Spacings.S2};
  background-color: ${({backgroundColor}) => backgroundColor ?? Colors.GREY['0']};
  border-radius: ${({radius}) => radius ? '5px' : '0'};
  width: calc(100% + ${Spacings.S2} * 2);
  margin-left: -${Spacings.S2};

  @media (${Devices.TABLET}) {
    width: calc(100% + ${Spacings.S4} * 2);
    margin-left: -${Spacings.S4};
    margin-bottom: ${Spacings.S3};
  }
`
const ExpandedContainer = ({children, backgroundColor, radius}: ExpandedContainerProps) => {
  return (
      <Container backgroundColor={backgroundColor} radius={radius}>
        {children}
      </Container>
  )
}

export default ExpandedContainer;
