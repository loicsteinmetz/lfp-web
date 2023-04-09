import styled from 'styled-components';
import typos from '../theme/typos';
import {Spacings} from '../theme/spacings';
import {Colors} from '../theme/colors';
import {Devices} from '../theme/breakpoints';
import React, {useCallback, useState} from 'react';
import Label from './Label';
import Divider from './Divider';
import Icon from './Icon';
import {createLoanDemand} from '../data/loans.data';
import {useReCaptcha} from 'next-recaptcha-v3';
import Loading from './Loading';

export interface BookDemandFormProps {
  book: Book;
  onBack?: () => void;
  onDemandResult: (success: boolean) => void;
}

export type BookStatus = 'rent' | 'claimed' | 'available';

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
  gap: ${Spacings.S1};
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

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${Spacings.S1};
  margin: ${Spacings.S1} 0;
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

const DemandTitleContainer = styled.div`
  display: flex;
  gap: ${Spacings.S2};
  align-items: center;
`

const DemandTitle = styled.h3`
  ${typos.H2};
  font-size: 20px;
  margin-top: -2px;
`

const BackIconContainer = styled.div`
  border: 1px solid ${Colors.GREY['200']};
  border-radius: 5px;

  &:hover {
    cursor: pointer;
    border: 1px solid ${Colors.PRIMARY['500']};
  }
`

const DemandForm = styled.div`
  max-width: 350px;
  display: flex;
  flex-direction: column;
  gap: ${Spacings.S1};
  margin-top: ${Spacings.S2};
`

const FormInput = styled.input<{error: boolean}>`
  margin-bottom: ${Spacings.S1};
  border-radius: 5px;
  border: 1px solid ${({error}) => error ? Colors.PRIMARY['500'] : Colors.GREY['300']};
  padding: 5px 8px;
  letter-spacing: 1px;
  transition: border 300ms;
  
  &:first-of-type {
    letter-spacing: initial;
  }
`

const DemandLabel = styled.label<{error: boolean}>`
  ${typos.BODY1};
  font-size: 14px;
  line-height: 10px;
  color: ${({error}) => error ? Colors.PRIMARY['500'] : Colors.GREY['600']};
  transition: color 300ms;
`

const ContactConfirmationContainer = styled.div`
  margin-top: ${Spacings.S1};
  display: flex;
  gap: ${Spacings.S2};
`

const ContactConfirmationSelect = styled.div<{selected: boolean, error: boolean}>`
  height: 15px;
  min-width: 15px;
  border: 1px solid ${({error}) => error ? Colors.PRIMARY['500'] : Colors.GREY['300']};
  border-radius: 3px;
  transition: border 300ms;
  position: relative;
  
  &:hover {
    cursor: pointer;
  }

  &:after {
    content: '';
    display: block;
    position: absolute;
    height: 13px;
    width: 13px;
    border-radius: 3px;
    margin-top: 1px;
    margin-left: 1px;
    background-color: ${({selected}) => selected ? Colors.PRIMARY['500'] : 'inital'};
  }
`

const ContactConfirmationLabel = styled.label<{error: boolean}>`
  ${typos.BODY1};
  font-size: 14px;
  line-height: 14px;
  color: ${({error}) => error ? Colors.PRIMARY['500'] : Colors.GREY['600']};
  user-select: none;
  transition: color 300ms;
`
const LoanButton = styled.button<{loading: boolean}>`
  ${typos.OVERLINE1}
  display: inline;
  padding: 7px 5px;
  font-size: 16px;
  line-height: 20px;
  margin-top: ${Spacings.S2};
  border: 1px solid ${({loading}) => loading ? Colors.GREY['400'] : Colors.GREY['700']};
  border-radius: 5px;
  color: ${({loading}) => loading ? Colors.GREY['400'] : Colors.GREY['700']};
  background-color: ${({loading}) => loading ? Colors.GREY['50'] : Colors.GREY['0']};
  transition: color 300ms, background-color 300ms, border 300ms;
  
  &:hover {
    color: ${({loading}) => loading ? Colors.GREY['400'] : Colors.GREY['0']};
    background-color: ${({loading}) => loading ? Colors.GREY['50'] : Colors.PRIMARY['500']};
    border: 1px solid ${({loading}) => loading ? Colors.GREY['400'] : Colors.PRIMARY['500']};
    cursor: ${({loading}) => loading ? 'initial' : 'pointer'};
  }
  
  &:hover svg *:nth-child(2) {
    fill: ${Colors.PRIMARY['500']};
  }
`


