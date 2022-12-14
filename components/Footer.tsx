import React, {FC} from 'react';
import styled from 'styled-components';
import {Devices} from '../theme/breakpoints';
import {Colors} from '../theme/colors';
import {Spacings} from '../theme/spacings';
import Networks from './Networks';
import Link from 'next/link';

export interface FooterProps {
  general: General;
}

const Container = styled.div`
  @media(${Devices.MOBILE}) {
    border-top: 10px solid ${Colors.PRIMARY['500']};
    height: 100px;
    background-color: ${Colors.GREY['800']};
    flex-grow: 0;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: ${Spacings.S3} ${Spacings.S2} ${Spacings.S3} ${Spacings.S2};
    text-align: center;
    justify-content: space-between;
  }

  @media(${Devices.TABLET}) {
    text-align: left;
    flex-direction: row-reverse;
    padding: 0 ${Spacings.S3};
  }

  @media(${Devices.DESKTOP}) {
    flex-direction: row-reverse;
    padding: 0 ${Spacings.S5};
  }
`

const Legal = styled.p`
  color: ${Colors.GREY['25']};
  font-size: 14px;
  
  a {
    color: ${Colors.GREY['25']};
  }
`

const Footer: FC<FooterProps> = ({general}) => {
  return (
    <Container>
      <Networks youtubeUrl={general.youtube} facebookUrl={general.facebook} instagramUrl={general.instagram} twitterUrl={general.twitter}
                email={general.email} theme={'light'}/>
      <Legal><Link href="/mentions-legales">Mentions Légales</Link> - &copy; 2022 - La Fabrique Populaire. Tous droits réservés.</Legal>
    </Container>
  )
}

export default Footer;
