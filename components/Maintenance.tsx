import Image from 'next/image';
import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';
import {Devices} from '../theme/breakpoints';

export interface MaintenanceProps {
  general: General;
}

const Title = styled.h1`
  visibility: hidden;
  height: 0;
  width: 0;
`

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  
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

const Maintenance = ({general}: MaintenanceProps) => {
  return (
    <>
      <Head>
        <title>La Fabrique Populaire</title>
        <link rel="icon" type="image/png" href={general.favicon!.url}/>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
      </Head>
      <Title>La Fabrique Populaire</Title>
      <Container>
        <BackgroundContainer backgroundUrl={general.banner!.url}/>
        <ImageContainer>
          <Image src={general.logoLg!.url} alt="La Fabrique Populaire" height={general.logoLg!.height} width={general.logoLg!.width}/>
        </ImageContainer>
      </Container>
    </>
  )
}

export default Maintenance;
