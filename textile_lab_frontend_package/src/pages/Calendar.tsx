import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Tooltip from '@mui/material/Tooltip';
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigate, useParams } from 'react-router-dom';

// Calendar Components
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

// Icons
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import BuildIcon from '@mui/icons-material/Build';
import ScienceIcon from '@mui/icons-material/Science';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import ErrorIcon from '@mui/icons-material/Error';
import CancelIcon from '@mui/icons-material/Cancel';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import LandscapeIcon from '@mui/icons-material/Landscape';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InfoIcon from '@mui/icons-material/Info';

// Mock Data
import { mockService } from '../services/mockData';
import { JobStatus, Industry } from '../types';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[10],
  },
}));

const STATUS_COLORS = {
  [JobStatus.COMPLETED]: '#4CAF50',
  [JobStatus.IN_PROGRESS]: '#2196F3',
  [JobStatus.SCHEDULED]: '#FF9800',
  [JobStatus.FAILED]: '#F44336',
  [JobStatus.CANCELLED]: '#9E9E9E'
};

const STATUS_ICONS = {
  [JobStatus.COMPLETED]: <CheckCircleIcon />,
  [JobStatus.IN_PROGRESS]: <HourglassEmptyIcon />,
  [JobStatus.SCHEDULED]: <EventIcon />,
  [JobStatus.FAILED]: <ErrorIcon />,
  [JobStatus.CANCELLED]: <CancelIcon />
};

const INDUSTRY_COLORS = {
  [Industry.AUTOMOTIVE]: '#1976D2',
  [Industry.SPORTSWEAR]: '#00C853',
  [Industry.CAMPING]: '#FF9800'
};

const INDUSTRY_ICONS = {
  [Industry.AUTOMOTIVE]: <DirectionsCarIcon />,
  [Industry.SPORTSWEAR]: <SportsSoccerIcon />,
  [Industry.CAMPING]: <LandscapeIcon />
};

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  status: JobStatus;
  equipment: string;
  technician: string;
  color: string;
}

