import styled from 'styled-components';
import {Colors} from '../theme/colors';
import {Devices} from '../theme/breakpoints';
import {useState} from 'react';

type IconType = 'menu' | 'quit' | 'youtube' | 'facebook' | 'mail' | 'avatar' | 'twitter' | 'instagram';

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
const QuitIcon = ({color}: SvgIconProps) => <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" fill={color}>
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
    <Container scale={scale} tabletScale={tabletScale} desktopScale={desktopScale} onMouseEnter={() => setDisplayedColor(hoverColor)} onMouseLeave={() => setDisplayedColor(color)}>
      {getIcon(icon, displayedColor)}
    </Container>
  )
}

export default Icon;
