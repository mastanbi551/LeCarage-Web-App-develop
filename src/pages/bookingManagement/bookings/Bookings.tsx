// Bookings.tsx
import React from 'react';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import _ from 'lodash';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

interface IProps {
  eventsList: {
    title: string;
    start: Date;
    end: Date;
  }[];
  localizer: any;
  DnDCalendar: any;
}

const EventComponent = ({ event }: { event: any }) => {
  const tooltip = (
    <Tooltip id={event.title}>
      {event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {event.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}, {event.title}
    </Tooltip>
  );

  return (
    <OverlayTrigger overlay={tooltip} placement="top">
      <div>{event.title}</div>
    </OverlayTrigger>
  );
};

export const Bookings: React.FC<IProps> = ({
  eventsList,
  localizer,
  DnDCalendar
}) => {

  const eventComponents = eventsList.map((event, index) => ({
    ...event,
    id: index
  }));
  const tooltipAccessor = React.useCallback((event: any) => {  
   return '';   
  }, []);

  return (
    <div className='my-calendar'>
      <DnDCalendar
        defaultView='week'
        events={eventComponents}
        localizer={localizer}
        style={{ height: '500px' }} // Update the height here to a suitable value
        components={{
          event: EventComponent
        }}
        tooltipAccessor={tooltipAccessor}
      />
    </div>
  );
};
