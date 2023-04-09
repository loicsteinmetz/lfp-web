import { Html, Head, Main, NextScript } from 'next/document'
import {Colors} from '../theme/colors';
import styled from 'styled-components';

const Loader = styled.div`
  
`

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <div id='loadingScreen' style={{
          backgroundColor: Colors.GREY['0'],
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}/>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
