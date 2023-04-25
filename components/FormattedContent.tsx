import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import {Colors} from '../theme/colors';
import {Spacings} from '../theme/spacings';
import {Devices} from '../theme/breakpoints';
export interface FormattedContentProps {
  content: string;
}

const Container = styled.article`
  padding: ${Spacings.S2} 0;
  color: ${Colors.GREY['800']};
  margin: -20px 0;
  
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
    line-height: 24px;
    margin: 10px 0;
  }

  a {
    text-decoration: none;
    color: ${Colors.PRIMARY['700']};
  }

  a:visited {
    color: ${Colors.PRIMARY['700']};
  }

  a:hover {
    color: ${Colors.PRIMARY['500']};
  }
  
  ul, ol {
    margin: 20px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    line-height: 20px;
  }
  
  li {
    margin-left: 20px;
  }
  
  ol li {
    list-style-type: none;
    counter-increment: item;
    
    &:before {
      content: counter(item) ". ";
      position: absolute;
      margin-left: -25px;
    }
  }
  
  ul li {
    margin-left: 20px;
    
    &:before {
      content: '';
      position: absolute;
      width: 15px;
      height: 1px;
      background-color: ${Colors.GREY['800']};
      margin-left: -25px;
      margin-top: 10px;
    }
  }

  img {
    margin-top: 25px;
    width: 100%;

    @media(${Devices.TABLET}) {
      margin-left: 10%;
      width: 80%;
    }
  }
  
  .caption {
    margin-top: 5px;
    margin-bottom: 25px;
    text-align: center;
    font-size: 12px;
    font-style: italic;
    color: ${Colors.GREY['700']};
  }

  blockquote p {
    font-weight: bold;
    font-size: 20px;
    font-style: italic;
    color: ${Colors.PRIMARY['500']};
    border-top: 1px solid ${Colors.PRIMARY['500']};
    border-bottom: 1px solid ${Colors.PRIMARY['500']};
    padding: 15px 10px 15px 10px;
    line-height: 25px;
    margin: 25px 0;
    text-align: center;
  }
  
  hr {
    border-width: 0;
    height: 1px;
    background-color: ${Colors.GREY['200']};
    margin: ${Spacings.S3} 0;
  }
  
  pre {
    white-space: pre-wrap;
    font-size: 13px;
    line-height: 16px;
    color: ${Colors.GREY['500']};
  }
`

const FormattedContent = ({content}: FormattedContentProps) => {
  return (
    <Container>
      <ReactMarkdown
        components={{
          // eslint-disable-next-line @next/next/no-img-element
          img: ({alt, src}) => <><img alt={alt} src={src}/><p className={'caption'}>{alt}</p></>
        }}
      >
        {content}
      </ReactMarkdown>
    </Container>
  )
}

export default FormattedContent;
