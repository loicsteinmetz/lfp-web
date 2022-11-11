import styled from 'styled-components';
import Image from 'next/image';
import Icon from './Icon';
import {Colors} from '../theme/colors';
import {Spacings} from '../theme/spacings';

export interface AvatarProps {
  picture?: LFPMedia;
}

const Rounded = styled.div`
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
`

const ImageContainer = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Avatar = ({picture}: AvatarProps) => {
  return picture
    ? (
      <Rounded>
        <ImageContainer>
        <Image src={picture.url} alt={picture.alternativeText} height={picture.height} width={picture.width}/>
        </ImageContainer>
      </Rounded>
    ) : (
      <Rounded>
        <Icon icon={'avatar'} scale={0.5} color={Colors.GREY['600']}/>
      </Rounded>
    )
}

export default Avatar;
