import styled from 'styled-components';
import {Colors} from '../theme/colors';

interface EventProps {
  event: any;
}

const EventContainer = styled.div`
  height: 100%;
  min-width: 200px;
  box-sizing: border-box;
  background-color: ${Colors.GREY['0']};
  border: 2px solid ${Colors.GREY['25']};

  &:hover {
    cursor: pointer;
    border: 2px solid ${Colors.GREY['100']};
  }
`

const Event = ({event}: EventProps) => {
  return (
    <EventContainer>
    </EventContainer>
  )
}

export default Event;
