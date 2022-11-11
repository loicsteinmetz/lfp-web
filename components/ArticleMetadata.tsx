import styled from 'styled-components';
import Avatar from './Avatar';
import typos from '../theme/typos';
import Icon from './Icon';
import {Spacings} from '../theme/spacings';
import {Colors} from '../theme/colors';

export interface ArticleMetadataProps {
  article: Article;
  authors: Author[];
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: ${Spacings.S1};
  margin-bottom: ${Spacings.S2};
  flex-wrap: wrap;
`

const AuthorContainer = styled.div<{p?: number}>`
  display: inline-flex;
  padding: ${({p}) => p ? p/2 : 0}px ${({p}) => p ?? 0}px ${({p}) => p ? p/2 : 0}px 10px;
  border-radius: 10px;
  background-color: ${Colors.GREY['0']};
  align-items: center;
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
`

const Icons = styled.div`
  margin-bottom: -3px;

  svg {
    &:hover {
      cursor: pointer;
      transform: scale(1.1);
    }
  }
`

const PublicationDate = styled.p`
  color: ${Colors.GREY['400']};
  font-size: 12px;
`

const ArticleMetadata = ({article, authors}: ArticleMetadataProps) => {
  const date: Date = new Date(article.publishedAt);

  return (
    <Container>
        {authors.map(author => (
          <AuthorContainer key={`author-${author.id}`} p={(!author.facebook) ? 16 : 0}>
            <Avatar picture={author.picture}/>
            <AuthorName>{author.displayName}</AuthorName>
            <Icons>
              {author.facebook && <Icon icon={'facebook'} scale={0.4}/>}
            </Icons>
          </AuthorContainer>
        ))}
      <PublicationDate>Publié le {date.getDate()}/{date.getMonth()}/{date.getFullYear()}</PublicationDate>
    </Container>
  )
}

export default ArticleMetadata;
