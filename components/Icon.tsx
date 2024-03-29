import styled from 'styled-components';
import {Colors} from '../theme/colors';
import {Devices} from '../theme/breakpoints';
import {useState} from 'react';

type IconType = 'menu' | 'quit' | 'youtube' | 'facebook' | 'mail' | 'avatar' | 'twitter' | 'instagram' | 'book' | 'back' | 'share';

interface IconProps {
  icon: IconType;
  color?: string;
  hoverColor?: string;
  scale?: number;
  tabletScale?: number;
  desktopScale?: number;
}

interface SvgIconProps {
  color: string;
}

const MenuIcon = ({color}: SvgIconProps) => <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" fill={color}>
  <path d="M6 36v-3h36v3Zm0-10.5v-3h36v3ZM6 15v-3h36v3Z"/>
</svg>
const QuitIcon = ({color}: SvgIconProps) => <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" fill={color} viewBox="0 0 48 48">
  <path d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z"/>
</svg>
const YoutubeIcon = ({color}: SvgIconProps) => <svg fill={color} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48px" height="48px">
  <path
    d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z"/>
</svg>
const FacebookIcon = ({color}: SvgIconProps) => <svg fill={color} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48px" height="48px">
  <path
    d="M19,3H5C3.895,3,3,3.895,3,5v14c0,1.105,0.895,2,2,2h7.621v-6.961h-2.343v-2.725h2.343V9.309 c0-2.324,1.421-3.591,3.495-3.591c0.699-0.002,1.397,0.034,2.092,0.105v2.43h-1.428c-1.13,0-1.35,0.534-1.35,1.322v1.735h2.7 l-0.351,2.725h-2.365V21H19c1.105,0,2-0.895,2-2V5C21,3.895,20.105,3,19,3z"/>
</svg>
const MailIcon = ({color}: SvgIconProps) => <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
  <path fill={color}
        d="M40 8h-32c-2.21 0-3.98 1.79-3.98 4l-.02 24c0 2.21 1.79 4 4 4h32c2.21 0 4-1.79 4-4v-24c0-2.21-1.79-4-4-4zm0 8l-16 10-16-10v-4l16 10 16-10v4z"/>
  <path d="M0 0h48v48h-48z" fill="none"/>
</svg>
const AvatarIcon = ({color}: SvgIconProps) => <svg fill={color} xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 48 48">
  <path
    d="M24 23.95q-3.3 0-5.4-2.1-2.1-2.1-2.1-5.4 0-3.3 2.1-5.4 2.1-2.1 5.4-2.1 3.3 0 5.4 2.1 2.1 2.1 2.1 5.4 0 3.3-2.1 5.4-2.1 2.1-5.4 2.1ZM8 40v-4.7q0-1.9.95-3.25T11.4 30q3.35-1.5 6.425-2.25Q20.9 27 24 27q3.1 0 6.15.775 3.05.775 6.4 2.225 1.55.7 2.5 2.05.95 1.35.95 3.25V40Zm3-3h26v-1.7q0-.8-.475-1.525-.475-.725-1.175-1.075-3.2-1.55-5.85-2.125Q26.85 30 24 30t-5.55.575q-2.7.575-5.85 2.125-.7.35-1.15 1.075Q11 34.5 11 35.3Zm13-16.05q1.95 0 3.225-1.275Q28.5 18.4 28.5 16.45q0-1.95-1.275-3.225Q25.95 11.95 24 11.95q-1.95 0-3.225 1.275Q19.5 14.5 19.5 16.45q0 1.95 1.275 3.225Q22.05 20.95 24 20.95Zm0-4.5ZM24 37Z"/>
</svg>
const InstagramIcon = ({color}: SvgIconProps) => <svg fill={color} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48px" height="48px">
  <path
    d="M 8 3 C 5.239 3 3 5.239 3 8 L 3 16 C 3 18.761 5.239 21 8 21 L 16 21 C 18.761 21 21 18.761 21 16 L 21 8 C 21 5.239 18.761 3 16 3 L 8 3 z M 18 5 C 18.552 5 19 5.448 19 6 C 19 6.552 18.552 7 18 7 C 17.448 7 17 6.552 17 6 C 17 5.448 17.448 5 18 5 z M 12 7 C 14.761 7 17 9.239 17 12 C 17 14.761 14.761 17 12 17 C 9.239 17 7 14.761 7 12 C 7 9.239 9.239 7 12 7 z M 12 9 A 3 3 0 0 0 9 12 A 3 3 0 0 0 12 15 A 3 3 0 0 0 15 12 A 3 3 0 0 0 12 9 z"/>
