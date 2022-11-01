import styled from 'styled-components';

export interface IconProps {
  size: string;
  alt: string;
}

export interface GeneralIconProps extends IconProps {
  src: string;
}

const Container = styled.div<{width: string}>`
  height: ${({width}) => width};
  aspect-ratio: 1;
`

const Icon = ({size, alt, src}: GeneralIconProps) => {
  return (
    <Container width={size}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} height="100%" width="100%"/>
    </Container>
  )
}

export default Icon;
