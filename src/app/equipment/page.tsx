'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Paper,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Badge,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import HistoryIcon from '@mui/icons-material/History';
import BuildIcon from '@mui/icons-material/Build';
import WarningIcon from '@mui/icons-material/Warning';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { Equipment, mockEquipment, UsageLog, MaintenanceLog, CalibrationLog } from '@/lib/models/equipment';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`equipment-tabpanel-${index}`}
      aria-labelledby={`equipment-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

// Get status icon and color based on equipment status
const getStatusInfo = (status: string) => {
  switch (status) {
    case 'Operational':
      return { icon: <CheckCircleIcon />, color: 'success' };
    case 'Under Maintenance':
      return { icon: <BuildIcon />, color: 'warning' };
    case 'Out of Service':
      return { icon: <ErrorIcon />, color: 'error' };
    case 'Calibration Required':
      return { icon: <ScheduleIcon />, color: 'info' };
    default:
      return { icon: <CheckCircleIcon />, color: 'success' };
  }
};

export default function EquipmentPage() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    // Load mock equipment data
    setEquipment(mockEquipment);
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleViewDetails = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    setTabValue(0); // Reset tab when closing dialog
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Filter equipment based on search term
  const filteredEquipment = equipment.filter((eq) =>
    eq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    eq.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    eq.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    eq.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    eq.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    eq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  // Check if calibration or maintenance is due soon (within 30 days)
  const isDueSoon = (dateString: string) => {
    const dueDate = new Date(dateString);
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays <= 30 && diffDays > 0;
  };

  // Check if calibration or maintenance is overdue
  const isOverdue = (dateString: string) => {
    const dueDate = new Date(dateString);
    const today = new Date();
    return dueDate < today;
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Equipment Management
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by name, model, serial number, location..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      <Grid container spacing={2}>
        {filteredEquipment.map((eq) => {
          const statusInfo = getStatusInfo(eq.status);
          
          return (
            <Grid item xs={12} sm={6} md={4} key={eq.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {eq.name}
                    </Typography>
                    <Chip 
                      icon={statusInfo.icon} 
                      label={eq.status} 
                      color={statusInfo.color as any} 
                      size="small" 
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {eq.model} | {eq.manufacturer}
                  </Typography>
                  
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Location
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {eq.location}
                    </Typography>
                    
                    <Grid container spacing={1} sx={{ mt: 1 }}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Next Calibration
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color={
                            isOverdue(eq.nextCalibrationDate) 
                              ? 'error.main' 
                              : isDueSoon(eq.nextCalibrationDate) 
                                ? 'warning.main' 
                                : 'text.primary'
                          }
                        >
                          {formatDate(eq.nextCalibrationDate)}
                          {isOverdue(eq.nextCalibrationDate) && " (Overdue)"}
                          {isDueSoon(eq.nextCalibrationDate) && !isOverdue(eq.nextCalibrationDate) && " (Soon)"}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Next Maintenance
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color={
                            isOverdue(eq.nextMaintenanceDate) 
                              ? 'error.main' 
                              : isDueSoon(eq.nextMaintenanceDate) 
                                ? 'warning.main' 
                                : 'text.primary'
                          }
                        >
                          {formatDate(eq.nextMaintenanceDate)}
                          {isOverdue(eq.nextMaintenanceDate) && " (Overdue)"}
                          {isDueSoon(eq.nextMaintenanceDate) && !isOverdue(eq.nextMaintenanceDate) && " (Soon)"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    startIcon={<VisibilityIcon />}
                    onClick={() => handleViewDetails(eq)}
                  >
                    View Details
                  </Button>
                  <Button
                    size="small"
                    startIcon={<HistoryIcon />}
                    onClick={() => {
                      handleViewDetails(eq);
                      setTabValue(1); // Switch to Usage Logs tab
                    }}
                  >
                    Usage Logs
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Equipment Details Dialog */}
      <Dialog
        open={isDetailsOpen}
        onClose={handleCloseDetails}
        fullWidth
        maxWidth="md"
      >
        {selectedEquipment && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">
                  {selectedEquipment.name} ({selectedEquipment.model})
                </Typography>
                <IconButton onClick={handleCloseDetails}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleTabChange} aria-label="equipment details tabs">
                  <Tab label="Details" />
                  <Tab label="Usage Logs" />
                  <Tab label="Maintenance" />
                  <Tab label="Calibration" />
                  <Tab label="Documents" />
                </Tabs>
              </Box>

              {/* Details Tab */}
              <TabPanel value={tabValue} index={0}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        Basic Information
                      </Typography>
                      <Paper sx={{ p: 2 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                              Manufacturer
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                              {selectedEquipment.manufacturer}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                              Serial Number
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                              {selectedEquipment.serialNumber}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                              Acquisition Date
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                              {formatDate(selectedEquipment.acquisitionDate)}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                              Location
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                              {selectedEquipment.location}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                              Category
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                              {selectedEquipment.category}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                              Status
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                              <Chip 
                                label={selectedEquipment.status} 
                                color={getStatusInfo(selectedEquipment.status).color as any} 
                                size="small"
                              />
                            </Typography>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Box>
                    
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        Specifications
                      </Typography>
                      <Paper sx={{ p: 2 }}>
                        <TableContainer>
                          <Table size="small">
                            <TableBody>
                              {Object.entries(selectedEquipment.specifications).map(([key, value]) => (
                                <TableRow key={key}>
                                  <TableCell sx={{ fontWeight: 'bold', width: '40%' }}>
                                    {key}
                                  </TableCell>
                                  <TableCell>
                                    {value}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Paper>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        Maintenance Schedule
                      </Typography>
                      <Paper sx={{ p: 2 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                              Last Maintenance
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                              {formatDate(selectedEquipment.lastMaintenanceDate)}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                              Next Maintenance
                            </Typography>
                            <Typography 
                              variant="body1" 
                              color={
                                isOverdue(selectedEquipment.nextMaintenanceDate) 
                                  ? 'error.main' 
                                  : isDueSoon(selectedEquipment.nextMaintenanceDate) 
                                    ? 'warning.main' 
                                    : 'text.primary'
                              }
                              gutterBottom
                            >
                              {formatDate(selectedEquipment.nextMaintenanceDate)}
                              {isOverdue(selectedEquipment.nextMaintenanceDate) && " (Overdue)"}
                              {isDueSoon(selectedEquipment.nextMaintenanceDate) && !isOverdue(selectedEquipment.nextMaintenanceDate) && " (Soon)"}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant="body2" color="text.secondary">
                              Maintenance Frequency
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                              Every {selectedEquipment.maintenanceFrequency} days
                            </Typography>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Box>
                    
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        Calibration Schedule
                      </Typography>
                      <Paper sx={{ p: 2 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                              Last Calibration
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                              {formatDate(selectedEquipment.lastCalibrationDate)}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                              Next Calibration
                            </Typography>
                            <Typography 
                              variant="body1" 
                              color={
                                isOverdue(selectedEquipment.nextCalibrationDate) 
                                  ? 'error.main' 
                                  : isDueSoon(selectedEquipment.nextCalibrationDate) 
                                    ? 'warning.main' 
                                    : 'text.primary'
                              }
                              gutterBottom
                            >
                              {formatDate(selectedEquipment.nextCalibrationDate)}
                              {isOverdue(selectedEquipment.nextCalibrationDate) && " (Overdue)"}
                              {isDueSoon(selectedEquipment.nextCalibrationDate) && !isOverdue(selectedEquipment.nextCalibrationDate) && " (Soon)"}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant="body2" color="text.secondary">
                              Calibration Frequency
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                              Every {selectedEquipment.calibrationFrequency} days
                            </Typography>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Box>
                    
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        Notes
                      </Typography>
                      <Paper sx={{ p: 2 }}>
                        <Typography variant="body1">
                          {selectedEquipment.notes}
                        </Typography>
                      </Paper>
                    </Box>
                  </Grid>
                </Grid>
              </TabPanel>

              {/* Usage Logs Tab */}
              <TabPanel value={tabValue} index={1}>
                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6">
                    Usage History
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<AddCircleOutlineIcon />}
                    size="small"
                  >
                    Add Usage Log
                  </Button>
                </Box>

                {selectedEquipment.usageLogs.length > 0 ? (
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Date</TableCell>
                          <TableCell>Time Range</TableCell>
                          <TableCell>Operator</TableCell>
                          <TableCell>Test</TableCell>
                          <TableCell>Parameters</TableCell>
                          <TableCell>Notes</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedEquipment.usageLogs.map((log) => (
                          <TableRow key={log.id}>
                            <TableCell>
                              {new Date(log.startTime).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              {new Date(log.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              {' - '}
                              {new Date(log.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </TableCell>
                            <TableCell>{log.operator}</TableCell>
                            <TableCell>{log.testName}</TableCell>
                            <TableCell>
                              {log.parameters && Object.entries(log.parameters).map(([key, value]) => (
                                <Typography key={key} variant="body2">
                                  {key}: {value}
                                </Typography>
                              ))}
                            </TableCell>
                            <TableCell>{log.notes}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Paper sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="body1" color="text.secondary">
                      No usage logs found for this equipment.
                    </Typography>
                  </Paper>
                )}
              </TabPanel>

              {/* Maintenance Tab */}
              <TabPanel value={tabValue} index={2}>
                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6">
                    Maintenance History
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<AddCircleOutlineIcon />}
                    size="small"
                  >
                    Add Maintenance Record
                  </Button>
                </Box>

                {selectedEquipment.maintenanceLogs.length > 0 ? (
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Date</TableCell>
                          <TableCell>Type</TableCell>
                          <TableCell>Technician</TableCell>
                          <TableCell>Description</TableCell>
                          <TableCell>Result</TableCell>
                          <TableCell>Cost</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedEquipment.maintenanceLogs.map((log) => (
                          <TableRow key={log.id}>
                            <TableCell>{formatDate(log.date)}</TableCell>
                            <TableCell>
                              <Chip 
                                label={log.maintenanceType} 
                                color={
                                  log.maintenanceType === 'Preventive' 
                                    ? 'success' 
                                    : log.maintenanceType === 'Corrective' 
                                      ? 'warning' 
                                      : 'info'
                                } 
                                size="small" 
                              />
                            </TableCell>
                            <TableCell>{log.technician}</TableCell>
                            <TableCell>{log.description}</TableCell>
                            <TableCell>
                              <Chip 
                                label={log.result} 
                                color={
                                  log.result === 'Completed' 
                                    ? 'success' 
                                    : log.result === 'Pending' 
                                      ? 'warning' 
                                      : 'error'
                                } 
                                size="small" 
                              />
                            </TableCell>
                            <TableCell>${log.cost.toFixed(2)}</TableCell>
                            <TableCell>
                              <Button
                                size="small"
                                startIcon={<VisibilityIcon />}
                              >
                                Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Paper sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="body1" color="text.secondary">
                      No maintenance logs found for this equipment.
                    </Typography>
                  </Paper>
                )}
              </TabPanel>

              {/* Calibration Tab */}
              <TabPanel value={tabValue} index={3}>
                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6">
                    Calibration History
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<AddCircleOutlineIcon />}
                    size="small"
                  >
                    Add Calibration Record
                  </Button>
                </Box>

                {selectedEquipment.calibrationLogs.length > 0 ? (
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Date</TableCell>
                          <TableCell>Technician</TableCell>
                          <TableCell>Provider</TableCell>
                          <TableCell>Result</TableCell>
                          <TableCell>Certificate #</TableCell>
                          <TableCell>Valid Until</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedEquipment.calibrationLogs.map((log) => (
                          <TableRow key={log.id}>
                            <TableCell>{formatDate(log.date)}</TableCell>
                            <TableCell>{log.technician}</TableCell>
                            <TableCell>
                              {log.provider === 'External' 
                                ? `${log.provider} (${log.externalProvider})` 
                                : log.provider
                              }
                            </TableCell>
                            <TableCell>
                              <Chip 
                                label={log.result} 
                                color={
                                  log.result === 'Pass' 
                                    ? 'success' 
                                    : log.result === 'Conditional Pass' 
                                      ? 'warning' 
                                      : 'error'
                                } 
                                size="small" 
                              />
                            </TableCell>
                            <TableCell>{log.certificateNumber}</TableCell>
                            <TableCell>{formatDate(log.validUntil)}</TableCell>
                            <TableCell>
                              <Button
                                size="small"
                                startIcon={<VisibilityIcon />}
                              >
                                Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Paper sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="body1" color="text.secondary">
                      No calibration logs found for this equipment.
                    </Typography>
                  </Paper>
                )}
              </TabPanel>

              {/* Documents Tab */}
              <TabPanel value={tabValue} index={4}>
                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6">
                    Equipment Documents
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<AddCircleOutlineIcon />}
                    size="small"
                  >
                    Upload Document
                  </Button>
                </Box>

                {selectedEquipment.documents.length > 0 ? (
                  <List>
                    {selectedEquipment.documents.map((doc) => (
                      <Paper sx={{ mb: 2 }} key={doc.id}>
                        <ListItem
                          secondaryAction={
                            <Button size="small" variant="outlined">
                              View
                            </Button>
                          }
                        >
                          <ListItemText
                            primary={doc.name}
                            secondary={
                              <>
                                <Typography component="span" variant="body2" color="text.primary">
                                  {doc.type}
                                </Typography>
                                {" — Uploaded on " + formatDate(doc.uploadDate)}
                              </>
                            }
                          />
                        </ListItem>
                      </Paper>
                    ))}
                  </List>
                ) : (
                  <Paper sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="body1" color="text.secondary">
                      No documents found for this equipment.
                    </Typography>
                  </Paper>
                )}
              </TabPanel>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDetails}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}
