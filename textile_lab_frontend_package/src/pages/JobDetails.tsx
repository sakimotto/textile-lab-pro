import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import IconButton from '@mui/material/IconButton';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Avatar from '@mui/material/Avatar';
import LinearProgress from '@mui/material/LinearProgress';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

// Icons
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
import ChatIcon from '@mui/icons-material/Chat';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import PendingIcon from '@mui/icons-material/Pending';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CancelIcon from '@mui/icons-material/Cancel';
import ScienceIcon from '@mui/icons-material/Science';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import BarChartIcon from '@mui/icons-material/BarChart';

import { JobStatus, Industry } from '../types';

const HeaderBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
}));

const StatusChip = styled(Chip)(({ theme, status }: { theme: any, status: JobStatus }) => {
  let color;
  let icon;
  
  switch (status) {
    case JobStatus.SCHEDULED:
      color = theme.palette.info.main;
      icon = <ScheduleIcon />;
      break;
    case JobStatus.IN_PROGRESS:
      color = theme.palette.primary.main;
      icon = <PendingIcon />;
      break;
    case JobStatus.COMPLETED:
      color = theme.palette.success.main;
      icon = <CheckCircleIcon />;
      break;
    case JobStatus.FAILED:
      color = theme.palette.error.main;
      icon = <ErrorIcon />;
      break;
    case JobStatus.CANCELLED:
      color = theme.palette.grey[500];
      icon = <CancelIcon />;
      break;
    default:
      color = theme.palette.grey[500];
      icon = <PendingIcon />;
  }
  
  return {
    backgroundColor: `${color}10`,
    color: color,
    borderColor: color,
    '& .MuiChip-icon': {
      color: color,
    },
  };
});

