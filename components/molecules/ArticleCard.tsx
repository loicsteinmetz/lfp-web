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
    flex: 0.7;
  }
`

const InfoContainer = styled.div`
  @media (${Devices.DESKTOP}) {
    flex: 0.3;
  }
`

const Extract = styled.p`
  ${typos.BODY1};
  margin-bottom: ${Spacings.S2};

  @media (${Devices.DESKTOP}) {
    margin-bottom: ${Spacings.S3};
  }
`

const Author = styled.p`
  ${typos.OVERLINE1};

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
          <Title2>{article.title}</Title2>
          <Extract>{article.extract}</Extract>
          <Author>{article.authors!.map(author => author.displayName).join(', ')}</Author>
        </InfoContainer>
      </FlexContainer>
    </Container>
  )
}

export default ArticleCard;
