import {GetServerSideProps, NextPage} from 'next';
import {s} from '../../utils/serializer';
import ArticlesList from '../../components/ArticlesList';
import Layout from '../../components/Layout';
import {getAuthorBySlug} from '../../data/authors.data';
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
import {provideData} from '../../utils/requests';
import {BaseProps} from '../index';

interface AuthorProps extends PaginatedPageProps, BaseProps {
  author: Author;
  articles: Article[];
}

const AuthorContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${Spacings.S2};
  padding: ${Spacings.S2};
  background-color: ${Colors.GREY['0']};
  border-radius: 10px;
  margin-top: ${Spacings.S2};

  @media (${Devices.TABLET}) {
    padding: ${Spacings.S2} ${Spacings.S3} ${Spacings.S2} ${Spacings.S2};
    border-radius: 20px;
    gap: ${Spacings.S3};
  }
`

const Icons = styled.div`
  display: flex;
  gap: ${Spacings.S1};
  margin-top: 2px;

  svg {
    @media (${Devices.TABLET}) {
      gap: ${Spacings.S2};
    }
  }
`

const Name = styled.h1`
  ${typos.SUBTITLE1};

  @media (${Devices.TABLET}) {
    ${typos.H2};
    margin-left: 0;
  }
`

const AuthorPage: NextPage<AuthorProps> = ({url, general, pages, categories, types, author, articles, currentPage, totalPages}) => {
  return (
    <Layout url={url} general={general} pages={pages} categories={categories} types={types} title={author.displayName}>
      <AuthorContainer>
        <Avatar picture={author.picture} size={'lg'}/>
        <Name>{author.displayName}</Name>
        <Icons>
          {author.facebook && <Link href={author.facebook}><a target="_blank"><Icon icon={'facebook'} scale={0.4} tabletScale={0.6}/></a></Link>}
          {author.instagram && <Link href={author.instagram}><a target="_blank"><Icon icon={'instagram'} scale={0.4} tabletScale={0.6}/></a></Link>}
          {author.twitter && <Link href={author.twitter}><a target="_blank"><Icon icon={'twitter'} scale={0.4} tabletScale={0.6}/></a></Link>}
        </Icons>
      </AuthorContainer>
      <Divider/>
      <ArticlesList articles={articles} currentPage={currentPage} totalPages={totalPages}/>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<AuthorProps, { slug: string, page: string }> = async (context) => {
  return await provideData(
    context,
    async () => {
      const author = s((await getAuthorBySlug(context.params!.slug, '*')));
      const articlesRes = await findArticlesByAuthor(author.id, context.query?.page ?? '1', '*');
      const articles = s(articlesRes.data);
      const totalPages = articlesRes.meta.pageCount;
      const currentPage = articlesRes.meta.page;
      return {author, articles, currentPage, totalPages}
    }
  );
}

export default AuthorPage;

