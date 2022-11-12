import styled from 'styled-components';
import {Colors} from '../theme/colors';
import {Devices} from '../theme/breakpoints';

type IconType = 'menu' | 'quit' | 'youtube' | 'facebook' | 'mail' | 'avatar' | 'twitter' | 'instagram';

interface IconProps {
  icon: IconType;
  color?: string;
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
const YoutubeIcon = ({color}: SvgIconProps) => <svg fill={color} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="48px" height="48px">
  <path
    d="M 2.488281 3.011719 C 1.664063 3.011719 0.988281 3.6875 0.988281 4.511719 L 0.988281 11.511719 C 0.988281 12.335938 1.664063 13.011719 2.488281 13.011719 L 13.488281 13.011719 C 14.308594 13.011719 14.988281 12.335938 14.988281 11.511719 L 14.988281 4.511719 C 14.988281 3.6875 14.3125 3.011719 13.488281 3.011719 Z M 2.488281 4.011719 L 13.488281 4.011719 C 13.769531 4.011719 13.988281 4.230469 13.988281 4.511719 L 13.988281 11.511719 C 13.988281 11.792969 13.769531 12.011719 13.488281 12.011719 L 2.488281 12.011719 C 2.207031 12.011719 1.988281 11.792969 1.988281 11.511719 L 1.988281 4.511719 C 1.988281 4.230469 2.207031 4.011719 2.488281 4.011719 Z M 6 4.992188 L 6 11.011719 L 11 8 Z M 7 6.757813 L 9.0625 8 L 7 9.242188 Z"/>
</svg>
const FacebookIcon = ({color}: SvgIconProps) => <svg fill={color} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="48px" height="48px">
  <path
    d="M 3.5 1 C 2.1250151 1 1 2.1250151 1 3.5 L 1 11.5 C 1 12.874985 2.1250151 14 3.5 14 L 11.5 14 C 12.874985 14 14 12.874985 14 11.5 L 14 3.5 C 14 2.1250151 12.874985 1 11.5 1 L 3.5 1 z M 3.5 2 L 11.5 2 C 12.335015 2 13 2.6649849 13 3.5 L 13 11.5 C 13 12.335015 12.335015 13 11.5 13 L 9.9042969 13 L 9.9042969 8.9667969 L 11.300781 8.9667969 L 11.509766 7.3574219 L 9.9042969 7.3574219 L 9.9042969 6.3320312 C 9.9042969 5.8660312 10.034031 5.5488281 10.707031 5.5488281 L 11.566406 5.5488281 L 11.566406 4.109375 C 11.417406 4.089375 10.907453 4.046875 10.314453 4.046875 C 9.0764531 4.046875 8.2304688 4.795875 8.2304688 6.171875 L 8.2304688 7.3574219 L 7 7.3535156 L 7 8.9628906 L 8.2304688 8.9667969 L 8.2304688 13 L 3.5 13 C 2.6649849 13 2 12.335015 2 11.5 L 2 3.5 C 2 2.6649849 2.6649849 2 3.5 2 z"/>
</svg>
const MailIcon = ({color}: SvgIconProps) => <svg fill={color} xmlns="http://www.w3.org/2000/svg" height="48" width="48">
  <path
    d="M7 40q-1.2 0-2.1-.9Q4 38.2 4 37V11q0-1.2.9-2.1Q5.8 8 7 8h34q1.2 0 2.1.9.9.9.9 2.1v26q0 1.2-.9 2.1-.9.9-2.1.9Zm17-15.1L7 13.75V37h34V13.75Zm0-3L40.8 11H7.25ZM7 13.75V11v26Z"/>
</svg>
const AvatarIcon = ({color}: SvgIconProps) => <svg fill={color} xmlns="http://www.w3.org/2000/svg" height="48" width="48">
  <path
    d="M24 23.95q-3.3 0-5.4-2.1-2.1-2.1-2.1-5.4 0-3.3 2.1-5.4 2.1-2.1 5.4-2.1 3.3 0 5.4 2.1 2.1 2.1 2.1 5.4 0 3.3-2.1 5.4-2.1 2.1-5.4 2.1ZM8 40v-4.7q0-1.9.95-3.25T11.4 30q3.35-1.5 6.425-2.25Q20.9 27 24 27q3.1 0 6.15.775 3.05.775 6.4 2.225 1.55.7 2.5 2.05.95 1.35.95 3.25V40Zm3-3h26v-1.7q0-.8-.475-1.525-.475-.725-1.175-1.075-3.2-1.55-5.85-2.125Q26.85 30 24 30t-5.55.575q-2.7.575-5.85 2.125-.7.35-1.15 1.075Q11 34.5 11 35.3Zm13-16.05q1.95 0 3.225-1.275Q28.5 18.4 28.5 16.45q0-1.95-1.275-3.225Q25.95 11.95 24 11.95q-1.95 0-3.225 1.275Q19.5 14.5 19.5 16.45q0 1.95 1.275 3.225Q22.05 20.95 24 20.95Zm0-4.5ZM24 37Z"/>
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
  }
}

const Container = styled.div<{ scale: number, tabletScale?: number, desktopScale?: number }>`
  transform: scale(${({scale}) => scale});

  @media(${Devices.TABLET}) {
    transform: scale(${({tabletScale, scale}) => tabletScale ?? scale});
  }

  @media(${Devices.DESKTOP}) {
    transform: scale(${({desktopScale, tabletScale, scale}) => desktopScale ?? (tabletScale ?? scale)});
  }
`

const Icon = ({scale = 1, icon, color = Colors.GREY['800'], tabletScale, desktopScale}: IconProps) => {
  return (
    <Container scale={scale} tabletScale={tabletScale} desktopScale={desktopScale}>
      {getIcon(icon, color)}
    </Container>
  )
}

export default Icon;
