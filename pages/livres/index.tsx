import {GetServerSideProps, NextPage} from 'next';
import {getBooks} from '../../data/books.data';
import {provideData} from '../../utils/requests';
import {s} from '../../utils/serializer';
import BooksLayout from '../../components/BooksLayout';
import BookCard from '../../components/BookCard';
import styled from 'styled-components';
import typos from '../../theme/typos';
import {Spacings} from '../../theme/spacings';
import Divider from '../../components/Divider';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../theme/colors';
import {ReCaptchaProvider} from 'next-recaptcha-v3';
import {envLFP} from '../../utils/envLFP';
import Pagination from '../../components/Pagination';
import useRootUrl from '../../utils/rootUrl';

export interface Books_BaseProps {
  general: General;
  url: string;
}

export interface Books_PaginatedProps extends Books_BaseProps {
  totalPages: number;
  currentPage: number;
}

interface BooksPageProps extends Books_PaginatedProps {
  books: Book[];
}

const Title = styled.h1`
  ${typos.H2};
`

const ExplanationTitle = styled.p`
  ${typos.OVERLINE1};
  margin-top: ${Spacings.S2};
`

const Explanation = styled.p`
  ${typos.BODY1};
  margin-top: ${Spacings.S2};
  font-size: 14px;
  line-height: 16px;
  font-style: italic;
`

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

const BooksPage: NextPage<BooksPageProps> = ({url, general, books, totalPages, currentPage}) => {
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const [isErrorVisible, setErrorVisible] = useState(false);

  const rootUrl = useRootUrl();

  useEffect(() => {
    if (isConfirmationVisible) {
      setTimeout(() => setConfirmationVisible(false), 5000);
    }
  }, [isConfirmationVisible]);

  useEffect(() => {
    if (isErrorVisible) {
      setTimeout(() => setErrorVisible(false), 5000);
    }
  }, [isErrorVisible]);

  return (
    <ReCaptchaProvider reCaptchaKey={envLFP.RECAPTCHA_SITE_KEY}>
      <BooksLayout url={url} general={general}>
        <Confirmation visible={isConfirmationVisible} onClick={() => setConfirmationVisible(false)}>Demande envoyée !</Confirmation>
        <Error visible={isErrorVisible} onClick={() => setErrorVisible(false)}>Échec de la demande...</Error>
        <Title>Les livres de La Fabrique</Title>
        <Divider displayHide={{mobile: true}}/>
        <Divider displayHide={{tablet: true, desktop: true}} marginY={Spacings.S2}/>
        {currentPage === 1 && (
          <>
            <ExplanationTitle>Comment ça marche ?</ExplanationTitle>
            <Explanation>
              {general.books_how_to.replaceJSX('\n', <br/>)}
            </Explanation>
            <Divider displayHide={{mobile: true}}/>
            <Divider displayHide={{tablet: true, desktop: true}} marginY={Spacings.S2}/>
          </>
        )}
        {books.map((b, i) => (
          <BookCard book={b} key={`book-${i}`} onDemandResult={(success) => success ? setConfirmationVisible(true) : setErrorVisible(true)}/>
        ))}
        <Pagination currentPage={currentPage} totalPages={totalPages} rootUrl={rootUrl}/>
      </BooksLayout>
    </ReCaptchaProvider>
  )
}

export const getServerSideProps: GetServerSideProps<BooksPageProps, { page: string }> = async (context) => {
  return await provideData(
    context,
    async () => {
      const booksRes = await getBooks(context.query?.page ?? '1', '*');
      const books = s(booksRes.data);
      const totalPages = booksRes.meta.pageCount;
      const currentPage = booksRes.meta.page;
      return {books, totalPages, currentPage};
    }
  );
}

export default BooksPage;
