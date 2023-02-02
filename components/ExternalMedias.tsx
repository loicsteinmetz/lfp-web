import styled from 'styled-components';
import {Colors} from '../theme/colors';
import {Spacings} from '../theme/spacings';
import {Devices} from '../theme/breakpoints';

export interface ExternalMediasProps {
  article: Article;
}

const IframeContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 56.25%;
  margin-bottom: ${Spacings.S3};

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }
`

const MediaContainer = styled.div`
  border-radius: 10px;
  margin-bottom: ${Spacings.S2};

  @media(${Devices.TABLET}) {
    margin-bottom: ${Spacings.S3};
  }
`

const ExternalMedias = ({article}: ExternalMediasProps) => {
  return (article.externalMedia && article.externalMedia.length > 0) ? (
    <MediaContainer>
        {article.externalMedia.map(externalMedia => (
          <IframeContainer key={`media-${externalMedia.url}`}>
            <iframe src={`https://www.youtube.com/embed/${externalMedia.url}`} allowFullScreen></iframe>
          </IframeContainer>
        ))}
    </MediaContainer>) : null
}

export default ExternalMedias;
