import styled from 'styled-components';
import typos from '../theme/typos';
import {Spacings} from '../theme/spacings';
import Image from 'next/image';
import {Colors} from '../theme/colors';
import {Devices} from '../theme/breakpoints';
import React, {useCallback, useState} from 'react';
import Label from './Label';
import Icon from './Icon';
import Divider from './Divider';
import Popup from './Popup';
import BookDetails from './BookDetails';
import BookDemandForm from './BookDemandForm';
import {getBook} from '../data/books.data';

export interface BookCardProps {
  book: Book;
  onDemandResult: (success: boolean) => void;
}

type BookStatus = 'rent' | 'claimed' | 'available';

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

// const NewLabel = styled.p`
//   ${typos.OVERLINE1};
//   font-size: 13px;
//   line-height: 13px;
//   background-color: ${Colors.GREEN['500']};
//   color: ${Colors.GREY['0']};
//   display: inline-block;
//   width: fit-content;
//   padding: 2px 6px 4px 6px;
//   border-radius: 5px;
// `

const FlexContainer = styled.div`
  display: flex;
  gap: ${Spacings.S2};
  justify-content: center;
  align-items: center;

  @media (${Devices.TABLET}) {
    gap: ${Spacings.S3};
    flex-direction: row-reverse;
  }
`

const CoverContainer = styled.div<{height: number, width: number}>`
  width: 25%;
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
  margin-top: ${Spacings.S1};
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

  @media (${Devices.DESKTOP}) {
    margin-top: 0;
  }
`

const StatusIcon = styled.div<{status: BookStatus}>`
  height: 10px;
  aspect-ratio: 1;
  border-radius: 100%;
  margin-top: 2px;
  background-color: ${({status}) => status === 'available' ? 'green' : (status === 'claimed' ? 'orange' : 'red')};
`

const StatusLabel = styled.p`
  ${typos.OVERLINE1};
  font-size: 15px;
`

const BookCard = ({book, onDemandResult}: BookCardProps) => {
  const [displayedBook, setDisplayedBook] = useState<Book & {status: BookStatus, claims: number}>({
    ...book,
    status: book.loans?.some(b => b.status === 'ongoing') ? 'rent' : ((book.loans?.some(b => b.status === 'demand')) ? 'claimed' : 'available'),
    claims: book.loans ? book.loans.filter(b => b.status === 'demand')?.length : 0,
  });

  const [popup, setPopup] = useState<'details' | 'rentForm'>('details');

  const [isPopupVisible, setPopupVisible] = useState(false);

  const onQuitPopup = useCallback(() => {
    setPopupVisible(false);
    setPopup('details');
  }, [setPopup]);

  const onDemand = useCallback(() => {
    setPopup('rentForm');
    setPopupVisible(true);
  }, [setPopup, setPopupVisible]);

  const onDemandConfirmed = useCallback((success: boolean) => {
    setPopupVisible(false);
    onDemandResult(success);
    setPopup('details');
    getBook(displayedBook.id, '*')
      .then((book) => {
        setDisplayedBook({
          ...book,
          status: book.loans?.some(b => b.status === 'ongoing') ? 'rent' : ((book.loans?.some(b => b.status === 'demand')) ? 'claimed' : 'available'),
          claims: book.loans ? book.loans.filter(b => b.status === 'demand')?.length : 0,
        });
      })
  }, [displayedBook, onDemandResult]);

  return (
    <Container>
      <FlexContainer>
        <InfoContainer>
          {/*{new Date(displayedBook.publishedAt).getTime() > new Date().getTime() - 15 * 24 * 60 * 60 * 1000 && <NewLabel>NOUVEAU</NewLabel>}*/}
          <Title onClick={() => setPopupVisible(true)}>
            {displayedBook.name}
          </Title>
          <Authors>
            {displayedBook.authors!.map(author => (
              <Author key={`book-${displayedBook.id}-author-${author.id}`}>{author.name}</Author>
            ))}
          </Authors>
          {(displayedBook.year || displayedBook.editor) && (
            <Infos>
              {[displayedBook.year, displayedBook.editor].filter(i => !!i).join(' - ')}
            </Infos>
          )}
          <Labels>
            {displayedBook.themes && displayedBook.themes.map(theme => (
              <Label key={`book-${displayedBook.id}-cat-${theme.id}`} label={theme.name}/>
            ))}
          </Labels>
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
        <CoverContainer onClick={() => setPopupVisible(true)} height={displayedBook.cover!.height} width={displayedBook.cover!.width}>
          <Image src={displayedBook.cover!.url} height={displayedBook.cover!.height} width={displayedBook.cover!.width} alt={displayedBook.cover!.alternativeText}/>
        </CoverContainer>
      </FlexContainer>
      <Popup visible={isPopupVisible} onQuit={onQuitPopup}>
        {popup === 'details'
          ? <BookDetails book={book} onDemand={onDemand}/>
          : <BookDemandForm book={book} onBack={() => setPopup('details')} onDemandResult={onDemandConfirmed}/>}
      </Popup>
    </Container>
  )
}

export default BookCard;