</svg>
const TwitterIcon = ({color}: SvgIconProps) => <svg fill={color} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48px" height="48px">
  <path
    d="M22,3.999c-0.78,0.463-2.345,1.094-3.265,1.276c-0.027,0.007-0.049,0.016-0.075,0.023c-0.813-0.802-1.927-1.299-3.16-1.299 c-2.485,0-4.5,2.015-4.5,4.5c0,0.131-0.011,0.372,0,0.5c-3.353,0-5.905-1.756-7.735-4c-0.199,0.5-0.286,1.29-0.286,2.032 c0,1.401,1.095,2.777,2.8,3.63c-0.314,0.081-0.66,0.139-1.02,0.139c-0.581,0-1.196-0.153-1.759-0.617c0,0.017,0,0.033,0,0.051 c0,1.958,2.078,3.291,3.926,3.662c-0.375,0.221-1.131,0.243-1.5,0.243c-0.26,0-1.18-0.119-1.426-0.165 c0.514,1.605,2.368,2.507,4.135,2.539c-1.382,1.084-2.341,1.486-5.171,1.486H2C3.788,19.145,6.065,20,8.347,20 C15.777,20,20,14.337,20,8.999c0-0.086-0.002-0.266-0.005-0.447C19.995,8.534,20,8.517,20,8.499c0-0.027-0.008-0.053-0.008-0.08 c-0.003-0.136-0.006-0.263-0.009-0.329c0.79-0.57,1.475-1.281,2.017-2.091c-0.725,0.322-1.503,0.538-2.32,0.636 C20.514,6.135,21.699,4.943,22,3.999z"/>
</svg>
const BookIcon = ({color}: SvgIconProps) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80.16 74.39" width="48px" height="48px">
  <path fill="none"
        d="m10.05,6.11c-1.22.1-1.86.18-2.51.2Q.09,6.48.08,13.85c0,18.15.11,36.31-.08,54.46-.05,4.56,1.47,6.12,6.06,6.09,22.65-.17,45.3-.17,67.95,0,4.5.03,6.2-1.36,6.15-6.01-.2-17.65-.13-35.3-.06-52.96.04-10.19-.26-9.08-8.9-9.21-.29,0-.58-.28-.88-.42-.56-2.24-1.92-5.21-3.21-5.18-9.35.2-19.59-3.29-25.95,4.49-5.28-1.79-9.58-3.68-14.09-4.65-3.18-.69-6.64-.02-9.96-.16-4.19-.18-8.11-.21-7.06,5.82Z"/>
  <path fill={color}
        d="m10.05,6.11C9.01.07,12.92.11,17.12.29c3.32.14,6.71.29,9.96.16C38.37,0,34.73-.46,41.16,5.1,47.53-2.68,57.76.81,67.11.61c1.3-.03,2.65,2.94,3.21,5.18.29.15.58.42.88.42,8.64.13,8.94-.98,8.9,9.21-.08,17.65-.14,35.31.06,52.96.05,4.65-1.64,6.04-6.15,6.01-22.65-.16-45.3-.17-67.95,0-4.59.03-6.11-1.53-6.06-6.09C.19,50.15.08,32,.08,13.85q0-7.37,7.46-7.54c.65-.02,1.3-.1,2.51-.2Zm27.01,53.55c0-14.37.09-29.35-.05-44.33-.04-4.87-3.25-8.47-7.84-8.85-4.24-.35-8.52-.07-12.72-.07v51.36c6.94.64,13.48,1.24,20.61,1.9Zm6.05.04c7.08-.68,13.9-1.33,20.56-1.97V6.35c-4.24,0-8.08-.17-11.89.04-5,.28-8.55,3.64-8.61,8.64-.17,15.14-.06,30.27-.06,44.67Zm-8.8,8.39c.14-.51.28-1.01.42-1.52-2.39-.75-4.74-1.91-7.19-2.15-3.8-.37-7.67-.33-11.48-.05-4.6.33-6.14-1.5-6.07-6.07.21-14.15.1-28.31.06-42.47-.01-3.51-.11-3.51-3.73-2.74v55h27.98ZM73.97,12.79c-4.25-1.47-3.9,1.16-3.9,3.54.01,14.15-.09,28.31.07,42.46.05,4.09-1.41,5.79-5.54,5.56-3.98-.22-8.02-.33-11.98.07-2.47.25-4.83,1.53-7.24,2.35.16.38.32.75.48,1.13h28.11V12.79Z"/>
