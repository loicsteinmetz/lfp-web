import Article from './Article';
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import {Spacings} from '../theme/spacings';
import {Colors} from '../theme/colors';
import typos from '../theme/typos';
import Label from './Label';
import {Devices} from '../theme/breakpoints';
import {formatDate} from '../utils/date';
import ExpandedContainer from './ExpandedContainer';

export interface ArticleCardFrontProps {
  article: Article;
}

const CoverContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  margin-bottom: ${Spacings.S2};
  max-height: 350px;

  &:hover {
    color: ${Colors.PRIMARY['500']};
    cursor: pointer;
  }

  @media (${Devices.TABLET}) {
    max-height: 550px;
  }
`

const SubContainer = styled.div`
  margin-bottom: ${Spacings.S2};
  padding: ${Spacings.S1} ${Spacings.S2} ${Spacings.S2} ${Spacings.S2};

  @media (${Devices.TABLET}) {
    padding: ${Spacings.S2} ${Spacings.S3} ${Spacings.S2} ${Spacings.S3};
  }
`

const TitleWrapper = styled.div`
  position: absolute;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  max-width: 1000px;

  @media (${Devices.TABLET}) {
    margin-bottom: 50px;
  }
`

const Title = styled.h2`
  ${typos.OVERLINE1};
  font-size: 21px;
  padding: ${Spacings.S1} ${Spacings.S2};
  background-color: ${Colors.GREY['0']};
  display: inline-block;
  max-width: 70%;
  text-align: center;

  &:hover {
    color: ${Colors.PRIMARY['500']};
    cursor: pointer;
  }

  @media (${Devices.TABLET}) {
    ${typos.H2};
    padding: ${Spacings.S2} ${Spacings.S3};
  }
`

const Infos = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Spacings.S1};
  margin-bottom: ${Spacings.S2};
  align-items: flex-start;
  flex-wrap: wrap;

  @media (${Devices.TABLET}) {
    flex-direction: row;
    align-items: center;
  }
`

const Labels = styled.div`
  display: flex;
  gap: ${Spacings.S1};
  margin-bottom: ${Spacings.S1};
  flex-wrap: wrap;

  @media (${Devices.TABLET}) {
    margin-bottom: 0;
  }
`

const PublicationDate = styled.p`
  font-size: 14px;
  color: ${Colors.GREY['500']};
`;

const Authors = styled.div`
  ${typos.OVERLINE1};

  @media (${Devices.TABLET}) {
    margin-left: ${Spacings.S1};
    display: flex;
    gap: 5px;
  }
`

const Author = styled.p`
  margin-bottom: 2px;

  &:hover {
    color: ${Colors.PRIMARY['500']};
    cursor: pointer;
  }
`

const HorizontalSeparator = styled.div`
  height: 1px;
  width: 20px;
  margin-top: 2px;
  background-color: ${Colors.GREY['300']};
`

const Extract = styled.p`
  ${typos.BODY1};
  margin-bottom: ${Spacings.S2};
`

const ArticleCardFront = ({article}: ArticleCardFrontProps) => {
  const link = `/articles/${article.slug}`;
  const date: Date = new Date(article.publishedAt);

  return (
    <ExpandedContainer>
      <CoverContainer>
        <Link href={link}>
          <Image objectFit="cover" src={article.cover!.url} height={article.cover!.height} width={article.cover!.width}
                 alt={article.cover!.alternativeText}/>
        </Link>
        <Link href={link}>
          <TitleWrapper>
            <Title>{article.title}</Title>
          </TitleWrapper>
        </Link>
      </CoverContainer>
      <SubContainer>
        <Infos>
          <Labels>
            {article.categories && article.categories.map(category => (
              <Label key={`article-${article.id}-cat-${category.id}`} label={category.name} url={`/thematiques/${category.slug}`}/>
            ))}
            {article.types && article.types.map(type => (
              <Label type={'grey'} key={`article-${article.id}-type-${type.id}`} label={type.name} url={`/formats/${type.slug}`}/>
            ))}
          </Labels>
          <Authors>
            {article.authors!.map((author, i) => (
              <>
                <Link href={`/auteurs/${author.slug}`} key={`author-${author.id}`}>
                  <Author>{author.displayName}{i !== article.authors!.length - 1 && (',')}</Author>
                </Link>
              </>
            ))}
          </Authors>
          {(article.authors!.length > 0 || article.types!.length > 0 || article.categories!.length > 0) &&
            <HorizontalSeparator/>
          }
          <PublicationDate>Publié le {formatDate(date)}</PublicationDate>
        </Infos>
        <Extract>{article.extract}</Extract>
      </SubContainer>
    </ExpandedContainer>
  )
}

export default ArticleCardFront;
