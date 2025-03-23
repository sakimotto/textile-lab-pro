'use client';

import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { useState } from 'react';
import { AnyEvent } from '@/types/calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface CalendarComponentProps {
  events: AnyEvent[];
  onEventSelect?: (event: AnyEvent) => void;
  onRangeChange?: (start: Date, end: Date) => void;
  onEventAdd?: (start: Date, end: Date) => void;
}

export default function CalendarComponent({
  events,
  onEventSelect,
  onRangeChange,
  onEventAdd,
}: CalendarComponentProps) {
  const [view, setView] = useState(Views.MONTH);
  const [date, setDate] = useState(new Date());

  const eventStyleGetter = (event: AnyEvent) => {
    let backgroundColor = '#3174ad'; // default blue

    switch (event.type) {
      case 'test':
        switch (event.status) {
          case 'pending':
            backgroundColor = '#fbbf24'; // yellow
            break;
          case 'in-progress':
            backgroundColor = '#60a5fa'; // blue
            break;
          case 'completed':
            backgroundColor = '#34d399'; // green
            break;
          case 'failed':
            backgroundColor = '#ef4444'; // red
            break;
        }
        break;
      case 'maintenance':
        backgroundColor = '#8b5cf6'; // purple
        break;
      case 'client-visit':
        backgroundColor = '#ec4899'; // pink
        break;
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '5px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block',
      },
    };
  };

  const handleRangeChange = (range: Date[] | { start: Date; end: Date }) => {
    if (Array.isArray(range)) {
      onRangeChange?.(range[0], range[range.length - 1]);
    } else {
      onRangeChange?.(range.start, range.end);
    }
  };

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    onEventAdd?.(start, end);
  };

  return (
    <div className="h-[calc(100vh-12rem)]">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        onSelectEvent={onEventSelect}
        onRangeChange={handleRangeChange}
        onSelectSlot={handleSelectSlot}
        selectable
        view={view}
        onView={setView}
        date={date}
        onNavigate={setDate}
        eventPropGetter={eventStyleGetter}
        views={['month', 'week', 'day', 'agenda']}
        popup
        tooltipAccessor={(event) => event.description}
      />
    </div>
  );
}