const Calendar: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [openEventDialog, setOpenEventDialog] = useState<boolean>(false);
  const [openNewEventDialog, setOpenNewEventDialog] = useState<boolean>(false);
  const [newEventDate, setNewEventDate] = useState<Date | null>(null);
  const [technicians, setTechnicians] = useState<any[]>([]);
  const [equipment, setEquipment] = useState<any[]>([]);
  const [testMethods, setTestMethods] = useState<any[]>([]);
  const [calendarView, setCalendarView] = useState<string>('timeGridWeek');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const calendarEvents = await mockService.getCalendarEvents();
        const technicianData = await mockService.getTechnicians();
        const equipmentData = await mockService.getEquipment();
        const methodsData = await mockService.getTestMethods();
        
        setEvents(calendarEvents);
        setTechnicians(technicianData);
        setEquipment(equipmentData);
        setTestMethods(methodsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching calendar data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEventClick = (info: any) => {
    const event = events.find(e => e.id === info.event.id);
    if (event) {
      setSelectedEvent(event);
      setOpenEventDialog(true);
    }
  };

  const handleDateClick = (info: any) => {
    setNewEventDate(info.date);
    setOpenNewEventDialog(true);
  };

  const handleCloseEventDialog = () => {
    setOpenEventDialog(false);
    setSelectedEvent(null);
  };

  const handleCloseNewEventDialog = () => {
    setOpenNewEventDialog(false);
    setNewEventDate(null);
  };

  const handleViewJobDetails = () => {
    if (selectedEvent) {
      navigate(`/jobs/${selectedEvent.id}`);
    }
    handleCloseEventDialog();
  };

  const handleCreateJob = () => {
    // In a real application, this would create a new job
    handleCloseNewEventDialog();
    // Show success message or navigate to the new job
  };

  const handleViewChange = (view: string) => {
    setCalendarView(view);
  };

  if (loading) {
    return (
      <Box sx={{ width: '100%', mt: 4 }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Test Schedule Calendar
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setOpenNewEventDialog(true)}
        >
          Schedule New Test
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box>
            <Button 
              variant={calendarView === 'dayGridMonth' ? 'contained' : 'outlined'} 
              onClick={() => handleViewChange('dayGridMonth')}
              sx={{ mr: 1 }}
            >
              Month
            </Button>
            <Button 
              variant={calendarView === 'timeGridWeek' ? 'contained' : 'outlined'} 
              onClick={() => handleViewChange('timeGridWeek')}
              sx={{ mr: 1 }}
            >
              Week
            </Button>
            <Button 
              variant={calendarView === 'timeGridDay' ? 'contained' : 'outlined'} 
              onClick={() => handleViewChange('timeGridDay')}
              sx={{ mr: 1 }}
            >
              Day
            </Button>
            <Button 
              variant={calendarView === 'listWeek' ? 'contained' : 'outlined'} 
              onClick={() => handleViewChange('listWeek')}
            >
              List
            </Button>
          </Box>
          <Box>
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              sx={{ mr: 1 }}
            >
              Filter
            </Button>
            <TextField
              placeholder="Search tests..."
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>

        <Box sx={{ height: 'calc(100vh - 250px)', minHeight: '600px' }}>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            initialView={calendarView}
            headerToolbar={false}
            events={events}
            eventClick={handleEventClick}
            dateClick={handleDateClick}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={true}
            allDaySlot={false}
            slotMinTime="08:00:00"
            slotMaxTime="18:00:00"
            businessHours={{
              daysOfWeek: [1, 2, 3, 4, 5], // Monday - Friday
              startTime: '08:00',
              endTime: '17:00',
            }}
            eventTimeFormat={{
              hour: '2-digit',
              minute: '2-digit',
              meridiem: false,
              hour12: false
            }}
            eventContent={(eventInfo) => {
              return (
                <Tooltip title={`${eventInfo.event.title} - ${eventInfo.event.extendedProps.technician} - ${eventInfo.event.extendedProps.equipment}`}>
                  <Box sx={{ 
                    p: 0.5, 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    fontSize: '0.85rem',
                    lineHeight: 1.2
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {STATUS_ICONS[eventInfo.event.extendedProps.status as JobStatus]}
                      <Typography variant="caption" sx={{ ml: 0.5, fontWeight: 'bold' }}>
                        {eventInfo.event.title}
                      </Typography>
                    </Box>
                    <Typography variant="caption" sx={{ display: 'block' }}>
                      {eventInfo.event.extendedProps.technician}
                    </Typography>
                    <Typography variant="caption" sx={{ display: 'block' }}>
                      {eventInfo.event.extendedProps.equipment}
                    </Typography>
                  </Box>
                </Tooltip>
              );
            }}
          />
        </Box>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardHeader 
              title="Upcoming Tests" 
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <Divider />
            <CardContent sx={{ flexGrow: 1, p: 0 }}>
              <List>
                {events
                  .filter(event => event.status === JobStatus.SCHEDULED)
                  .sort((a, b) => a.start.getTime() - b.start.getTime())
                  .slice(0, 5)
                  .map((event) => (
                    <React.Fragment key={event.id}>
                      <ListItem 
                        sx={{ cursor: 'pointer' }}
                        onClick={() => {
                          setSelectedEvent(event);
                          setOpenEventDialog(true);
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: event.color }}>
                            <EventIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary={event.title} 
                          secondary={`${event.technician} • ${event.start.toLocaleString()}`} 
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  ))}
                {events.filter(event => event.status === JobStatus.SCHEDULED).length === 0 && (
                  <ListItem>
                    <ListItemText 
                      primary="No upcoming tests" 
                      secondary="All scheduled tests have been completed" 
                    />
                  </ListItem>
                )}
              </List>
            </CardContent>
          </StyledCard>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardHeader 
              title="Available Resources" 
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <Divider />
            <CardContent sx={{ flexGrow: 1, p: 0 }}>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary="Available Technicians" 
                    secondary={`${technicians.filter(t => t.available).length} of ${technicians.length} technicians available`} 
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'secondary.main' }}>
                      <BuildIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary="Operational Equipment" 
                    secondary={`${equipment.filter(e => e.status === 'OPERATIONAL').length} of ${equipment.length} equipment operational`} 
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'info.main' }}>
                      <ScienceIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary="Active Test Methods" 
                    secondary={`${testMethods.filter(m => m.status === 'ACTIVE').length} of ${testMethods.length} test methods active`} 
                  />
                </ListItem>
              </List>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>

      {/* Event Details Dialog */}
      <Dialog
        open={openEventDialog}
        onClose={handleCloseEventDialog}
        maxWidth="sm"
        fullWidth
      >
        {selectedEvent && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: selectedEvent.color, mr: 2 }}>
                  {STATUS_ICONS[selectedEvent.status]}
                </Avatar>
                <Typography variant="h6">{selectedEvent.title}</Typography>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <EventIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body1">
                      {selectedEvent.start.toLocaleDateString()} - {selectedEvent.end.toLocaleDateString()}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <AccessTimeIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body1">
                      {selectedEvent.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {selectedEvent.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body1">
                      {selectedEvent.technician}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <BuildIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body1">
                      {selectedEvent.equipment}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <InfoIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body1">
                      Status: <Chip 
                        label={selectedEvent.status} 
                        size="small" 
                        sx={{ 
                          bgcolor: selectedEvent.color,
                          color: 'white',
                          ml: 1
                        }} 
                      />
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseEventDialog}>Close</Button>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleViewJobDetails}
              >
                View Job Details
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* New Event Dialog */}
      <Dialog
        open={openNewEventDialog}
        onClose={handleCloseNewEventDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Schedule New Test</DialogTitle>
        <DialogContent dividers>
          <DialogContentText paragraph>
            Create a new test job in the schedule.
            {newEventDate && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Selected date: {newEventDate.toLocaleDateString()} {newEventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Typography>
            )}
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Test Title"
                fullWidth
                required
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Start Date & Time"
                type="datetime-local"
                fullWidth
                defaultValue={newEventDate ? 
                  `${newEventDate.toISOString().split('T')[0]}T${newEventDate.toTimeString().slice(0, 5)}` : 
                  undefined}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="End Date & Time"
                type="datetime-local"
                fullWidth
                defaultValue={newEventDate ? 
                  `${newEventDate.toISOString().split('T')[0]}T${new Date(newEventDate.getTime() + 2 * 60 * 60 * 1000).toTimeString().slice(0, 5)}` : 
                  undefined}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Test Method"
                fullWidth
                defaultValue=""
                SelectProps={{
                  native: true,
                }}
                sx={{ mb: 2 }}
              >
                <option value="" disabled>Select a test method</option>
                {testMethods.map((method) => (
                  <option key={method.id} value={method.id}>
                    {method.name} (v{method.version})
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Industry"
                fullWidth
                defaultValue=""
                SelectProps={{
                  native: true,
                }}
                sx={{ mb: 2 }}
              >
                <option value="" disabled>Select an industry</option>
                <option value={Industry.AUTOMOTIVE}>Automotive</option>
                <option value={Industry.SPORTSWEAR}>Sportswear</option>
                <option value={Industry.CAMPING}>Camping</option>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Technician"
                fullWidth
                defaultValue=""
                SelectProps={{
                  native: true,
                }}
                sx={{ mb: 2 }}
              >
                <option value="" disabled>Select a technician</option>
                {technicians
                  .filter(tech => tech.available)
                  .map((tech) => (
                    <option key={tech.id} value={tech.id}>
                      {tech.name} - {tech.position}
                    </option>
                  ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Equipment"
                fullWidth
                defaultValue=""
                SelectProps={{
                  native: true,
                }}
                sx={{ mb: 2 }}
              >
                <option value="" disabled>Select equipment</option>
                {equipment
                  .filter(equip => equip.status === 'OPERATIONAL')
                  .map((equip) => (
                    <option key={equip.id} value={equip.id}>
                      {equip.name} - {equip.location}
                    </option>
                  ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Notes"
                fullWidth
                multiline
                rows={3}
                sx={{ mb: 2 }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNewEventDialog}>Cancel</Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleCreateJob}
          >
            Schedule Test
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Calendar;
