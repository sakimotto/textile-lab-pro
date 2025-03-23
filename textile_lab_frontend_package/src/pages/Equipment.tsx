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
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Avatar from '@mui/material/Avatar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import LinearProgress from '@mui/material/LinearProgress';

// Icons
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BuildIcon from '@mui/icons-material/Build';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import ErrorIcon from '@mui/icons-material/Error';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
import HistoryIcon from '@mui/icons-material/History';

import { EquipmentStatus, CalibrationStatus, MaintenanceType } from '../types';

const HeaderBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey[100],
  '&:hover': {
    backgroundColor: theme.palette.grey[200],
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30ch',
    },
  },
}));

const StatusChip = styled(Chip)(({ theme, status }: { theme: any, status: EquipmentStatus | CalibrationStatus }) => {
  let color;
  
  if (status === EquipmentStatus.OPERATIONAL || status === CalibrationStatus.CURRENT) {
    color = theme.palette.success.main;
  } else if (status === EquipmentStatus.MAINTENANCE || status === CalibrationStatus.DUE_SOON) {
    color = theme.palette.warning.main;
  } else if (status === EquipmentStatus.OUT_OF_SERVICE || status === CalibrationStatus.OVERDUE) {
    color = theme.palette.error.main;
  } else {
    color = theme.palette.grey[500];
  }
  
  return {
    backgroundColor: `${color}10`,
    color: color,
    borderColor: color,
  };
});

// Mock equipment data
const equipmentList = [
  {
    id: '1',
    name: 'Instron 5967',
    model: '5967',
    manufacturer: 'Instron',
    type: 'Tensile Tester',
    location: 'Lab Room 101',
    status: EquipmentStatus.OPERATIONAL,
    calibrationStatus: CalibrationStatus.CURRENT,
    lastCalibration: new Date('2025-01-15'),
    nextCalibration: new Date('2025-07-15'),
    purchaseDate: new Date('2022-05-10'),
    warrantyExpiration: new Date('2027-05-10'),
    utilization: 78,
  },
  {
    id: '2',
    name: 'SDL Atlas MM-1',
    model: 'MM-1',
    manufacturer: 'SDL Atlas',
    type: 'Moisture Management Tester',
    location: 'Lab Room 102',
    status: EquipmentStatus.OPERATIONAL,
    calibrationStatus: CalibrationStatus.DUE_SOON,
    lastCalibration: new Date('2024-10-20'),
    nextCalibration: new Date('2025-04-20'),
    purchaseDate: new Date('2023-02-15'),
    warrantyExpiration: new Date('2028-02-15'),
    utilization: 65,
  },
  {
    id: '3',
    name: 'MESDAN-LAB Microscope',
    model: 'MICRO-350HD',
    manufacturer: 'MESDAN-LAB',
    type: 'Digital Microscope',
    location: 'Lab Room 103',
    status: EquipmentStatus.OPERATIONAL,
    calibrationStatus: CalibrationStatus.CURRENT,
    lastCalibration: new Date('2025-02-10'),
    nextCalibration: new Date('2025-08-10'),
    purchaseDate: new Date('2024-01-05'),
    warrantyExpiration: new Date('2029-01-05'),
    utilization: 42,
  },
  {
    id: '4',
    name: 'SDL Atlas Flammability Tester',
    model: 'FTL-01',
    manufacturer: 'SDL Atlas',
    type: 'Flammability Tester',
    location: 'Lab Room 101',
    status: EquipmentStatus.MAINTENANCE,
    calibrationStatus: CalibrationStatus.OVERDUE,
    lastCalibration: new Date('2024-08-15'),
    nextCalibration: new Date('2025-02-15'),
    purchaseDate: new Date('2021-11-20'),
    warrantyExpiration: new Date('2026-11-20'),
    utilization: 0,
  },
  {
    id: '5',
    name: 'Instron Impact Tester',
    model: 'CEAST 9350',
    manufacturer: 'Instron',
    type: 'Impact Tester',
    location: 'Lab Room 104',
    status: EquipmentStatus.OPERATIONAL,
    calibrationStatus: CalibrationStatus.CURRENT,
    lastCalibration: new Date('2025-03-01'),
    nextCalibration: new Date('2025-09-01'),
    purchaseDate: new Date('2023-07-12'),
    warrantyExpiration: new Date('2028-07-12'),
    utilization: 56,
  },
  {
    id: '6',
    name: 'MESDAN-LAB Abrasion Tester',
    model: 'MARTINDALE 1309',
    manufacturer: 'MESDAN-LAB',
    type: 'Abrasion Tester',
    location: 'Lab Room 102',
    status: EquipmentStatus.OUT_OF_SERVICE,
    calibrationStatus: CalibrationStatus.OVERDUE,
    lastCalibration: new Date('2024-07-10'),
    nextCalibration: new Date('2025-01-10'),
    purchaseDate: new Date('2020-09-15'),
    warrantyExpiration: new Date('2025-09-15'),
    utilization: 0,
  },
  {
    id: '7',
    name: 'SDL Atlas Weather-Ometer',
    model: 'Ci4000',
    manufacturer: 'SDL Atlas',
    type: 'Weather Tester',
    location: 'Lab Room 105',
    status: EquipmentStatus.OPERATIONAL,
    calibrationStatus: CalibrationStatus.CURRENT,
    lastCalibration: new Date('2025-02-20'),
    nextCalibration: new Date('2025-08-20'),
    purchaseDate: new Date('2022-12-05'),
    warrantyExpiration: new Date('2027-12-05'),
    utilization: 89,
  },
  {
    id: '8',
    name: 'Instron Hydrostatic Pressure Tester',
    model: 'M820',
    manufacturer: 'Instron',
    type: 'Pressure Tester',
    location: 'Lab Room 103',
    status: EquipmentStatus.OPERATIONAL,
    calibrationStatus: CalibrationStatus.DUE_SOON,
    lastCalibration: new Date('2024-11-15'),
    nextCalibration: new Date('2025-05-15'),
    purchaseDate: new Date('2023-04-20'),
    warrantyExpiration: new Date('2028-04-20'),
    utilization: 72,
  },
];

