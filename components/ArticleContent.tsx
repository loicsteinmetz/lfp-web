import styled from 'styled-components';
import typos from '../theme/typos';
import Image from 'next/image';
import {Spacings} from '../theme/spacings';
import {Devices} from '../theme/breakpoints';
import ExternalMedias from './ExternalMedias';
import FormattedContent from './FormattedContent';
import ArticleMetadata from './ArticleMetadata';
import Divider from './Divider';

export interface ArticleContentProps {
  article: Article;
  authors: Author[];
}

const Container = styled.div`
  @media (${Devices.TABLET}) {
    padding: 0 ${Spacings.S4};
  }
`

const Title = styled.h2`
  ${typos.H2};
  margin-top: ${Spacings.S1};
  margin-bottom: ${Spacings.S2};
`

const CoverContainer = styled.div`
  display: flex;
  max-width: 100%;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-bottom: ${Spacings.S3};
`

const Extract = styled.p`
  ${typos.SUBTITLE1};
  margin-bottom: ${Spacings.S2};
`

const ArticleContent = ({article, authors}: ArticleContentProps) => {
  return (
    <Container>
      <Title>{article.title}</Title>
      <ArticleMetadata article={article} authors={authors}/>
      <CoverContainer>
        <Image src={article.cover!.url} alt={article.cover!.alternativeText} height={article.cover!.height} width={article.cover!.width}/>
      </CoverContainer>
      <Extract>{article.extract}</Extract>
      <Divider/>
      <ExternalMedias article={article}/>
      <FormattedContent content={article.body}/>
    </Container>
  )
}

export default ArticleContent;
