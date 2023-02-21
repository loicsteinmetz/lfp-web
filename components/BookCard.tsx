import styled from 'styled-components';
import typos from '../theme/typos';
import {Spacings} from '../theme/spacings';
import Image from 'next/image';
import {Colors} from '../theme/colors';
import {Devices} from '../theme/breakpoints';
import React from 'react';
import Label from './Label';

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
  &:hover {
    color: ${Colors.PRIMARY['500']};
    cursor: pointer;
    transition: color 300ms;
  }
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
        </InfoContainer>
      </FlexContainer>
    </Container>
  )
}

export default BookCard;
