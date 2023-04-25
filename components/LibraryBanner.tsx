import React from 'react';
import styled from 'styled-components';
import {Spacings} from '../theme/spacings';
import {Colors} from '../theme/colors';
import typos from '../theme/typos';
import {Devices} from '../theme/breakpoints';
import ExpandedContainer from './ExpandedContainer';
import Divider from './Divider';
import Icon from './Icon';
import Link from 'next/link';
import {BOOKS_TITLE} from '../theme/constants';

export interface LibraryBannerProps {
}

const SubContainer = styled.div`
  margin-bottom: ${Spacings.S2};
  padding: ${Spacings.S2};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (${Devices.TABLET}) {
    padding: ${Spacings.S2} ${Spacings.S3} ${Spacings.S2} ${Spacings.S3};
  }

  @media (${Devices.DESKTOP}) {
    flex-direction: row;
    gap: ${Spacings.S3}
  }
`

const Heading = styled.div`
  display: flex;
  gap: ${Spacings.S1}
`

const HeadingText = styled.p`
  ${typos.OVERLINE1};
  color: ${Colors.GREY['0']};
  text-align: center;
  margin-top: 2px;
`

const Button = styled.button`
  ${typos.OVERLINE1};
  color: ${Colors.PRIMARY['700']};
  background-color: ${Colors.GREY['0']};
  padding: ${Spacings.S1} ${Spacings.S2};
  border: 1px solid ${Colors.GREY['0']};
  border-radius: 5px;
  transition: background-color 300ms;
  
  &:hover {
    background-color: ${Colors.GREY['25']};
  }
`

const LibraryBanner = ({}: LibraryBannerProps) => {
  return (
    <ExpandedContainer backgroundColor={Colors.PRIMARY['700']}>
      <SubContainer>
        <Heading>
          <Icon scale={0.4} icon={'book'} color={Colors.GREY['0']} hoverColor={Colors.GREY['0']}/>
          <HeadingText>{BOOKS_TITLE}</HeadingText>
        </Heading>
        <Divider marginY={Spacings.S2} displayHide={{desktop: true}}/>
        <Link href={'/livres'}>
          <Button>Consulter les livres disponibles</Button>
        </Link>
      </SubContainer>
    </ExpandedContainer>
  )
}

export default LibraryBanner;
