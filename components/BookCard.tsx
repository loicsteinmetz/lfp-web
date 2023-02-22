import styled from 'styled-components';
import typos from '../theme/typos';
import {Spacings} from '../theme/spacings';
import Image from 'next/image';
import {Colors} from '../theme/colors';
import {Devices} from '../theme/breakpoints';
import React from 'react';
import Label from './Label';
import Icon from './Icon';
import Divider from './Divider';

export interface BookCardProps {
  book: Book;
}

const Container = styled.div`
  margin-bottom: ${Spacings.S2};
  background-color: ${Colors.GREY['0']};
  padding: ${Spacings.S2};
  border-radius: 5px;

  @media (${Devices.TABLET}) {
    padding: ${Spacings.S3};
  }
`
const Labels = styled.div`
  display: flex;
  gap: ${Spacings.S1};
  flex-wrap: wrap;
`
const Title = styled.h2`
  ${typos.OVERLINE1};
  font-size: 20px;

  &:hover {
    color: ${Colors.PRIMARY['500']};
    cursor: pointer;
    transition: color 300ms;
  }

  @media (${Devices.TABLET}) {
    font-size: 25px;
  }
`

const FlexContainer = styled.div`
  display: flex;
  gap: ${Spacings.S2};

  @media (${Devices.TABLET}) {
    gap: ${Spacings.S3};
  }
`

const CoverContainer = styled.div`
  width: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

  &:hover {
    cursor: pointer;
  }

  @media (${Devices.TABLET}) {
    width: 20%;
  }
`

const InfoContainer = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  gap: ${Spacings.S1};

  @media (${Devices.TABLET}) {
    gap: ${Spacings.S1};
    width: 80%;
  }
`

const Infos = styled.p`
  ${typos.BODY1};
  font-size: 12px;
  overflow: hidden;

  @media (${Devices.TABLET}) {
    font-size: 15px;
  }
`

const Authors = styled.div`
  ${typos.OVERLINE1};

  @media (${Devices.TABLET}) {
    font-size: 19px;
  }
`

const Author = styled.p`
  // &:hover {
  //   color: ${Colors.PRIMARY['500']};
  //   cursor: pointer;
  //   transition: color 300ms;
  // }
`

const ActionsContainer = styled.div`
  display: flex;
  gap: ${Spacings.S2};
`

const LoanButton = styled.div`
  display: flex;
  align-items: center;
  gap: ${Spacings.S1};
  padding: 5px 11px;
  border-radius: 5px;
  background-color: transparent;
  border: 1px solid ${Colors.GREY['500']};
  font-weight: bold;
  ${typos.BODY1};
  font-size: 14px;
  
  &:hover {
    border: 1px solid ${Colors.PRIMARY['500']};
    color:  ${Colors.PRIMARY['500']};
    cursor: pointer;
  }
  
  &:hover svg *:nth-child(2) {
    fill: ${Colors.PRIMARY['500']};
  }
`

const ButtonLabel = styled.p`
  margin-top: -1px;
`

const BookCard = ({book}: BookCardProps) => {

  return (
    <Container>
      <FlexContainer>
        <CoverContainer>
          <Image src={book.cover!.url} height={book.cover!.height} width={book.cover!.width} alt={book.cover!.alternativeText}/>
        </CoverContainer>
        <InfoContainer>
          <Title>{book.name}</Title>
          <Authors>
            {book.authors!.map(author => (
              <Author key={`book-${book.id}-author-${author.id}`}>{author.name}</Author>
            ))}
          </Authors>
          {(book.year || book.editor) && <Infos>{[book.year, book.editor].join(' - ')}</Infos>}
          <Labels>
            {book.themes && book.themes.map(theme => (
              <Label key={`book-${book.id}-cat-${theme.id}`} label={theme.name}/>
            ))}
          </Labels>
          <Divider marginY={Spacings.S2}/>
          <ActionsContainer>
            <LoanButton>
              <Icon icon={'book'} scale={0.3}/>
              <ButtonLabel>Demander le livre</ButtonLabel>
            </LoanButton>
          </ActionsContainer>
        </InfoContainer>
      </FlexContainer>
    </Container>
  )
}

export default BookCard;
