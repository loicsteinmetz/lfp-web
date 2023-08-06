import styled from 'styled-components';
import {Colors} from '../theme/colors';
import Link from 'next/link';

export interface LabelProps {
  label: string;
  url?: string;
  type?: 'primary' | 'grey';
}

const Text = styled.p<{type?: 'primary' | 'grey'}>`
  display: inline-block;
  padding: 4px 7px 3px 7px;
  font-size: 13px;
  background-color: ${({type}) => type === 'primary' ? Colors.PRIMARY['500'] : 'transparent'};
  color: ${({type}) => type === 'primary' ? Colors.GREY['0'] : Colors.GREY['500']};;
  border: 1px solid ${({type}) => type === 'primary' ? Colors.PRIMARY['500'] : Colors.GREY['500']};;
  font-weight: bold;
  
  &:hover {
    background-color: ${({type}) => type === 'primary' ? Colors.GREY['0'] : Colors.GREY['500']};;
    color: ${({type}) => type === 'primary' ? Colors.PRIMARY['500'] : Colors.GREY['0']};;
    cursor: pointer;
  }
`

const Label = ({label, url, type = 'primary'}: LabelProps) => {
  return url ? (
    <Link href={url}><Text type={type}>{label}</Text></Link>
  ) : <Text type={type}>{label}</Text>
}

export default Label;
