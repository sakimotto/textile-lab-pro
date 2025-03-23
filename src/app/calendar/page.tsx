'use client';

import { useState } from 'react';
import CalendarComponent from '@/components/calendar/CalendarComponent';
import EventDialog from '@/components/calendar/EventDialog';
import { AnyEvent } from '@/types/calendar';

// TODO: Replace with actual data fetching
const mockEvents: AnyEvent[] = [
  {
    id: '1',
    title: 'Tensile Strength Test',
    start: new Date(2025, 0, 20, 10, 0),
    end: new Date(2025, 0, 20, 12, 0),
    type: 'test',
    status: 'pending',
    testId: 'TEST001',
    sampleId: 'SAMPLE001',
    clientName: 'Acme Textiles',
    technicianName: 'John Doe',
    description: 'Tensile strength testing for cotton fabric samples',
  },
  {
    id: '2',
    title: 'Equipment Calibration',
    start: new Date(2025, 0, 21, 14, 0),
    end: new Date(2025, 0, 21, 16, 0),
    type: 'maintenance',
    status: 'scheduled',
    equipmentId: 'EQ001',
    equipmentName: 'Tensile Tester',
    technicianName: 'Jane Smith',
    description: 'Regular calibration of tensile testing equipment',
  },
  {
    id: '3',
    title: 'Client Meeting - FashionCo',
    start: new Date(2025, 0, 22, 9, 0),
    end: new Date(2025, 0, 22, 10, 0),
    type: 'client-visit',
    status: 'confirmed',
    clientId: 'CLIENT001',
    clientName: 'FashionCo',
    purpose: 'Discuss new testing requirements',
    description: 'Meeting with FashionCo to discuss upcoming testing projects',
  },
];

export default function CalendarPage() {
  const [events, setEvents] = useState<AnyEvent[]>(mockEvents);
  const [selectedEvent, setSelectedEvent] = useState<AnyEvent | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEventSelect = (event: AnyEvent) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };

  const handleEventAdd = (start: Date, end: Date) => {
    // TODO: Implement event creation dialog
    console.log('Add event:', { start, end });
  };

  const handleRangeChange = (start: Date, end: Date) => {
    // TODO: Fetch events for the selected date range
    console.log('Range changed:', { start, end });
  };

  const handleEventSave = (event: AnyEvent) => {
    setEvents(events.map((e) => (e.id === event.id ? event : e)));
    setIsDialogOpen(false);
  };

  const handleEventDelete = (event: AnyEvent) => {
    setEvents(events.filter((e) => e.id !== event.id));
    setIsDialogOpen(false);
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Laboratory Calendar</h1>
        <p className="text-gray-600">
          Manage test schedules, maintenance, and client visits
        </p>
      </div>

      <CalendarComponent
        events={events}
        onEventSelect={handleEventSelect}
        onRangeChange={handleRangeChange}
        onEventAdd={handleEventAdd}
      />

      <EventDialog
        event={selectedEvent}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleEventSave}
        onDelete={handleEventDelete}
      />
    </div>
  );
}
