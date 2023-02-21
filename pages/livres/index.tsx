import {GetServerSideProps, NextPage} from 'next';
import {getBooks} from '../../data/books.data';
import {provideData} from '../../utils/requests';
import {s} from '../../utils/serializer';
import Layout from '../../components/Layout';
import BooksLayout from '../../components/BooksLayout';
import BookCard from '../../components/BookCard';

export interface BaseProps {
  general: General;
  url: string;
}

interface BooksPageProps extends BaseProps {
  books: Book[];
}

const HomePage: NextPage<BooksPageProps> = ({url, general, books}) => {
  return (
    <BooksLayout url={url} general={general}>
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
