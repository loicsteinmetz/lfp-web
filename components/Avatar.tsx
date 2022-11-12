import styled from 'styled-components';
import Image from 'next/image';
import Icon from './Icon';
import {Colors} from '../theme/colors';
import {Spacings} from '../theme/spacings';
import {Devices} from '../theme/breakpoints';

export interface AvatarProps {
  picture?: LFPMedia;
  size?: 'sm' | 'lg';
}

const Rounded = styled.div<{size?: 'lg' | 'sm'}>`
  background-color: ${Colors.GREY['200']};
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 29px;
  width: 30px;
  padding-bottom: 1px;
  
  &:hover {
    cursor: pointer;
  }

  @media(${Devices.TABLET}) {
    height: ${({size}) => size === 'lg' ? '69px' : '29px'};
    width: ${({size}) => size === 'lg' ? '70px' : '30px'};
  }
`

const ImageContainer = styled.div<{size?: 'lg' | 'sm'}>`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  @media(${Devices.TABLET}) {
    width: ${({size}) => size === 'lg' ? '70px' : '30px'};
    height: ${({size}) => size === 'lg' ? '70px' : '30px'};
  }
`

const Avatar = ({picture, size = 'sm'}: AvatarProps) => {
  return picture
    ? (
      <Rounded size={size}>
        <ImageContainer size={size}>
        <Image src={picture.url} alt={picture.alternativeText} height={picture.height} width={picture.width}/>
        </ImageContainer>
      </Rounded>
    ) : (
      <Rounded size={size}>
        <Icon icon={'avatar'} scale={0.5} tabletScale={size === 'lg' ? 0.8 : 0.5} color={Colors.GREY['400']}/>
      </Rounded>
    )
}

export default Avatar;
