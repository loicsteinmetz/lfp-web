import styled from 'styled-components';
import {Colors} from '../theme/colors';
import {Spacings} from '../theme/spacings';

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${Colors.GREY['200']};
  margin: ${Spacings.S3} 0;
`

const Divider = () => {
  return (
    <Line/>
  )
}

export default Divider;