</svg>
const BackIcon = ({color}: SvgIconProps) => <svg viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" width="48px" height="48px">
  <path className="st0" fill={color}
        d="M217,129.88c-6.25-6.25-16.38-6.25-22.63,0L79.61,244.64c-0.39,0.39-0.76,0.8-1.11,1.23    c-0.11,0.13-0.2,0.27-0.31,0.41c-0.21,0.28-0.42,0.55-0.62,0.84c-0.14,0.21-0.26,0.43-0.39,0.64c-0.14,0.23-0.28,0.46-0.41,0.7    c-0.13,0.24-0.24,0.48-0.35,0.73c-0.11,0.23-0.22,0.45-0.32,0.68c-0.11,0.26-0.19,0.52-0.28,0.78c-0.08,0.23-0.17,0.46-0.24,0.69    c-0.09,0.29-0.15,0.58-0.22,0.86c-0.05,0.22-0.11,0.43-0.16,0.65c-0.08,0.38-0.13,0.76-0.17,1.14c-0.02,0.14-0.04,0.27-0.06,0.41    c-0.11,1.07-0.11,2.15,0,3.22c0.01,0.06,0.02,0.12,0.03,0.18c0.05,0.46,0.12,0.92,0.21,1.37c0.03,0.13,0.07,0.26,0.1,0.39    c0.09,0.38,0.18,0.76,0.29,1.13c0.04,0.13,0.09,0.26,0.14,0.4c0.12,0.36,0.25,0.73,0.4,1.09c0.05,0.11,0.1,0.21,0.15,0.32    c0.17,0.37,0.34,0.74,0.53,1.1c0.04,0.07,0.09,0.14,0.13,0.21c0.21,0.38,0.44,0.76,0.68,1.13c0.02,0.03,0.04,0.06,0.06,0.09    c0.55,0.81,1.18,1.58,1.89,2.29l114.81,114.81c3.12,3.12,7.22,4.69,11.31,4.69s8.19-1.56,11.31-4.69c6.25-6.25,6.25-16.38,0-22.63    l-87.5-87.5h291.62c8.84,0,16-7.16,16-16s-7.16-16-16-16H129.51L217,152.5C223.25,146.26,223.25,136.13,217,129.88z"/>
</svg>

const ShareIcon = ({color}: SvgIconProps) => <svg fill={color} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                                                  viewBox="0 0 481.6 481.6" width="48px" height="48px">
  <g>
    <path d="M381.6,309.4c-27.7,0-52.4,13.2-68.2,33.6l-132.3-73.9c3.1-8.9,4.8-18.5,4.8-28.4c0-10-1.7-19.5-4.9-28.5l132.2-73.8
		c15.7,20.5,40.5,33.8,68.3,33.8c47.4,0,86.1-38.6,86.1-86.1S429,0,381.5,0s-86.1,38.6-86.1,86.1c0,10,1.7,19.6,4.9,28.5
		l-132.1,73.8c-15.7-20.6-40.5-33.8-68.3-33.8c-47.4,0-86.1,38.6-86.1,86.1s38.7,86.1,86.2,86.1c27.8,0,52.6-13.3,68.4-33.9
		l132.2,73.9c-3.2,9-5,18.7-5,28.7c0,47.4,38.6,86.1,86.1,86.1s86.1-38.6,86.1-86.1S429.1,309.4,381.6,309.4z M381.6,27.1
		c32.6,0,59.1,26.5,59.1,59.1s-26.5,59.1-59.1,59.1s-59.1-26.5-59.1-59.1S349.1,27.1,381.6,27.1z M100,299.8
		c-32.6,0-59.1-26.5-59.1-59.1s26.5-59.1,59.1-59.1s59.1,26.5,59.1,59.1S132.5,299.8,100,299.8z M381.6,454.5
		c-32.6,0-59.1-26.5-59.1-59.1c0-32.6,26.5-59.1,59.1-59.1s59.1,26.5,59.1,59.1C440.7,428,414.2,454.5,381.6,454.5z"/>
  </g>
</svg>

const getIcon = (icon: IconType, color: string) => {
  switch (icon) {
    case 'menu':
      return <MenuIcon color={color}/>;
    case 'quit':
      return <QuitIcon color={color}/>;
    case 'youtube':
      return <YoutubeIcon color={color}/>;
    case 'facebook':
      return <FacebookIcon color={color}/>;
    case 'mail':
      return <MailIcon color={color}/>;
    case 'avatar':
      return <AvatarIcon color={color}/>;
    case 'instagram':
      return <InstagramIcon color={color}/>;
    case 'twitter':
      return <TwitterIcon color={color}/>;
    case 'book':
      return <BookIcon color={color}/>;
    case 'back':
      return <BackIcon color={color}/>
    case 'share':
      return <ShareIcon color={color}/>
  }
}

const Container = styled.div<{ scale: number, tabletScale?: number, desktopScale?: number }>`
  height: ${({scale}) => 48 * scale}px;
  width: ${({scale}) => 48 * scale}px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (${Devices.TABLET}) {
    height: ${({tabletScale, scale}) => 48 * (tabletScale ?? scale)}px;
    width: ${({tabletScale, scale}) => 48 * (tabletScale ?? scale)}px;
  }

  @media (${Devices.DESKTOP}) {
    height: ${({desktopScale, tabletScale, scale}) => 48 * (desktopScale ?? tabletScale ?? scale)}px;
    width: ${({desktopScale, tabletScale, scale}) => 48 * (desktopScale ?? tabletScale ?? scale)}px;
  }
`

const Icon = ({scale = 1, icon, color = Colors.GREY['800'], hoverColor = Colors.PRIMARY['500'], tabletScale, desktopScale}: IconProps) => {
  const [displayedColor, setDisplayedColor] = useState(color);

  return (
    <Container scale={scale} tabletScale={tabletScale} desktopScale={desktopScale} onMouseEnter={() => setDisplayedColor(hoverColor)}
               onMouseLeave={() => setDisplayedColor(color)}>
      {getIcon(icon, displayedColor)}
    </Container>
  )
}

export default Icon;