// Mock job data
const jobData = {
  id: 'JOB-2025-0342',
  title: 'Automotive Fabric Flammability Test',
  description: 'Testing the flammability resistance of automotive interior fabrics according to ASTM D6413 and ISO 3795 standards.',
  status: JobStatus.IN_PROGRESS,
  priority: 'High',
  testMethod: 'Automotive Fabric Flammability Test v2.3',
  scheduledStart: new Date('2025-03-23T09:00:00'),
  scheduledEnd: new Date('2025-03-23T11:00:00'),
  actualStart: new Date('2025-03-23T09:15:00'),
  actualEnd: null,
  equipment: 'SDL Atlas Flammability Tester',
  technician: 'John Doe',
  industry: Industry.AUTOMOTIVE,
  progress: 65,
  samples: [
    {
      id: 'S001',
      name: 'Sample A - Polyester Blend',
      material: 'Polyester/Cotton Blend (65/35)',
      dimensions: { length: 300, width: 100, thickness: 2 },
      preparation: 'Conditioned at 23°C and 50% RH for 24 hours',
      notes: 'From supplier batch #B2025-03-15'
    },
    {
      id: 'S002',
      name: 'Sample B - Nylon Fabric',
      material: 'Nylon 6,6',
      dimensions: { length: 300, width: 100, thickness: 1.5 },
      preparation: 'Conditioned at 23°C and 50% RH for 24 hours',
      notes: 'From supplier batch #B2025-03-16'
    },
    {
      id: 'S003',
      name: 'Sample C - FR Treated Fabric',
      material: 'FR Treated Polyester',
      dimensions: { length: 300, width: 100, thickness: 2.2 },
      preparation: 'Conditioned at 23°C and 50% RH for 24 hours',
      notes: 'From supplier batch #B2025-03-17'
    }
  ],
  parameters: {
    temperature: '23°C',
    humidity: '50%',
    flameApplicationTime: '12 seconds',
    specimenOrientation: 'Vertical',
    airFlow: 'None'
  },
  steps: [
    {
      id: '1',
      name: 'Sample Preparation',
      description: 'Cut samples to 300mm x 100mm dimensions and condition at 23°C and 50% RH for 24 hours.',
      status: 'completed',
      duration: 1440, // minutes
      completedAt: new Date('2025-03-22T09:00:00')
    },
    {
      id: '2',
      name: 'Equipment Setup',
      description: 'Prepare the flammability tester according to ASTM D6413 specifications.',
      status: 'completed',
      duration: 30,
      completedAt: new Date('2025-03-23T09:30:00')
    },
    {
      id: '3',
      name: 'Test Execution',
      description: 'Mount each specimen in the holder, apply flame for 12 seconds, and record flame spread.',
      status: 'in_progress',
      duration: 60,
      completedAt: null
    },
    {
      id: '4',
      name: 'Data Analysis',
      description: 'Calculate char length, afterflame time, and afterglow time for each specimen.',
      status: 'pending',
      duration: 30,
      completedAt: null
    },
    {
      id: '5',
      name: 'Report Generation',
      description: 'Compile test results and generate final report with compliance assessment.',
      status: 'pending',
      duration: 60,
      completedAt: null
    }
  ],
  results: [
    {
      sampleId: 'S001',
      parameters: {
        charLength: '76 mm',
        afterflameTime: '2.3 seconds',
        afterglowTime: '0 seconds'
      },
      status: 'completed',
      notes: 'Sample passed the test criteria'
    },
    {
      sampleId: 'S002',
      parameters: {
        charLength: '82 mm',
        afterflameTime: '3.1 seconds',
        afterglowTime: '1.2 seconds'
      },
      status: 'completed',
      notes: 'Sample passed the test criteria'
    },
    {
      sampleId: 'S003',
      parameters: {
        charLength: 'In progress',
        afterflameTime: 'In progress',
        afterglowTime: 'In progress'
      },
      status: 'in_progress',
      notes: 'Testing in progress'
    }
  ],
  notes: [
    {
      id: 'N001',
      content: 'Sample preparation completed according to standard. All samples conditioned for 24 hours.',
      createdBy: 'John Doe',
      createdAt: new Date('2025-03-22T09:00:00')
    },
    {
      id: 'N002',
      content: 'Equipment calibration verified before testing. All parameters within specification.',
      createdBy: 'John Doe',
      createdAt: new Date('2025-03-23T09:15:00')
    },
    {
      id: 'N003',
      content: 'Sample A and B testing completed. Results within expected range. Proceeding with Sample C.',
      createdBy: 'John Doe',
      createdAt: new Date('2025-03-23T10:30:00')
    }
  ],
  attachments: [
    {
      id: 'A001',
      name: 'Test Method Procedure.pdf',
      type: 'application/pdf',
      url: '#',
      createdBy: 'System',
      createdAt: new Date('2025-03-22T08:00:00')
    },
    {
      id: 'A002',
      name: 'Sample Photos.zip',
      type: 'application/zip',
      url: '#',
      createdBy: 'John Doe',
      createdAt: new Date('2025-03-22T09:30:00')
    },
    {
      id: 'A003',
      name: 'Test Data - Samples A & B.xlsx',
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      url: '#',
      createdBy: 'John Doe',
      createdAt: new Date('2025-03-23T10:45:00')
    }
  ]
};

// Function to get status icon
const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircleIcon color="success" />;
    case 'in_progress':
      return <PendingIcon color="primary" />;
    case 'pending':
      return <ScheduleIcon color="disabled" />;
    default:
      return <PendingIcon color="disabled" />;
  }
};

