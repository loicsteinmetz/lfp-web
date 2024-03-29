import styled from 'styled-components';
import typos from '../theme/typos';
import Image from 'next/image';
import {Spacings} from '../theme/spacings';
import {Devices} from '../theme/breakpoints';
import ExternalMedias from './ExternalMedias';
import FormattedContent from './FormattedContent';
import ArticleMetadata from './ArticleMetadata';
import Divider from './Divider';
import Label from './Label';
import React from 'react';
import {Colors} from '../theme/colors';
import ArticlesList from './ArticlesList';

export interface ArticleProps {
  article: Article;
  authors: Author[];
  relatedArticles: Article[];
}

const Container = styled.div`
  margin: ${Spacings.S1} 0 ${Spacings.S3} 0;
  
  @media (${Devices.TABLET}) {
    padding: 0 ${Spacings.S4};
  }
`

const Labels = styled.div`
  display: flex;
  gap: ${Spacings.S1};
  margin-bottom: ${Spacings.S2};
  flex-wrap: wrap;
`

const Title = styled.h2`
  ${typos.H2};
  margin-top: ${Spacings.S1};
  margin-bottom: ${Spacings.S2};

  @media (${Devices.TABLET}) {
    ${typos.H1};
  }
`

const CoverContainer = styled.div`
  display: flex;
  max-width: 100%;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`

const Caption = styled.p`
  margin-bottom: ${Spacings.S3};
  margin-top: 5px;
  text-align: center;
  font-size: 12px;
  font-style: italic;
  color: ${Colors.GREY['700']};
`

const InfoContainer = styled.div`
  padding: 0 ${Spacings.S2};
  background-color: ${Colors.GREY['100']};
  margin: 50px 0;

  @media (${Devices.TABLET}) {
    padding: 0 ${Spacings.S3};
  }
`

const Extract = styled.p`
  ${typos.SUBTITLE1};
  margin-bottom: ${Spacings.S2};
`

const Subject = styled.h2`
  ${typos.H2};
  margin-top: ${Spacings.S1};
  margin-bottom: ${Spacings.S3};
`

const Article = ({article, authors, relatedArticles}: ArticleProps) => {
  return (
    <Container>
      <Labels>
        {article.categories && article.categories.map(category => (
          <Label key={`article-${article.id}-cat-${category.id}`} label={category.name} url={`/thematiques/${category.slug}`}/>
        ))}
        {article.types && article.types.map(type => (
          <Label type={'grey'} key={`article-${article.id}-type-${type.id}`} label={type.name} url={`/formats/${type.slug}`}/>
        ))}
      </Labels>
      <Title>{article.title}</Title>
      <ArticleMetadata article={article} authors={authors}/>
      <CoverContainer>
        <Image src={article.cover!.url} alt={article.cover!.alternativeText} height={article.cover!.height} width={article.cover!.width}/>
      </CoverContainer>
      <Caption>{article.cover!.alternativeText}</Caption>
      {article.info &&
        <InfoContainer>
          <FormattedContent content={article.info}/>
        </InfoContainer>
      }
      <Extract>{article.extract}</Extract>
      <Divider/>
      <ExternalMedias article={article}/>
      <FormattedContent content={article.body}/>
      {article.footer &&
        <InfoContainer>
          <FormattedContent content={article.footer}/>
        </InfoContainer>
      }
      <Divider/>
      {relatedArticles.length > 0 && (
        <>
          <Subject>Sur le même sujet...</Subject>
          <ArticlesList articles={relatedArticles}/>
        </>
      )}
    </Container>
  )
}

export default Article;
