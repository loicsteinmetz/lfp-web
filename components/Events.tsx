import styled from 'styled-components';
import EventsList from './EventsList';
import {Spacings} from '../theme/spacings';
import ExpandedContainer from './ExpandedContainer';
import {Colors} from '../theme/colors';
import LFPEvent from './LFPEvent';

const EventsContainer = styled.div`
  height: 100px;
  margin-bottom: ${Spacings.S3};
  background-color: ${Colors.GREY['25']};
  padding: 0 ${Spacings.S2};
  display: flex;
  gap: ${Spacings.S2};
`

const Events = () => {
  return (
    <ExpandedContainer>
      <EventsContainer>
        <EventsList events={[1, 2, 3, 4, 5, 6, 7, 8, 9]}/>
        <LFPEvent />
      </EventsContainer>
    </ExpandedContainer>
  )
}

export default Events;
