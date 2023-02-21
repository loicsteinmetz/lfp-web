import {GetServerSideProps, NextPage} from 'next';
import {getBooks} from '../../data/books.data';
import {provideData} from '../../utils/requests';
import {s} from '../../utils/serializer';
import Layout from '../../components/Layout';
import BooksLayout from '../../components/BooksLayout';
import BookCard from '../../components/BookCard';
import styled from 'styled-components';
import typos from '../../theme/typos';
import {Spacings} from '../../theme/spacings';
import Divider from '../../components/Divider';

export interface BaseProps {
  general: General;
  url: string;
}

interface BooksPageProps extends BaseProps {
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
  margin-top: ${Spacings.S1};
  font-size: 14px;
  line-height: 16px;
  font-style: italic;
`

const HomePage: NextPage<BooksPageProps> = ({url, general, books}) => {
  return (
    <BooksLayout url={url} general={general}>
      <Title>Les livres de La Fabrique</Title>
      <Divider displayHide={{mobile: true}}/>
      <Divider displayHide={{tablet: true, desktop: true}} marginY={Spacings.S2}/>
      <ExplanationTitle>Comment ça marche ?</ExplanationTitle>
      <Explanation>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Explanation>
      <Divider displayHide={{mobile: true}}/>
      <Divider displayHide={{tablet: true, desktop: true}} marginY={Spacings.S2}/>
      {books.map((b, i) => (
        // <p style={{marginBottom: '10px'}} key={i}>{JSON.stringify(b)}</p>
        <BookCard book={b} key={`book-${i}`}/>
      ))}
    </BooksLayout>
  )
}

export const getServerSideProps: GetServerSideProps<BooksPageProps, { page: string }> = async (context) => {
  return await provideData(
    context,
    async () => {
      const booksRes = await getBooks('*');
      const books = s(booksRes.data);
      return {books};
    }
  );
}

export default HomePage;
