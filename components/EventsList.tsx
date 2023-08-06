import styled from 'styled-components';
import {Spacings} from '../theme/spacings';
import Event from './Event';
import {Colors} from '../theme/colors';

interface EventsListProps {
  events: any[];
}

const EventsListContainer = styled.div`
  display: flex;
  gap: ${Spacings.S1};
  overflow: hidden;
  width: 100%;
`

const EventsList = ({events}: EventsListProps) => {
  return (
    <EventsListContainer>
      {events.map((e, i) => (
        <Event event={e} key={`event-${i}`} />
      ))}
    </EventsListContainer>
  )
}

export default EventsList;
