import Article from './Article';
import React from 'react';
import useWindowDimensions from '../utils/windowDimensions';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import {Spacings} from '../theme/spacings';
import {Colors} from '../theme/colors';
import typos from '../theme/typos';
import Divider from './Divider';
import Label from './Label';
import {Devices} from '../theme/breakpoints';

export interface ArticleCardFrontProps {
  article: Article;
}

const Container = styled.div`
  margin-bottom: ${Spacings.S2};
  background-color: ${Colors.GREY['0']};
  border-radius: 5px;
  width: calc(100% + ${Spacings.S2} * 2);
  margin-left: -${Spacings.S2};

  @media (${Devices.TABLET}) {
    width: 100%;
    margin-left: 0;
  }
`

const CoverContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  margin-bottom: ${Spacings.S2};
  max-height: 550px;

  &:hover {
    color: ${Colors.PRIMARY['500']};
    cursor: pointer;
    transition: color 300ms;
  }
`

const SubContainer = styled.div`
  margin-bottom: ${Spacings.S2};
  padding: ${Spacings.S2} ${Spacings.S3};
`

const Title = styled.h2`
  ${typos.H2};
  position: absolute;
  margin: ${Spacings.S3} ${Spacings.S3} 30px ${Spacings.S3};
  padding: ${Spacings.S1} ${Spacings.S3};
  background-color: ${Colors.GREY['0']};
  display: inline-block;
  text-align: center;

  &:hover {
    color: ${Colors.PRIMARY['500']};
    cursor: pointer;
    transition: color 300ms;
  }

  @media (${Devices.TABLET}) {
    margin-bottom: 50px;
    padding: ${Spacings.S2} ${Spacings.S3};
  }
`

const Infos = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Spacings.S1};
  margin-bottom: ${Spacings.S2};
  align-items: flex-start;

  @media (${Devices.TABLET}) {
    flex-direction: row;
    align-items: center;
  }
`

const Labels = styled.div`
  display: flex;
  gap: ${Spacings.S1};
  margin-bottom: ${Spacings.S1};

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
  }
`

const Author = styled.p`
  margin-bottom: 2px;

  &:hover {
    color: ${Colors.PRIMARY['500']};
    cursor: pointer;
    transition: color 300ms;
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
  const windowDimensions = useWindowDimensions();
  const link = `/articles/${article.slug}`;
  const date: Date = new Date(article.publishedAt);

  return (
    <>
      <Container>
        <CoverContainer>
          <Link href={link}>
            <Image objectFit={'cover'} src={article.cover!.url} height={article.cover!.height} width={article.cover!.width}
                   alt={article.cover!.alternativeText}/>
          </Link>
          <Link href={link}>
            <Title>{article.title}</Title>
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
              {article.authors!.map(author => (
                <Link href={`/auteurs/${author.slug}`} key={`author-${author.id}`}><Author>{author.displayName}</Author></Link>
              ))}
            </Authors>
            <HorizontalSeparator/>
            <PublicationDate>Publié le {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</PublicationDate>
          </Infos>
          <Extract>{article.extract}</Extract>
        </SubContainer>
      </Container>
      <Divider/>
    </>
  )
}

export default ArticleCardFront;
