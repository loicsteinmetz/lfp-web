import Image from 'next/image';
import styled from 'styled-components';

export interface LogoProps {
  logo: LFPMedia
}

const Container = styled.div`
  height: 40px;
  aspect-ratio: 1;
`

const Logo = ({logo}: LogoProps) => {
  return (
    <Container>
      <Image src={logo.url} height="100%" width="100%" alt="La Fabrique Populaire, Accueil"/>
    </Container>
  )
}

export default Logo;