const JobDetails: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [note, setNote] = useState('');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleAddNote = () => {
    if (note.trim()) {
      // In a real app, this would add the note to the job
      setNote('');
    }
  };

  return (
    <>
      <HeaderBox>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography variant="h4" sx={{ mr: 2 }}>
              {jobData.title}
            </Typography>
            <StatusChip 
              label={jobData.status} 
              status={jobData.status}
              variant="outlined"
              icon={jobData.status === JobStatus.IN_PROGRESS ? <PendingIcon /> : undefined}
            />
          </Box>
          <Typography variant="body1" color="text.secondary">
            Job ID: {jobData.id} | Scheduled: {jobData.scheduledStart.toLocaleString()} - {jobData.scheduledEnd.toLocaleString()}
          </Typography>
        </Box>
        <Box>
          <Button 
            variant="outlined" 
            startIcon={<PrintIcon />}
            sx={{ mr: 2 }}
          >
            Print
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<DownloadIcon />}
          >
            Export Report
          </Button>
        </Box>
      </HeaderBox>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ mb: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab label="Overview" />
                <Tab label="Samples" />
                <Tab label="Results" />
                <Tab label="Notes & Attachments" />
              </Tabs>
            </Box>
            <Box sx={{ p: 3 }}>
              {tabValue === 0 && (
                <>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" gutterBottom>
                        Description
                      </Typography>
                      <Typography variant="body2" paragraph>
                        {jobData.description}
                      </Typography>
                      
                      <Typography variant="subtitle1" gutterBottom>
                        Test Method
                      </Typography>
                      <Typography variant="body2" paragraph>
                        {jobData.testMethod}
                      </Typography>
                      
                      <Typography variant="subtitle1" gutterBottom>
                        Parameters
                      </Typography>
                      <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
                        <Table size="small">
                          <TableBody>
                            {Object.entries(jobData.parameters).map(([key, value]) => (
                              <TableRow key={key}>
                                <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                                  {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                                </TableCell>
                                <TableCell>{value}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" gutterBottom>
                        Progress
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={jobData.progress} 
                          sx={{ flexGrow: 1, mr: 2, height: 10, borderRadius: 5 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {jobData.progress}%
                        </Typography>
                      </Box>
                      
                      <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>
                        Details
                      </Typography>
                      <TableContainer component={Paper} variant="outlined">
                        <Table size="small">
                          <TableBody>
                            <TableRow>
                              <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                                Industry
                              </TableCell>
                              <TableCell>
                                <Chip 
                                  label={jobData.industry} 
                                  size="small" 
                                  color="primary" 
                                  variant="outlined"
                                />
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                                Priority
                              </TableCell>
                              <TableCell>
                                <Chip 
                                  label={jobData.priority} 
                                  size="small" 
                                  color="error" 
                                  variant="outlined"
                                />
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                                Equipment
                              </TableCell>
                              <TableCell>{jobData.equipment}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                                Technician
                              </TableCell>
                              <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <Avatar sx={{ width: 24, height: 24, mr: 1 }}>JD</Avatar>
                                  {jobData.technician}
                                </Box>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                                Scheduled Start
                              </TableCell>
                              <TableCell>{jobData.scheduledStart.toLocaleString()}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                                Scheduled End
                              </TableCell>
                              <TableCell>{jobData.scheduledEnd.toLocaleString()}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                                Actual Start
                              </TableCell>
                              <TableCell>{jobData.actualStart?.toLocaleString() || 'Not started'}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                                Actual End
                              </TableCell>
                              <TableCell>{jobData.actualEnd?.toLocaleString() || 'In progress'}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  </Grid>
                  
                  <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                    Test Procedure Steps
                  </Typography>
                  <Stepper activeStep={2} orientation="vertical">
                    {jobData.steps.map((step, index) => (
                      <Step key={step.id} completed={step.status === 'completed'}>
                        <StepLabel 
                          StepIconProps={{ 
                            icon: getStatusIcon(step.status)
                          }}
                        >
                          <Typography variant="subtitle1">
                            {step.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {step.description}
                          </Typography>
                          <Box sx={{ display: 'flex', mt: 0.5 }}>
                            <Typography variant="caption" color="text.secondary" sx={{ mr: 2 }}>
                              Duration: {step.duration} minutes
                            </Typography>
                            {step.completedAt && (
                              <Typography variant="caption" color="text.secondary">
                                Completed: {step.completedAt.toLocaleString()}
                              </Typography>
                            )}
                          </Box>
                        </StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </>
              )}
              
              {tabValue === 1 && (
                <>
                  <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6">
                      Test Samples
                    </Typography>
                    <Button 
                      variant="outlined" 
                      startIcon={<AddIcon />}
                      size="small"
                    >
                      Add Sample
                    </Button>
                  </Box>
                  
                  {jobData.samples.map((sample) => (
                    <Card key={sample.id} sx={{ mb: 2 }}>
                      <CardHeader
                        title={sample.name}
                        subheader={`Material: ${sample.material}`}
                        action={
                          <IconButton aria-label="settings">
                            <MoreVertIcon />
                          </IconButton>
                        }
                      />
                      <Divider />
                      <CardContent>
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={6}>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                              Dimensions
                            </Typography>
                            <Typography variant="body2">
                              Length: {sample.dimensions.length} mm | 
                              Width: {sample.dimensions.width} mm | 
                              Thickness: {sample.dimensions.thickness} mm
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                              Preparation
                            </Typography>
                            <Typography variant="body2">
                              {sample.preparation}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                              Notes
                            </Typography>
                            <Typography variant="body2">
                              {sample.notes}
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  ))}
                </>
              )}
              
              {tabValue === 2 && (
                <>
                  <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6">
                      Test Results
                    </Typography>
                    <Button 
                      variant="outlined" 
                      startIcon={<BarChartIcon />}
                      size="small"
                    >
                      View Charts
                    </Button>
                  </Box>
                  
                  {jobData.results.map((result, index) => {
                    const sample = jobData.samples.find(s => s.id === result.sampleId);
                    return (
                      <Card key={result.sampleId} sx={{ mb: 2 }}>
                        <CardHeader
                          title={sample?.name || `Sample ${index + 1}`}
                          subheader={`Status: ${result.status.charAt(0).toUpperCase() + result.status.slice(1)}`}
                          action={
                            <IconButton aria-label="settings">
                              <MoreVertIcon />
                            </IconButton>
                          }
                        />
                        <Divider />
                        <CardContent>
                          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                            Test Parameters
                          </Typography>
                          <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
                            <Table size="small">
                              <TableHead>
                                <TableRow>
                                  <TableCell>Parameter</TableCell>
                                  <TableCell>Value</TableCell>
                                  <TableCell>Requirement</TableCell>
                                  <TableCell>Status</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {Object.entries(result.parameters).map(([key, value]) => (
                                  <TableRow key={key}>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                                      {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                                    </TableCell>
                                    <TableCell>{value}</TableCell>
                                    <TableCell>
                                      {key === 'charLength' ? '≤ 100 mm' : 
                                       key === 'afterflameTime' ? '≤ 5 seconds' : 
                                       key === 'afterglowTime' ? '≤ 10 seconds' : ''}
                                    </TableCell>
                                    <TableCell>
                                      {result.status === 'completed' ? (
                                        <CheckCircleIcon color="success" fontSize="small" />
                                      ) : (
                                        <PendingIcon color="primary" fontSize="small" />
                                      )}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                          
                          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                            Notes
                          </Typography>
                          <Typography variant="body2">
                            {result.notes}
                          </Typography>
                        </CardContent>
                      </Card>
                    );
                  })}
                </>
              )}
              
              {tabValue === 3 && (
                <>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" gutterBottom>
                        Notes
                      </Typography>
                      
                      <Box sx={{ mb: 3 }}>
                        <TextField
                          fullWidth
                          label="Add Note"
                          multiline
                          rows={3}
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                          variant="outlined"
                          sx={{ mb: 1 }}
                        />
                        <Button 
                          variant="contained" 
                          onClick={handleAddNote}
                          disabled={!note.trim()}
                        >
                          Add Note
                        </Button>
                      </Box>
                      
                      {jobData.notes.map((note) => (
                        <Paper key={note.id} sx={{ p: 2, mb: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Avatar sx={{ width: 24, height: 24, mr: 1 }}>
                              {note.createdBy.split(' ').map(n => n[0]).join('')}
                            </Avatar>
                            <Typography variant="subtitle2">
                              {note.createdBy}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                              {note.createdAt.toLocaleString()}
                            </Typography>
                          </Box>
                          <Typography variant="body2">
                            {note.content}
                          </Typography>
                        </Paper>
                      ))}
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" gutterBottom>
                        Attachments
                      </Typography>
                      
                      <Box sx={{ mb: 3 }}>
                        <Button 
                          variant="outlined" 
                          startIcon={<AttachFileIcon />}
                          fullWidth
                        >
                          Upload Attachment
                        </Button>
                      </Box>
                      
                      {jobData.attachments.map((attachment) => (
                        <Paper key={attachment.id} sx={{ p: 2, mb: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ flexGrow: 1 }}>
                              <Typography variant="subtitle2">
                                {attachment.name}
                              </Typography>
                              <Typography variant="caption" color="text.secondary" display="block">
                                Added by {attachment.createdBy} on {attachment.createdAt.toLocaleDateString()}
                              </Typography>
                            </Box>
                            <IconButton>
                              <DownloadIcon />
                            </IconButton>
                          </Box>
                        </Paper>
                      ))}
                    </Grid>
                  </Grid>
                </>
              )}
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardHeader 
              title="Actions" 
              titleTypographyProps={{ variant: 'h6' }}
            />
            <Divider />
            <CardContent>
              <Stack spacing={2}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth
                  startIcon={<EditIcon />}
                >
                  Update Status
                </Button>
                <Button 
                  variant="outlined" 
                  fullWidth
                  startIcon={<DescriptionIcon />}
                >
                  Generate Report
                </Button>
                <Button 
                  variant="outlined" 
                  fullWidth
                  startIcon={<ChatIcon />}
                >
                  Ask Chatbot
                </Button>
              </Stack>
            </CardContent>
          </Card>
          
          <Card sx={{ mb: 3 }}>
            <CardHeader 
              title="Related Information" 
              titleTypographyProps={{ variant: 'h6' }}
            />
            <Divider />
            <CardContent sx={{ p: 0 }}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ScienceIcon sx={{ mr: 1 }} color="primary" />
                    <Typography>Test Method Details</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" paragraph>
                    This test method evaluates the flammability characteristics of automotive interior materials when exposed to a specific ignition source.
                  </Typography>
                  <Button 
                    variant="text" 
                    size="small"
                    href="/test-methods/builder/1"
                  >
                    View Full Method
                  </Button>
                </AccordionDetails>
              </Accordion>
              
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PrecisionManufacturingIcon sx={{ mr: 1 }} color="primary" />
                    <Typography>Equipment Information</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="subtitle2">
                    SDL Atlas Flammability Tester
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Last Calibration: March 15, 2025
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Next Maintenance: April 15, 2025
                  </Typography>
                  <Button 
                    variant="text" 
                    size="small"
                    href="/equipment/4"
                  >
                    View Equipment Details
                  </Button>
                </AccordionDetails>
              </Accordion>
              
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PersonIcon sx={{ mr: 1 }} color="primary" />
                    <Typography>Technician Information</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ width: 40, height: 40, mr: 2 }}>JD</Avatar>
                    <Box>
                      <Typography variant="subtitle2">
                        John Doe
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Senior Lab Technician
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" paragraph>
                    Certified for flammability testing with 5+ years of experience.
                  </Typography>
                  <Button 
                    variant="text" 
                    size="small"
                  >
                    View Profile
                  </Button>
                </AccordionDetails>
              </Accordion>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader 
              title="Compliance Information" 
              titleTypographyProps={{ variant: 'h6' }}
            />
            <Divider />
            <CardContent>
              <Typography variant="subtitle2" gutterBottom>
                Standards
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                <Chip label="ASTM D6413" size="small" />
                <Chip label="ISO 3795" size="small" />
              </Stack>
              
              <Typography variant="subtitle2" gutterBottom>
                Certification
              </Typography>
              <Typography variant="body2" paragraph>
                This test is performed in accordance with ISO/IEC 17025 accreditation requirements.
              </Typography>
              
              <Typography variant="subtitle2" gutterBottom>
                Traceability
              </Typography>
              <Typography variant="body2">
                All equipment used in this test is calibrated with NIST traceable standards.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default JobDetails;