const BookDemandForm = ({book, onBack, onDemandResult}: BookDemandFormProps) => {
  const [displayedBook] = useState<Book & {status: BookStatus, claims: number}>({
    ...book,
    status: book.loans?.some(b => b.status === 'ongoing') ? 'rent' : ((book.loans?.some(b => b.status === 'demand')) ? 'claimed' : 'available'),
    claims: book.loans ? book.loans.filter(b => b.status === 'demand')?.length : 0,
  });

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState<string>();
  const [tel, setTel] = useState<string>();
  const [isContactConfirmationSelected, setContactConfirmationSelected] = useState(false);

  const [nameError, setNameError] = useState(false);
  const [telError, setTelError] = useState(false);
  const [confirmationError, setConfirmationError] = useState(false);
  const recaptcha = useReCaptcha();

  const onDemand = useCallback(() => {
    setNameError(false);
    setTelError(false);
    setConfirmationError(false);
    if (!name) setNameError(true);
    if (!tel) setTelError(true);
    if (!isContactConfirmationSelected) setConfirmationError(true);
    if (name && tel && isContactConfirmationSelected) {
      setLoading(true);
      recaptcha.executeRecaptcha('page_view').then(token => {
        createLoanDemand({
          recaptcha: token,
          name,
          contact: tel,
          bookId: displayedBook.id,
        }).then(() => {
          setLoading(false);
          setName('');
          setTel('');
          setContactConfirmationSelected(false);
          onDemandResult(true);
        }).catch((e) => {
          console.log(e);
          onDemandResult(false);
        });
      });
    }
  }, [displayedBook.id, isContactConfirmationSelected, name, onDemandResult, recaptcha, tel]);

  return (
    <>
      {loading && <Loading/>}
      <Container>
        <FlexContainer>
            <Title>{displayedBook.name}</Title>
            <Authors>
              {displayedBook.authors!.map(author => (
                <Author key={`book-${displayedBook.id}-author-${author.id}`}>{author.name}</Author>
              ))}
            </Authors>
            {(displayedBook.year || displayedBook.editor) && <Infos>{[displayedBook.year, displayedBook.editor].join(' - ')}</Infos>}
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
          <Divider marginY={Spacings.S2} />
          <DemandTitleContainer>
            {onBack && (
              <BackIconContainer onClick={onBack}>
                <Icon icon={'back'} scale={0.5}/>
              </BackIconContainer>
            )}
            <DemandTitle>Demander le livre</DemandTitle>
          </DemandTitleContainer>
          <DemandForm>
            <DemandLabel error={nameError}>Nom *</DemandLabel>
            <FormInput
              type='text'
              value={name}
              onChange={(v) => {
                setName(v.target.value);
                setNameError(false);
              }}
              error={nameError}
            />
            <DemandLabel error={telError}>Contact (téléphone) *</DemandLabel>
            <FormInput
              type='tel'
              value={tel}
              onChange={(v) => {
                setTel(v.target.value);
                setTelError(false);
              }}
              error={telError}
            />
            <ContactConfirmationContainer onClick={() => {
              setContactConfirmationSelected(!isContactConfirmationSelected);
              setConfirmationError(false);
            }}>
              <ContactConfirmationSelect selected={isContactConfirmationSelected} error={confirmationError}/>
              <ContactConfirmationLabel error={confirmationError}>J&apos;accepte de transmettre mes coordonnées à La Fabrique Populaire *</ContactConfirmationLabel>
            </ContactConfirmationContainer>
            <LoanButton onClick={onDemand} loading={loading}>Envoyer la demande</LoanButton>
          </DemandForm>
        </FlexContainer>
      </Container>
    </>
  )
}

export default BookDemandForm;
