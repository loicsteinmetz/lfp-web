import styled from 'styled-components';
import {Colors} from '../theme/colors';
import {Spacings} from '../theme/spacings';
import typos from '../theme/typos';

export interface ExternalMediasProps {
  article: Article;
}

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
  padding: 20px 20px 5px 20px;
  background-color: ${Colors.GREY['200']};
  border-radius: 10px;
`

const ExternalMedias = ({article}: ExternalMediasProps) => {
  return (article.externalMedia && article.externalMedia.length > 0) ? (
    <MediaContainer>
      <IframeContainer>
        {article.externalMedia.map(externalMedia => (
          <iframe key={`media-${externalMedia.url}`} src={`https://www.youtube.com/embed/${externalMedia.url}`} allowFullScreen>
          </iframe>
        ))}
      </IframeContainer>
    </MediaContainer>) : null
}

export default ExternalMedias;
