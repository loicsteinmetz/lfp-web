import styled from 'styled-components';
import typos from '../theme/typos';
import Image from 'next/image';
import {Spacings} from '../theme/spacings';
import ReactMarkdown from 'react-markdown';
import {Colors} from '../theme/colors';
import {Devices} from '../theme/breakpoints';

export interface ArticleContentProps {
  article: Article;
}

const Container = styled.div`
  @media(${Devices.TABLET}) {
    padding: ${Spacings.S3} ${Spacings.S4};
  }
`

const Title = styled.h2`
  ${typos.H2};
  margin-top: ${Spacings.S1};
  margin-bottom: ${Spacings.S3};
`

const CoverContainer = styled.div`
  display: flex;
  max-width: 100%;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-bottom: ${Spacings.S2};
`

const IframeContainer = styled.div`
  background-color: ${Colors.GREY['200']};
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 56.25%;
  margin-bottom: ${Spacings.S2};

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
`

const MediaContainer = styled.div`
  padding: ${Spacings.S2};
  background-color: ${Colors.GREY['200']};
`

const MediaLabel = styled.p`
  ${typos.SUBTITLE1};
  margin-bottom: ${Spacings.S2};
  text-align: center;
  padding-bottom: ${Spacings.S2};
  border-bottom: 1px solid ${Colors.GREY['800']};
`

const Content = styled.div`
  padding: ${Spacings.S2} 0;
`

const ArticleContent = ({article}: ArticleContentProps) => {
  return (
    <Container>
      <Title>{article.title}</Title>
      <CoverContainer>
        <Image src={article.cover!.url} alt={article.cover!.alternativeText} height={article.cover!.height} width={article.cover!.width}/>
      </CoverContainer>
      {(article.externalMedia && article.externalMedia.length > 0) && (<MediaContainer>
        <MediaLabel>Media</MediaLabel>
        <IframeContainer>
          {article.externalMedia.map(externalMedia => (
            <iframe key={`media-${externalMedia.url}`} src={`https://www.youtube.com/embed/${externalMedia.url}`} allowFullScreen>
            </iframe>
          ))}
        </IframeContainer>
      </MediaContainer>)}
      <Content>
        <div id="content">
          <ReactMarkdown>{article.body}</ReactMarkdown>
        </div>
      </Content>
    </Container>
  )
}

export default ArticleContent;
