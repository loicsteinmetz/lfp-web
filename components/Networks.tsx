import styled from 'styled-components';
import Icon from './Icon';

export interface NetworksProps {
  facebookUrl?: string;
  youtubeUrl?: string;
  email?: string;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3px;
  
  a {
    outline: none;
    transition: transform 100ms;
    
    &:hover {
      transform: scale(1.1);
    }
  }
`

const SCALE = 0.5;

const Networks = ({facebookUrl, youtubeUrl, email}: NetworksProps) => {
  return (
    <Container>
      {facebookUrl && <a href={facebookUrl} target='_blank' rel='noreferrer'><Icon icon={'facebook'} scale={SCALE}/></a>}
      {youtubeUrl && <a href={youtubeUrl} target='_blank' rel='noreferrer'><Icon icon={'youtube'} scale={SCALE}/></a>}
      {email && <a href={`mailto:${email}`}><Icon icon={'mail'} scale={SCALE}/></a>}
    </Container>
  )
}

export default Networks;
