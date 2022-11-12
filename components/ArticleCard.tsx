import styled from 'styled-components';
import typos from '../theme/typos';
import {Spacings} from '../theme/spacings';
import Image from 'next/image';
import {Colors} from '../theme/colors';
import {Devices} from '../theme/breakpoints';
import React from 'react';
import Link from 'next/link';

export interface ArticleCardProps {
  article: Article;
}

const Container = styled.div`
  margin-bottom: ${Spacings.S2};
  background-color: ${Colors.GREY['0']};
  padding: ${Spacings.S3};
`

const Title1 = styled.h2`
  ${typos.H2};
  margin-bottom: ${Spacings.S2};

  &:hover {
    color: ${Colors.PRIMARY['500']};
    cursor: pointer;
    transition: color 300ms;
  }

  @media (${Devices.TABLET}) {
    margin-bottom: ${Spacings.S3};
  }

  @media (${Devices.DESKTOP}) {
    display: none;
  }
`

const Title2 = styled.h2`
  ${typos.H2};
  margin-bottom: ${Spacings.S3};
  display: none;
  
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
    margin-top: -10px;
  }
`

const Extract = styled.p`
  ${typos.BODY1};
  margin-bottom: ${Spacings.S2};

  @media (${Devices.DESKTOP}) {
    margin-bottom: ${Spacings.S3};
  }
`

const Authors = styled.p`
  ${typos.OVERLINE1};
  text-align: right;
  margin-right: ${Spacings.S1};

  @media (${Devices.TABLET}) {
    margin-right: ${Spacings.S2};
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

const ArticleCard = ({article}: ArticleCardProps) => {
  const link = `/articles/${article.slug}`

  return (
    <Container>
      <Link href={link}><Title1>{article.title}</Title1></Link>
      <FlexContainer>
        <CoverContainer>
          <Link href={link}>
            <Image src={article.cover!.url} height={article.cover!.height} width={article.cover!.width} alt={article.cover!.alternativeText}/>
          </Link>
        </CoverContainer>
        <InfoContainer>
          <Link href={link}><Title2>{article.title}</Title2></Link>
          <Extract>{article.extract}</Extract>
          <Authors>{article.authors!.map(author => (<Author key={`author-${author.id}`}>{author.displayName}</Author>))}</Authors>
        </InfoContainer>
      </FlexContainer>
    </Container>
  )
}

export default ArticleCard;
