import styled from 'styled-components';
import Icon from './Icon';
import {Colors} from '../theme/colors';
import {Spacings} from '../theme/spacings';

export interface NetworksProps {
  facebookUrl?: string;
  youtubeUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  email?: string;
  theme?: 'dark' | 'light';
}

const Container = styled.div`
  display: flex;
  gap: ${Spacings.S2};
  justify-content: center;
  margin-top: 3px;

  a {
    outline: none;
    transition: transform 100ms;
  }
`

const SCALE = 0.5;

const Networks = ({facebookUrl, instagramUrl, twitterUrl, youtubeUrl, email, theme = 'dark'}: NetworksProps) => {
  return (
    <Container>
      {facebookUrl && <a href={facebookUrl} target='_blank' rel='noreferrer'>
        <Icon icon={'facebook'} scale={SCALE}
              color={theme === 'dark' ? Colors.GREY['800'] : Colors.GREY['25']}
              hoverColor={theme === 'dark' ? Colors.PRIMARY['500'] : Colors.PRIMARY['100']}/>
      </a>}
      {instagramUrl && <a href={instagramUrl} target='_blank' rel='noreferrer'>
        <Icon icon={'instagram'} scale={SCALE}
              color={theme === 'dark' ? Colors.GREY['800'] : Colors.GREY['25']}
              hoverColor={theme === 'dark' ? Colors.PRIMARY['500'] : Colors.PRIMARY['100']}/>
      </a>}
      {twitterUrl && <a href={twitterUrl} target='_blank' rel='noreferrer'>
        <Icon icon={'twitter'} scale={SCALE}
              color={theme === 'dark' ? Colors.GREY['800'] : Colors.GREY['25']}
              hoverColor={theme === 'dark' ? Colors.PRIMARY['500'] : Colors.PRIMARY['100']}/>
      </a>}
      {youtubeUrl && <a href={youtubeUrl} target='_blank' rel='noreferrer'>
        <Icon icon={'youtube'} scale={SCALE}
              color={theme === 'dark' ? Colors.GREY['800'] : Colors.GREY['25']}
              hoverColor={theme === 'dark' ? Colors.PRIMARY['500'] : Colors.PRIMARY['100']}/>
      </a>}
      {email && <a href={`mailto:${email}`}>
        <Icon icon={'mail'} scale={SCALE}
              color={theme === 'dark' ? Colors.GREY['800'] : Colors.GREY['25']}
              hoverColor={theme === 'dark' ? Colors.PRIMARY['500'] : Colors.PRIMARY['100']}/>
      </a>}
    </Container>
  )
}

export default Networks;
