import styled from 'styled-components';
import Link from 'next/link';
import typos from '../theme/typos';
import {Colors} from '../theme/colors';
import {Spacings} from '../theme/spacings';
import {Devices} from '../theme/breakpoints';

export interface ErrorProps {
  code: 404 | 500;
}

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Spacings.S2};
  align-items: center;
  background-color: ${Colors.GREY['25']};
  padding: ${Spacings.S2} ${Spacings.S3} calc(${Spacings.S2} + 6px) ${Spacings.S3};

  @media(${Devices.TABLET}) {
    flex-direction: row;
    padding: ${Spacings.S2} ${Spacings.S3};
  }
`

const ErrorCode = styled.p`
  font-size: 20px;
  color: ${Colors.PRIMARY['500']};
`

const HorizontalSeparator = styled.div`
  height: 1px;
  width: 25px;
  margin-top: 5px;
  background-color: ${Colors.GREY['500']};
  display: none;

  @media(${Devices.TABLET}) {
    display: block;
  }
`

const Message = styled.p`
  font-weight: bold;
  text-align: center;
`

const Home = styled.a`
  text-decoration: underline;
  
  &:hover {
    cursor: pointer;
    color: ${Colors.PRIMARY['500']};
  }
`

const Error = ({code}: ErrorProps) => {
  const getMessage = (code: 404 | 500) => {
    if (code === 404) {
      return 'Oups. Cette page est introuvable.'
    } else if (code === 500) {
      return 'Erreur serveur'
    } else {
      return 'Erreur'
    }
  }

  return (
    <Container>
      <SubContainer>
        <ErrorCode>{code}</ErrorCode>
        <HorizontalSeparator/>
        <Message>{getMessage(code)}</Message>
        <HorizontalSeparator/>
        <Link href={'/'}>
          <Home>Retour à l&apos;accueil</Home>
        </Link>
      </SubContainer>
    </Container>
  )
}

export default Error;
