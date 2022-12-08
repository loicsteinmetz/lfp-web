import {GetServerSideProps, NextPage} from 'next';
import {getGeneral} from '../../data/general.data';
import {getPages} from '../../data/pages.data';
import {getCategories} from '../../data/categories.data';
import {getTypes} from '../../data/types.data';
import {s} from '../../utils/serializer';
import ArticlesList from '../../components/ArticlesList';
import Layout from '../../components/Layout';
import {findAuthorBySlug} from '../../data/authors.data';
import {findArticlesByAuthor} from '../../data/articles.data';
import styled from 'styled-components';
import Avatar from '../../components/Avatar';
import {Spacings} from '../../theme/spacings';
import typos from '../../theme/typos';
import {Colors} from '../../theme/colors';
import Link from 'next/link';
import Icon from '../../components/Icon';
import Divider from '../../components/Divider';
import {Devices} from '../../theme/breakpoints';
import {PaginatedPageProps} from '../../components/Pagination';

interface AuthorProps extends PaginatedPageProps {
  general: General;
  pages: Page[];
  categories: Category[];
  types: Type[];
  author: Author;
  articles: Article[];
  url: string;
}

const AuthorContainer = styled.div<{ extraPadding?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${Spacings.S3};
  padding: ${({extraPadding}) => extraPadding ? Spacings.S1 : 0} ${Spacings.S1} ${({extraPadding}) => extraPadding ? Spacings.S1 : 0} ${Spacings.S2};
  background-color: ${Colors.GREY['0']};
  border-radius: 10px;
  margin-top: ${Spacings.S2};

  @media (${Devices.TABLET}) {
    padding: ${Spacings.S2};
    border-radius: 20px;
  }
`

const Icons = styled.div`
  margin-left: -10px;

  svg {
    margin-top: 3px;

    @media (${Devices.TABLET}) {
      margin-top: 8px;
    }

    &:hover {
      cursor: pointer;
      transform: scale(1.1);
    }
  }
`

const Name = styled.h1`
  margin-left: -15px;
  margin-top: -3px;
  ${typos.SUBTITLE1};

  @media (${Devices.TABLET}) {
    ${typos.H2};
    margin-left: 0;
  }
`

const AuthorPage: NextPage<AuthorProps> = ({url, general, pages, categories, types, author, articles, currentPage, totalPages}) => {
  return (
    <Layout url={url} general={general} pages={pages} categories={categories} types={types} title={author.displayName}>
      <AuthorContainer extraPadding={!author.facebook}>
        <Avatar picture={author.picture} size={'lg'}/>
        <Name>{author.displayName}</Name>
        <Icons>
          {author.facebook && <Link href={author.facebook}><a target="_blank"><Icon icon={'facebook'} scale={0.6}/></a></Link>}
        </Icons>
      </AuthorContainer>
      <Divider/>
      <ArticlesList articles={articles} currentPage={currentPage} totalPages={totalPages}/>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<AuthorProps, { slug: string, page: string }> = async (context) => {
  const url = context.req.headers.host + context.resolvedUrl;
  const general = s(await getGeneral('*'));
  const pages = s((await getPages()).data);
  const categories = s((await getCategories()).data);
  const types = s((await getTypes()).data);
  const author = s((await findAuthorBySlug(context.params!.slug, '*')));
  const articlesRes = await findArticlesByAuthor(author.id, context.query?.page ?? '1', '*');
  const articles = s(articlesRes.data);
  const totalPages = articlesRes.meta.pageCount;
  const currentPage = articlesRes.meta.page;
  return {props: {general, pages, categories, types, author, articles, currentPage, totalPages, url}}
}

export default AuthorPage;

