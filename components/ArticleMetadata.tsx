import styled from 'styled-components';
import Avatar from './Avatar';
import typos from '../theme/typos';
import Icon from './Icon';
import {Spacings} from '../theme/spacings';
import {Colors} from '../theme/colors';
import Link from 'next/link';
import {Devices} from '../theme/breakpoints';

export interface ArticleMetadataProps {
  article: Article;
  authors: Author[];
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-bottom: ${Spacings.S1};
  gap: ${Spacings.S2};

  @media (${Devices.TABLET}) {
    margin-bottom: ${Spacings.S2};
  }
`

const AuthorsContainer = styled.div`
  display: inline-flex;
  gap: ${Spacings.S1};
  margin-bottom: ${Spacings.S2};
  flex-wrap: wrap;
  align-items: center;
`

const AuthorContainer = styled.div`
  display: inline-flex;
  padding: ${Spacings.S1};
  border-radius: 10px;
  background-color: ${Colors.GREY['0']};
  align-items: center;
  flex-wrap: wrap;
`

const AuthorName = styled.p`
  ${typos.OVERLINE1};
  font-size: 13px;
  margin-top: -2px;
  margin-left: ${Spacings.S2};

  &:hover {
    color: ${Colors.PRIMARY['500']};
    cursor: pointer;
  }

  @media (${Devices.TABLET}) {
    font-size: 15px;
  }
`

const Icons = styled.div`
  margin-left: ${Spacings.S2};
  display: inline-flex;
  gap: ${Spacings.S1};
`

const PublicationDate = styled.p`
  color: ${Colors.GREY['400']};
  font-size: 12px;
`

const ArticleMetadata = ({article, authors}: ArticleMetadataProps) => {
  const date: Date = new Date(article.publishedAt);

  return (
    <Container>
      <PublicationDate>Publié le {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</PublicationDate>
      <AuthorsContainer>
        {authors.map(author => {
          const authorLink = `/auteurs/${author.slug}`;
          return (
            <AuthorContainer key={`author-${author.id}`}>
              <Link href={authorLink}><a><Avatar picture={author.picture}/></a></Link>
              <Link href={authorLink}><AuthorName>{author.displayName}</AuthorName></Link>
              <Icons>
                {author.facebook && <Link href={author.facebook}><a target="_blank"><Icon icon={'facebook'} scale={0.4}/></a></Link>}
                {author.instagram && <Link href={author.instagram}><a target="_blank"><Icon icon={'instagram'} scale={0.4}/></a></Link>}
                {author.twitter && <Link href={author.twitter}><a target="_blank"><Icon icon={'twitter'} scale={0.4}/></a></Link>}
              </Icons>
            </AuthorContainer>
          )
        })}
      </AuthorsContainer>
    </Container>
  )
}

export default ArticleMetadata;