// Mock maintenance history for equipment detail view
const maintenanceHistory = [
  {
    id: 'M001',
    type: MaintenanceType.CALIBRATION,
    description: 'Annual calibration performed',
    performedBy: 'John Doe',
    date: new Date('2025-01-15'),
    notes: 'All parameters within specification',
  },
  {
    id: 'M002',
    type: MaintenanceType.PREVENTIVE,
    description: 'Quarterly preventive maintenance',
    performedBy: 'Jane Smith',
    date: new Date('2024-10-10'),
    notes: 'Replaced worn components, cleaned sensors',
  },
  {
    id: 'M003',
    type: MaintenanceType.CORRECTIVE,
    description: 'Load cell replacement',
    performedBy: 'External Service',
    date: new Date('2024-07-22'),
    notes: 'Load cell showed drift, replaced with new calibrated unit',
  },
  {
    id: 'M004',
    type: MaintenanceType.INSPECTION,
    description: 'Safety inspection',
    performedBy: 'Robert Johnson',
    date: new Date('2024-04-15'),
    notes: 'All safety features functioning correctly',
  },
];

// Mock scheduled tests for equipment detail view
const scheduledTests = [
  {
    id: 'T001',
    title: 'Automotive Fabric Tensile Test',
    scheduledStart: new Date('2025-03-25T09:00:00'),
    scheduledEnd: new Date('2025-03-25T11:00:00'),
    technician: 'John Doe',
  },
  {
    id: 'T002',
    title: 'Sportswear Elasticity Test',
    scheduledStart: new Date('2025-03-26T13:00:00'),
    scheduledEnd: new Date('2025-03-26T15:00:00'),
    technician: 'Jane Smith',
  },
  {
    id: 'T003',
    title: 'Camping Material Strength Test',
    scheduledStart: new Date('2025-03-28T10:00:00'),
    scheduledEnd: new Date('2025-03-28T12:00:00'),
    technician: 'Robert Johnson',
  },
];

