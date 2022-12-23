import styled from 'styled-components';
import typos from '../theme/typos';
import {Spacings} from '../theme/spacings';
import Image from 'next/image';
import {Colors} from '../theme/colors';
import {Devices} from '../theme/breakpoints';
import React from 'react';
import Link from 'next/link';
import Label from './Label';

export interface ArticleCardProps {
  article: Article;
}

const Container = styled.div`
  margin-bottom: ${Spacings.S2};
  background-color: ${Colors.GREY['0']};
  padding: ${Spacings.S2};
  border-radius: 5px;

  @media (${Devices.TABLET}) {
    padding: ${Spacings.S3};
  }
`

const Labels1 = styled.div`
  display: flex;
  gap: ${Spacings.S1};
  margin-bottom: ${Spacings.S2};

  @media (${Devices.DESKTOP}) {
    display: none;
  }
`

const Labels2 = styled.div`
  display: none;
  gap: ${Spacings.S1};
  margin-bottom: ${Spacings.S2};

  @media (${Devices.DESKTOP}) {
    display: flex;
  }
`

const Title1 = styled.h2`
  ${typos.OVERLINE1};
  font-size: 21px;
  margin-bottom: ${Spacings.S2};

  &:hover {
    color: ${Colors.PRIMARY['500']};
    cursor: pointer;
    transition: color 300ms;
  }

  @media (${Devices.TABLET}) {
    ${typos.H2};
  }

  @media (${Devices.DESKTOP}) {
    margin-bottom: ${Spacings.S3};
  }

  @media (${Devices.DESKTOP}) {
    display: none;
  }
`

const Title2 = styled.h2`
  ${typos.H2};
  display: none;
  margin-bottom: ${Spacings.S2};

  &:hover {
    color: ${Colors.PRIMARY['500']};
    cursor: pointer;
    transition: color 300ms;
  }

  @media (${Devices.DESKTOP}) {
    display: block;
  }
`

const FlexContainer = styled.div`
  @media (${Devices.DESKTOP}) {
    display: flex;
    gap: ${Spacings.S3};
    align-items: flex-start;
  }
`

const CoverContainer = styled.div`
  max-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-bottom: ${Spacings.S2};

  &:hover {
    cursor: pointer;
  }

  @media (${Devices.TABLET}) {
    max-height: 350px;
  }

  @media (${Devices.DESKTOP}) {
    max-height: 450px;
    margin-bottom: 0;
    flex: 0.6;
  }
`

const InfoContainer = styled.div`
  @media (${Devices.DESKTOP}) {
    flex: 0.4;
  }
`

const Extract = styled.p`
  ${typos.BODY1};
  margin-bottom: ${Spacings.S2};

  @media (${Devices.DESKTOP}) {
    margin-bottom: ${Spacings.S3};
  }
`

const Authors = styled.div`
  ${typos.OVERLINE1};
  margin-right: ${Spacings.S1};

  @media (${Devices.TABLET}) {
    margin-right: ${Spacings.S2};
  }

  @media (${Devices.DESKTOP}) {
    text-align: right;
  }
`

const Author = styled.p`
  margin-bottom: 5px;

  &:hover {
    color: ${Colors.PRIMARY['500']};
    cursor: pointer;
    transition: color 300ms;
  }
`

const PublicationDate1 = styled.p`
  margin-top: ${Spacings.S1};
  margin-bottom: ${Spacings.S2};
  font-size: 14px;
  color: ${Colors.GREY['500']};

  @media (${Devices.DESKTOP}) {
    display: none;
  }
`;

const PublicationDate2 = styled.p`
  margin-top: ${Spacings.S1};
  margin-bottom: ${Spacings.S2};
  font-size: 14px;
  color: ${Colors.GREY['500']};
  display: none;

  @media (${Devices.DESKTOP}) {
    display: block;
  }
`;

const ArticleCard = ({article}: ArticleCardProps) => {
  const link = `/articles/${article.slug}`
  const date: Date = new Date(article.publishedAt);

  return (
    <Container>
      <Link href={link}><Title1>{article.title}</Title1></Link>
      <Labels1>
        {article.categories && article.categories.map(category => (
          <Label key={`article-${article.id}-cat-${category.id}`} label={category.name} url={`/thematiques/${category.slug}`}/>
        ))}
        {article.types && article.types.map(type => (
          <Label type={'grey'} key={`article-${article.id}-type-${type.id}`} label={type.name} url={`/formats/${type.slug}`}/>
        ))}
      </Labels1>
      <PublicationDate1>Publié le {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</PublicationDate1>
      <FlexContainer>
        <CoverContainer>
          <Link href={link}><Image src={article.cover!.url} height={article.cover!.height} width={article.cover!.width} alt={article.cover!.alternativeText}/></Link>
        </CoverContainer>
        <InfoContainer>
          <Link href={link}><Title2>{article.title}</Title2></Link>
          <Labels2>
            {article.categories && article.categories.map(category => (
              <Label key={`article-${article.id}-cat-${category.id}`} label={category.name} url={`/thematiques/${category.slug}`}/>
            ))}
            {article.types && article.types.map(type => (
              <Label type={'grey'} key={`article-${article.id}-type-${type.id}`} label={type.name} url={`/formats/${type.slug}`}/>
            ))}
          </Labels2>
          <PublicationDate2>Publié le {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</PublicationDate2>
          <Extract>{article.extract}</Extract>
          <Authors>
            {article.authors!.map(author => (
              <Link href={`/auteurs/${author.slug}`} key={`author-${author.id}`}><Author>{author.displayName}</Author></Link>
            ))}
          </Authors>
        </InfoContainer>
      </FlexContainer>
    </Container>
  )
}

export default ArticleCard;
