import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import {Colors} from '../theme/colors';
import {Spacings} from '../theme/spacings';

export interface FormattedContentProps {
  content: string;
}

const Container = styled.article`
  padding: ${Spacings.S2} 0;
  
  h1 {
    font-size: 50px;
    line-height: 55px;
    font-weight: bold;
    margin: 20px 0;
  }

  h2 {
    font-size: 35px;
    line-height: 40px;
    font-weight: bold;
    margin: 20px 0;
  }

  h3 {
    font-size: 25px;
    line-height: 30px;
    font-weight: bold;
    margin: 20px 0;
  }

  h4 {
    font-size: 20px;
    line-height: 25px;
    font-weight: bold;
    margin: 20px 0;
  }

  p {
    font-size: 16px;
    line-height: 21px;
    margin: 10px 0;
  }

  a {
    text-decoration: none;
    ${Colors.PRIMARY['700']};
  }

  a:visited {
    ${Colors.PRIMARY['700']};
  }

  a:hover {
    ${Colors.PRIMARY['500']};
  }

  img {
    margin: 25px 0;
    width: 100%;
  }

  blockquote p {
    font-weight: bold;
    font-size: 20px;
    font-style: italic;
    color: ${Colors.PRIMARY['500']};
    border-top: 1px solid ${Colors.PRIMARY['500']};
    border-bottom: 1px solid ${Colors.PRIMARY['500']};
    padding: 15px 10px 20px 10px;
    line-height: 25px;
    margin: 25px 0;
    text-align: center;
  }
`

const FormattedContent = ({content}: FormattedContentProps) => {
  return (
    <Container>
      <ReactMarkdown>{content}</ReactMarkdown>
    </Container>
  )
}

export default FormattedContent;