const Equipment: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string | null>(null);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [openMaintenanceDialog, setOpenMaintenanceDialog] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, equipmentId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedEquipmentId(equipmentId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpenDetailDialog = (equipmentId: string) => {
    setSelectedEquipmentId(equipmentId);
    setOpenDetailDialog(true);
    handleMenuClose();
  };

  const handleCloseDetailDialog = () => {
    setOpenDetailDialog(false);
  };

  const handleOpenMaintenanceDialog = () => {
    setOpenMaintenanceDialog(true);
    handleMenuClose();
  };

  const handleCloseMaintenanceDialog = () => {
    setOpenMaintenanceDialog(false);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getStatusChipColor = (status: EquipmentStatus) => {
    switch (status) {
      case EquipmentStatus.OPERATIONAL:
        return 'success';
      case EquipmentStatus.MAINTENANCE:
        return 'warning';
      case EquipmentStatus.OUT_OF_SERVICE:
        return 'error';
      default:
        return 'default';
    }
  };

  const getCalibrationStatusChipColor = (status: CalibrationStatus) => {
    switch (status) {
      case CalibrationStatus.CURRENT:
        return 'success';
      case CalibrationStatus.DUE_SOON:
        return 'warning';
      case CalibrationStatus.OVERDUE:
        return 'error';
      case CalibrationStatus.NOT_REQUIRED:
        return 'default';
      default:
        return 'default';
    }
  };

  const getMaintenanceTypeChipColor = (type: MaintenanceType) => {
    switch (type) {
      case MaintenanceType.CALIBRATION:
        return 'primary';
      case MaintenanceType.PREVENTIVE:
        return 'success';
      case MaintenanceType.CORRECTIVE:
        return 'error';
      case MaintenanceType.INSPECTION:
        return 'info';
      default:
        return 'default';
    }
  };

  const selectedEquipment = equipmentList.find(equipment => equipment.id === selectedEquipmentId);

  // Render equipment detail dialog
  const renderDetailDialog = () => {
    if (!selectedEquipment) return null;
    
    return (
      <Dialog
        open={openDetailDialog}
        onClose={handleCloseDetailDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">{selectedEquipment.name}</Typography>
            <StatusChip 
              label={selectedEquipment.status} 
              status={selectedEquipment.status}
              variant="outlined"
            />
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Details" />
              <Tab label="Maintenance History" />
              <Tab label="Scheduled Tests" />
              <Tab label="Documentation" />
            </Tabs>
          </Box>
          
          {tabValue === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardHeader title="Equipment Information" />
                  <Divider />
                  <CardContent>
                    <TableContainer>
                      <Table size="small">
                        <TableBody>
                          <TableRow>
                            <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                              Model
                            </TableCell>
                            <TableCell>{selectedEquipment.model}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                              Manufacturer
                            </TableCell>
                            <TableCell>{selectedEquipment.manufacturer}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                              Type
                            </TableCell>
                            <TableCell>{selectedEquipment.type}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                              Location
                            </TableCell>
                            <TableCell>{selectedEquipment.location}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                              Purchase Date
                            </TableCell>
                            <TableCell>{selectedEquipment.purchaseDate.toLocaleDateString()}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                              Warranty Expiration
                            </TableCell>
                            <TableCell>{selectedEquipment.warrantyExpiration.toLocaleDateString()}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardHeader title="Calibration Status" />
                  <Divider />
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <StatusChip 
                        label={selectedEquipment.calibrationStatus} 
                        status={selectedEquipment.calibrationStatus}
                        variant="outlined"
                        sx={{ mr: 1 }}
                      />
                      {selectedEquipment.calibrationStatus === CalibrationStatus.OVERDUE && (
                        <Typography variant="body2" color="error">
                          Calibration overdue by {Math.floor((new Date().getTime() - selectedEquipment.nextCalibration.getTime()) / (1000 * 60 * 60 * 24))} days
                        </Typography>
                      )}
                      {selectedEquipment.calibrationStatus === CalibrationStatus.DUE_SOON && (
                        <Typography variant="body2" color="warning.main">
                          Calibration due in {Math.floor((selectedEquipment.nextCalibration.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                        </Typography>
                      )}
                    </Box>
                    
                    <TableContainer>
                      <Table size="small">
                        <TableBody>
                          <TableRow>
                            <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                              Last Calibration
                            </TableCell>
                            <TableCell>{selectedEquipment.lastCalibration.toLocaleDateString()}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                              Next Calibration
                            </TableCell>
                            <TableCell>{selectedEquipment.nextCalibration.toLocaleDateString()}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                              Calibration Interval
                            </TableCell>
                            <TableCell>6 months</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                              Calibration Provider
                            </TableCell>
                            <TableCell>{selectedEquipment.manufacturer} Certified Service</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                    
                    <Button 
                      variant="outlined" 
                      startIcon={<DownloadIcon />}
                      sx={{ mt: 2 }}
                      fullWidth
                    >
                      Download Calibration Certificate
                    </Button>
                  </CardContent>
                </Card>
                
                <Card variant="outlined" sx={{ mt: 2 }}>
                  <CardHeader title="Utilization" />
                  <Divider />
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={selectedEquipment.utilization} 
                        sx={{ flexGrow: 1, mr: 2, height: 10, borderRadius: 5 }}
                        color={selectedEquipment.utilization > 80 ? "error" : selectedEquipment.utilization > 60 ? "warning" : "success"}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {selectedEquipment.utilization}%
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {selectedEquipment.status === EquipmentStatus.OPERATIONAL ? 
                        `Equipment is currently available for testing` : 
                        `Equipment is currently unavailable for testing`}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12}>
                <Card variant="outlined">
                  <CardHeader title="Quick Actions" />
                  <Divider />
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={6} md={3}>
                        <Button 
                          variant="outlined" 
                          startIcon={<BuildIcon />}
                          fullWidth
                          onClick={handleOpenMaintenanceDialog}
                        >
                          Log Maintenance
                        </Button>
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <Button 
                          variant="outlined" 
                          startIcon={<CalendarTodayIcon />}
                          fullWidth
                        >
                          Schedule Test
                        </Button>
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <Button 
                          variant="outlined" 
                          startIcon={<QrCodeScannerIcon />}
                          fullWidth
                        >
                          Generate QR Code
                        </Button>
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <Button 
                          variant="outlined" 
                          startIcon={<PrintIcon />}
                          fullWidth
                        >
                          Print Details
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
          
          {tabValue === 1 && (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">
                  Maintenance History
                </Typography>
                <Button 
                  variant="outlined" 
                  startIcon={<AddIcon />}
                  size="small"
                  onClick={handleOpenMaintenanceDialog}
                >
                  Log Maintenance
                </Button>
              </Box>
              
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Performed By</TableCell>
                      <TableCell>Notes</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {maintenanceHistory.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>{record.date.toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Chip 
                            label={record.type} 
                            size="small"
                            color={getMaintenanceTypeChipColor(record.type) as any}
                          />
                        </TableCell>
                        <TableCell>{record.description}</TableCell>
                        <TableCell>{record.performedBy}</TableCell>
                        <TableCell>{record.notes}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
          
          {tabValue === 2 && (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">
                  Scheduled Tests
                </Typography>
                <Button 
                  variant="outlined" 
                  startIcon={<AddIcon />}
                  size="small"
                >
                  Schedule Test
                </Button>
              </Box>
              
              {scheduledTests.length > 0 ? (
                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Test</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Technician</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {scheduledTests.map((test) => (
                        <TableRow key={test.id}>
                          <TableCell>{test.title}</TableCell>
                          <TableCell>{test.scheduledStart.toLocaleDateString()}</TableCell>
                          <TableCell>
                            {test.scheduledStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                            {test.scheduledEnd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </TableCell>
                          <TableCell>{test.technician}</TableCell>
                          <TableCell align="right">
                            <IconButton size="small">
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography variant="body1" color="text.secondary" align="center" sx={{ py: 4 }}>
                  No tests scheduled for this equipment
                </Typography>
              )}
            </>
          )}
          
          {tabValue === 3 && (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">
                  Documentation
                </Typography>
                <Button 
                  variant="outlined" 
                  startIcon={<AddIcon />}
                  size="small"
                >
                  Upload Document
                </Button>
              </Box>
              
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Document</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Date Added</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>User Manual</TableCell>
                      <TableCell>PDF</TableCell>
                      <TableCell>{selectedEquipment.purchaseDate.toLocaleDateString()}</TableCell>
                      <TableCell align="right">
                        <IconButton size="small">
                          <DownloadIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Calibration Certificate</TableCell>
                      <TableCell>PDF</TableCell>
                      <TableCell>{selectedEquipment.lastCalibration.toLocaleDateString()}</TableCell>
                      <TableCell align="right">
                        <IconButton size="small">
                          <DownloadIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Maintenance Procedures</TableCell>
                      <TableCell>PDF</TableCell>
                      <TableCell>{selectedEquipment.purchaseDate.toLocaleDateString()}</TableCell>
                      <TableCell align="right">
                        <IconButton size="small">
                          <DownloadIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Warranty Information</TableCell>
                      <TableCell>PDF</TableCell>
                      <TableCell>{selectedEquipment.purchaseDate.toLocaleDateString()}</TableCell>
                      <TableCell align="right">
                        <IconButton size="small">
                          <DownloadIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetailDialog}>Close</Button>
          <Button variant="contained" color="primary">
            Edit Equipment
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  // Render maintenance log dialog
  const renderMaintenanceDialog = () => {
    return (
      <Dialog
        open={openMaintenanceDialog}
        onClose={handleCloseMaintenanceDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Log Maintenance Activity</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                sx={{ mb: 2 }}
              />
              
              <TextField
                select
                fullWidth
                label="Maintenance Type"
                defaultValue={MaintenanceType.PREVENTIVE}
                sx={{ mb: 2 }}
              >
                {Object.values(MaintenanceType).map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
              
              <TextField
                fullWidth
                label="Performed By"
                variant="outlined"
                sx={{ mb: 2 }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Date"
                type="date"
                defaultValue={new Date().toISOString().split('T')[0]}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ mb: 2 }}
              />
              
              <TextField
                fullWidth
                label="Notes"
                multiline
                rows={4}
                variant="outlined"
                sx={{ mb: 2 }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                fullWidth
              >
                Add Attachments
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMaintenanceDialog}>Cancel</Button>
          <Button 
            variant="contained" 
            color="primary"
            onClick={handleCloseMaintenanceDialog}
          >
            Save Maintenance Record
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <>
      <HeaderBox>
        <Box>
          <Typography variant="h4" gutterBottom>
            Equipment Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Monitor and manage laboratory equipment
          </Typography>
        </Box>
        <Box>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<AddIcon />}
          >
            Add Equipment
          </Button>
        </Box>
      </HeaderBox>

      <Paper sx={{ mb: 3, p: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search equipment..."
                variant="standard"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ display: { md: 'none' } }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Search>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack direction="row" spacing={1} justifyContent={{ xs: 'flex-start', md: 'flex-end' }}>
              <Button startIcon={<FilterListIcon />}>
                Filter
              </Button>
              <Chip label="Operational" color="success" onDelete={() => {}} />
              <Chip label="Calibration Due" color="warning" onDelete={() => {}} />
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={1} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 120 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Total Equipment
            </Typography>
            <Typography variant="h3" component="div" sx={{ flexGrow: 1, fontWeight: 500 }}>
              {equipmentList.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {equipmentList.filter(e => e.status === EquipmentStatus.OPERATIONAL).length} operational
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={1} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 120 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Calibration Due
            </Typography>
            <Typography variant="h3" component="div" sx={{ flexGrow: 1, fontWeight: 500, color: 'warning.main' }}>
              {equipmentList.filter(e => e.calibrationStatus === CalibrationStatus.DUE_SOON).length}
            </Typography>
            <Typography variant="body2" color="warning.main">
              Within next 30 days
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={1} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 120 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Out of Service
            </Typography>
            <Typography variant="h3" component="div" sx={{ flexGrow: 1, fontWeight: 500, color: 'error.main' }}>
              {equipmentList.filter(e => e.status === EquipmentStatus.OUT_OF_SERVICE).length}
            </Typography>
            <Typography variant="body2" color="error.main">
              Requires attention
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={1} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 120 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Average Utilization
            </Typography>
            <Typography variant="h3" component="div" sx={{ flexGrow: 1, fontWeight: 500 }}>
              {Math.round(equipmentList.reduce((acc, curr) => acc + curr.utilization, 0) / equipmentList.length)}%
            </Typography>
            <Typography variant="body2" color="success.main">
              +5% from last month
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="equipment table">
          <TableHead>
            <TableRow>
              <TableCell>Equipment</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Calibration</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Last Calibration</TableCell>
              <TableCell>Next Calibration</TableCell>
              <TableCell>Utilization</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {equipmentList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((equipment) => (
                <TableRow
                  key={equipment.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="body1" fontWeight={500}>
                        {equipment.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {equipment.manufacturer} | {equipment.type}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <StatusChip 
                      label={equipment.status} 
                      status={equipment.status}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <StatusChip 
                      label={equipment.calibrationStatus} 
                      status={equipment.calibrationStatus}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{equipment.location}</TableCell>
                  <TableCell>{equipment.lastCalibration.toLocaleDateString()}</TableCell>
                  <TableCell>{equipment.nextCalibration.toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={equipment.utilization} 
                        sx={{ width: 60, mr: 1, height: 6, borderRadius: 3 }}
                        color={equipment.utilization > 80 ? "error" : equipment.utilization > 60 ? "warning" : "success"}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {equipment.utilization}%
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="more"
                      aria-controls="equipment-menu"
                      aria-haspopup="true"
                      onClick={(e) => handleMenuOpen(e, equipment.id)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={equipmentList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <Menu
        id="equipment-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => selectedEquipmentId && handleOpenDetailDialog(selectedEquipmentId)}>
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="View Details" />
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Edit" />
        </MenuItem>
        <MenuItem onClick={handleOpenMaintenanceDialog}>
          <ListItemIcon>
            <BuildIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Log Maintenance" />
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <HistoryIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="View History" />
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
      </Menu>

      {/* Equipment Detail Dialog */}
      {renderDetailDialog()}

      {/* Maintenance Log Dialog */}
      {renderMaintenanceDialog()}
    </>
  );
};

export default Equipment;
