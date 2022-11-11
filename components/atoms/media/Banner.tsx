import styled from 'styled-components';
import Image from 'next/image';
import {Devices} from '../../theme/breakpoints';

export interface BannerProps {
  banner: LFPMedia;
  logoLg: LFPMedia;
}

const Container = styled.div`
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media(${Devices.TABLET}) {
    height: 300px;
  }
`

const BackgroundContainer = styled.div<{backgroundUrl: string}>`
  background-image: url("${({backgroundUrl}) => backgroundUrl}");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  opacity: 0.4;
`

const ImageContainer = styled.div`
  width: 75%;
  mix-blend-mode: multiply;
  position: absolute;
  text-align: center;
`

const Banner = ({banner, logoLg}: BannerProps) => {
  return (
    <Container>
      <BackgroundContainer backgroundUrl={banner.url}/>
      <ImageContainer>
        <Image src={logoLg.url} alt="La Fabrique Populaire" height={logoLg.height} width={logoLg.width}/>
      </ImageContainer>
    </Container>
  )
}

export default Banner;
