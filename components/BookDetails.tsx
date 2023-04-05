import styled from 'styled-components';
import typos from '../theme/typos';
import {Spacings} from '../theme/spacings';
import Image from 'next/image';
import {Colors} from '../theme/colors';
import {Devices} from '../theme/breakpoints';
import React, {useEffect, useState} from 'react';
import Label from './Label';
import Icon from './Icon';
import Divider from './Divider';

export interface BookDetailsProps {
  book: Book;
  onDemand: () => void;
}

type BookStatus = 'rent' | 'claimed' | 'available';

const Container = styled.div`
  margin-bottom: ${Spacings.S2};
  background-color: ${Colors.GREY['0']};
  padding: ${Spacings.S1};
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
  width: 80%;

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
  flex-direction: column;
  gap: ${Spacings.S2};
`

const CoverContainer = styled.div<{height: number, width: number}>`
  width: 50%;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px;
  aspect-ratio: ${({height, width}) => width / height} !important;

  &:hover {
    cursor: pointer;
  }

  @media (${Devices.TABLET}) {
    width: 20%;
  }
`

const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${Spacings.S1};

  @media (${Devices.TABLET}) {
    gap: ${Spacings.S1};
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
  margin: ${Spacings.S1} 0;
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

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${Spacings.S1};
  margin-top: ${Spacings.S1};
`

const StatusIcon = styled.div<{status: BookStatus}>`
  height: 10px;
  aspect-ratio: 1;
  border-radius: 100%;
  margin-top: 3px;
  background-color: ${({status}) => status === 'available' ? 'green' : (status === 'claimed' ? 'orange' : 'red')};
`

const StatusLabel = styled.p`
  ${typos.OVERLINE1};
  font-size: 15px;
`

const Abstract = styled.p`
  ${typos.BODY1};
`

const BookDetails = ({book, onDemand}: BookDetailsProps) => {
  const [displayedBook, setDisplayedBook] = useState<Book & {status: BookStatus, claims: number}>({
    ...book,
    status: book.loans?.some(b => b.status === 'ongoing') ? 'rent' : ((book.loans?.some(b => b.status === 'demand')) ? 'claimed' : 'available'),
    claims: book.loans ? book.loans.filter(b => b.status === 'demand')?.length : 0,
  });

  useEffect(() => {
    setDisplayedBook({
      ...book,
      status: book.loans?.some(b => b.status === 'ongoing') ? 'rent' : ((book.loans?.some(b => b.status === 'demand')) ? 'claimed' : 'available'),
      claims: book.loans ? book.loans.filter(b => b.status === 'demand')?.length : 0,
    });
  }, [book]);

  return (
    <Container>
      <FlexContainer>
        <InfoContainer>
          <Title>{displayedBook.name}</Title>
          <Authors>
            {displayedBook.authors!.map(author => (
              <Author key={`book-${displayedBook.id}-author-${author.id}`}>{author.name}</Author>
            ))}
          </Authors>
          {(displayedBook.year || displayedBook.editor) && <Infos>{[displayedBook.year, displayedBook.editor].join(' - ')}</Infos>}
          {(displayedBook.themes && displayedBook.themes.length > 0) && (
              <Labels>
              {displayedBook.themes && displayedBook.themes.map(theme => (
                <Label key={`book-${displayedBook.id}-cat-${theme.id}`} label={theme.name}/>
              ))}
            </Labels>
          )}
          <Divider marginY={Spacings.S2} displayHide={{mobile: true, tablet: true}}/>
          <StatusContainer>
            <StatusIcon status={displayedBook.status}/>
            <StatusLabel>
              {displayedBook.status === 'rent' && 'Prêté'}
              {(displayedBook.status === 'rent' && displayedBook.claims > 0) && ' - '}
              {displayedBook.claims > 0 && `Déjà ${displayedBook.claims} demande(s)`}
              {displayedBook.status === 'available' && 'Disponible'}
            </StatusLabel>
          </StatusContainer>
          <ActionsContainer>
            <LoanButton onClick={onDemand}>
              <Icon icon={'book'} scale={0.3}/>
              <ButtonLabel>Demander le livre</ButtonLabel>
            </LoanButton>
          </ActionsContainer>
        </InfoContainer>
        <Divider marginY={Spacings.S1}/>
        <Abstract>
          {book.abstract?.replaceJSX('\n', <br/>)}
        </Abstract>
        <Divider marginY={Spacings.S1}/>
        <CoverContainer height={displayedBook.cover!.height} width={displayedBook.cover!.width}>
          <Image src={displayedBook.cover!.url} height={displayedBook.cover!.height} width={displayedBook.cover!.width} alt={displayedBook.cover!.alternativeText}/>
        </CoverContainer>
      </FlexContainer>
    </Container>
  )
}

export default BookDetails;
