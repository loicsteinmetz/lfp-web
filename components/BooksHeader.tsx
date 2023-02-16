import React, {FC} from 'react';
import styled from 'styled-components';
import Banner from './Banner';
import Link from 'next/link';
import BooksHeaderNav from './BooksHeaderNav';

export interface BooksHeaderProps {
  general: General;
}

const Container = styled.header`
`

const Title = styled.h1`
  visibility: hidden;
  height: 0;
  width: 0;
`

const BooksHeader: FC<BooksHeaderProps> = ({general}) => {
  return (
    <Container>
      <Title>La Fabrique Populaire</Title>
      <Link href={'/livres'}><a><Banner banner={general.banner!} logoLg={general.logoLg!}/></a></Link>
      <BooksHeaderNav logo={general.logo!} general={general}/>
    </Container>
  )
}

export default BooksHeader;
