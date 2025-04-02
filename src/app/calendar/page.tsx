'use client'

import { useState } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import { useStore } from '@/lib/store'

const locales = {
  'en-US': require('date-fns/locale/en-US'),
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  type: 'test' | 'sample' | 'report'
  status: string
  testId?: string
  sampleId?: string
  clientName?: string
  technicianName?: string
  description?: string
}

export default function CalendarPage() {
  const { tests, samples, reports } = useStore()
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Convert tests, samples, and reports to calendar events
  const events: CalendarEvent[] = [
    ...tests.map((test) => ({
      id: test.id,
      title: test.name,
      start: new Date(test.dueDate),
      end: new Date(test.dueDate),
      type: 'test' as const,
      status: test.status,
      testId: test.id,
      sampleId: test.sampleId,
      description: test.notes,
    })),
    // Add sample and report events here when needed
  ]

  const handleEventSelect = (event: CalendarEvent) => {
    setSelectedEvent(event)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setSelectedEvent(null)
  }

  return (
    <Box sx={{ p: 3, height: 'calc(100vh - 100px)' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h4">Calendar</Typography>
      </Stack>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleEventSelect}
        style={{ height: '100%' }}
      />

      <Dialog open={isDialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            Event Details
            <IconButton edge="end" onClick={handleCloseDialog}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent dividers>
          {selectedEvent && (
            <Stack spacing={2}>
              <TextField
                label="Title"
                value={selectedEvent.title}
                fullWidth
                InputProps={{ readOnly: true }}
              />
              <TextField
                label="Type"
                value={selectedEvent.type}
                fullWidth
                InputProps={{ readOnly: true }}
              />
              <TextField
                label="Status"
                value={selectedEvent.status}
                fullWidth
                InputProps={{ readOnly: true }}
              />
              {selectedEvent.description && (
                <TextField
                  label="Description"
                  value={selectedEvent.description}
                  fullWidth
                  multiline
                  rows={4}
                  InputProps={{ readOnly: true }}
                />
              )}
              {selectedEvent.clientName && (
                <TextField
                  label="Client"
                  value={selectedEvent.clientName}
                  fullWidth
                  InputProps={{ readOnly: true }}
                />
              )}
              {selectedEvent.technicianName && (
                <TextField
                  label="Technician"
                  value={selectedEvent.technicianName}
                  fullWidth
                  InputProps={{ readOnly: true }}
                />
              )}
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
