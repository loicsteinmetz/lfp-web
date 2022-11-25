import styled from 'styled-components';
import Icon from './Icon';
import {Colors} from '../theme/colors';

export interface NetworksProps {
  facebookUrl?: string;
  youtubeUrl?: string;
  email?: string;
  theme?: 'dark' | 'light';
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

const Networks = ({facebookUrl, youtubeUrl, email, theme = 'dark'}: NetworksProps) => {
  return (
    <Container>
      {facebookUrl && <a href={facebookUrl} target='_blank' rel='noreferrer'>
        <Icon icon={'facebook'} scale={SCALE}
              color={theme === 'dark' ? Colors.GREY['800'] : Colors.GREY['25']}/>
      </a>}
      {youtubeUrl && <a href={youtubeUrl} target='_blank' rel='noreferrer'>
        <Icon icon={'youtube'} scale={SCALE}
              color={theme === 'dark' ? Colors.GREY['800'] : Colors.GREY['25']}/>
      </a>}
      {email && <a href={`mailto:${email}`}>
        <Icon icon={'mail'} scale={SCALE}
              color={theme === 'dark' ? Colors.GREY['800'] : Colors.GREY['25']}/>
      </a>}
    </Container>
  )
}

export default Networks;
