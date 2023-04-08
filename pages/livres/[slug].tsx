import {GetServerSideProps} from 'next';
import {s} from '../../utils/serializer';
import {provideData} from '../../utils/requests';
import {Books_BaseProps} from './index';
import BooksLayout from '../../components/BooksLayout';
import BookDetails from '../../components/BookDetails';
import React, {useCallback, useEffect, useState} from 'react';
import {getBook, getBookBySlug} from '../../data/books.data';
import BookDemandForm, {BookStatus} from '../../components/BookDemandForm';
import Popup from '../../components/Popup';
import styled from 'styled-components';
import {Colors} from '../../theme/colors';
import {Spacings} from '../../theme/spacings';
import {envLFP} from '../../utils/envLFP';
import {ReCaptchaProvider} from 'next-recaptcha-v3';
import typos from '../../theme/typos';
import {Devices} from '../../theme/breakpoints';
import Icon from '../../components/Icon';
import Link from 'next/link';
import Divider from '../../components/Divider';

interface BookProps extends Books_BaseProps {
  book: Book;
}

const Confirmation = styled.p<{visible: boolean}>`
  border: 1px solid ${Colors.GREEN['500']};
  background-color: ${Colors.GREEN['200']};
  color: ${Colors.GREEN['500']};
  padding: ${Spacings.S2};
  font-weight: bold;
  border-radius: 5px;
  display: ${({visible}) => visible ? 'block' : 'none'};
  cursor: pointer;
  position: fixed;
  bottom: ${Spacings.S2};
  min-width: 200px;
  z-index: 999999;
  left: ${Spacings.S2};
`

const Error = styled.p<{visible: boolean}>`
  border: 1px solid ${Colors.PRIMARY['500']};
  background-color: ${Colors.PRIMARY['50']};
  color: ${Colors.PRIMARY['500']};
  padding: ${Spacings.S2};
  font-weight: bold;
  border-radius: 5px;
  display: ${({visible}) => visible ? 'block' : 'none'};
  cursor: pointer;
  position: fixed;
  bottom: ${Spacings.S2};
  min-width: 200px;
  z-index: 999999;
  left: ${Spacings.S2};
`

const Title = styled.h2`
  ${typos.H2};
  margin-bottom: ${Spacings.S2};

  @media (${Devices.TABLET}) {
    ${typos.H1};
    margin-bottom: ${Spacings.S2};
  }
`

const Back = styled.div`
  ${typos.OVERLINE1};
  display: flex;
  align-items: center;
  gap: ${Spacings.S1};
  
  & svg {
    margin-top: 4px;
  }

  @media (${Devices.TABLET}) {
    margin-bottom: ${Spacings.S3};
  }
  
  &:hover {
    color: ${Colors.PRIMARY['500']};
    cursor: pointer;

    & svg * {
      fill: ${Colors.PRIMARY['500']};
    }
  }
`

export default function BookPage({url, general, book}: BookProps) {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [displayedBook, setDisplayedBook] = useState<Book & {status: BookStatus, claims: number}>({
    ...book,
    status: book.loans?.some(b => b.status === 'ongoing') ? 'rent' : ((book.loans?.some(b => b.status === 'demand')) ? 'claimed' : 'available'),
    claims: book.loans ? book.loans.filter(b => b.status === 'demand')?.length : 0,
  });
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const [isErrorVisible, setErrorVisible] = useState(false);

  const onDemand = useCallback(() => {
    setPopupVisible(true);
  }, [setPopupVisible]);

  const onQuitPopup = useCallback(() => {
    setPopupVisible(false);
  }, [setPopupVisible]);

  const onDemandConfirmed = useCallback((success: boolean) => {
    setPopupVisible(false);
    if (success) {
      setConfirmationVisible(true);
    } else {
      setErrorVisible(true);
    }
    getBook(displayedBook.id, '*')
      .then((book) => {
        setDisplayedBook({
          ...book,
          status: book.loans?.some(b => b.status === 'ongoing') ? 'rent' : ((book.loans?.some(b => b.status === 'demand')) ? 'claimed' : 'available'),
          claims: book.loans ? book.loans.filter(b => b.status === 'demand')?.length : 0,
        });
      })
  }, [displayedBook]);

  useEffect(() => {
    setDisplayedBook({
      ...book,
      status: book.loans?.some(b => b.status === 'ongoing') ? 'rent' : ((book.loans?.some(b => b.status === 'demand')) ? 'claimed' : 'available'),
      claims: book.loans ? book.loans.filter(b => b.status === 'demand')?.length : 0,
    });
  }, [book]);

  return (
    <ReCaptchaProvider reCaptchaKey={envLFP.RECAPTCHA_SITE_KEY}>
      <BooksLayout
        url={url}
        general={general}
        title={book.name}
        description={book.abstract}
        cover={book.cover ?? undefined}
      >
        <Confirmation visible={isConfirmationVisible} onClick={() => setConfirmationVisible(false)}>Demande envoyée !</Confirmation>
        <Error visible={isErrorVisible} onClick={() => setErrorVisible(false)}>Échec de la demande...</Error>
        <Title>Les livres de la Fabrique</Title>
        <Link href='/livres'><Back><Icon icon={'back'} scale={0.3}/> Retour à la liste des livres</Back></Link>
        <Divider marginY={Spacings.S2}/>
        <BookDetails book={displayedBook} onDemand={onDemand}/>
        <Popup visible={isPopupVisible} onQuit={onQuitPopup}>
            <BookDemandForm book={displayedBook} onDemandResult={onDemandConfirmed}/>
        </Popup>
      </BooksLayout>
    </ReCaptchaProvider>
  )
}

export const getServerSideProps: GetServerSideProps<BookProps, { slug: string }> = async (context) => {
  return await provideData(
    context,
    async () => {
      const book = s((await getBookBySlug(context.params!.slug, '*')));
      return {book};
    }
  );
}
