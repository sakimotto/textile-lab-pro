import { Test } from '@prisma/client';

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  resource?: any;
  type: 'test' | 'maintenance' | 'client-visit';
  status: string;
  description?: string;
}

export interface TestEvent extends CalendarEvent {
  type: 'test';
  testId: string;
  sampleId: string;
  clientName: string;
  technicianName?: string;
}

export interface MaintenanceEvent extends CalendarEvent {
  type: 'maintenance';
  equipmentId: string;
  equipmentName: string;
  technicianName: string;
}

export interface ClientVisitEvent extends CalendarEvent {
  type: 'client-visit';
  clientId: string;
  clientName: string;
  purpose: string;
}

export type AnyEvent = TestEvent | MaintenanceEvent | ClientVisitEvent;
