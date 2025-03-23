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
import ListItemIcon from '@mui/material/ListItemIcon';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import LinearProgress from '@mui/material/LinearProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useNavigate, useLocation } from 'react-router-dom';

// Icons
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ScienceIcon from '@mui/icons-material/Science';
import SettingsIcon from '@mui/icons-material/Settings';
import DescriptionIcon from '@mui/icons-material/Description';
import BuildIcon from '@mui/icons-material/Build';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PublishIcon from '@mui/icons-material/Publish';
import ArchiveIcon from '@mui/icons-material/Archive';
import WarningIcon from '@mui/icons-material/Warning';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import LandscapeIcon from '@mui/icons-material/Landscape';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

// Mock Data
import { mockService } from '../services/mockData';
import { Industry, MethodStatus } from '../types';

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

const ParameterCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  cursor: 'grab',
  '&:hover': {
    boxShadow: theme.shadows[3],
  },
}));

const SelectedParameterCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  backgroundColor: theme.palette.background.default,
  border: `1px solid ${theme.palette.divider}`,
}));

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
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const TestMethodBuilder: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [parameters, setParameters] = useState<any[]>([]);
  const [standards, setStandards] = useState<any[]>([]);
  const [equipment, setEquipment] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [tabValue, setTabValue] = useState(0);
  const [selectedParameters, setSelectedParameters] = useState<any[]>([]);
  const [selectedStandards, setSelectedStandards] = useState<string[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<Industry[]>([]);
  const [methodName, setMethodName] = useState<string>('');
  const [methodDescription, setMethodDescription] = useState<string>('');
  const [methodVersion, setMethodVersion] = useState<string>('1.0');
  const [methodStatus, setMethodStatus] = useState<MethodStatus>(MethodStatus.DRAFT);
  const [openSaveDialog, setOpenSaveDialog] = useState<boolean>(false);
  const [openPublishDialog, setOpenPublishDialog] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('success');
  const [isViewMode, setIsViewMode] = useState<boolean>(false);
  const [currentMethod, setCurrentMethod] = useState<any>(null);
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const paramsData = await mockService.getParameters();
        const standardsData = await mockService.getStandards();
        const equipmentData = await mockService.getEquipment();
        
        setParameters(paramsData);
        setStandards(standardsData);
        setEquipment(equipmentData);
        
        // Check if we're editing or viewing an existing method
        const queryParams = new URLSearchParams(location.search);
        const methodId = queryParams.get('id');
        const viewMode = queryParams.get('view') === 'true';
        
        if (methodId) {
          const method = await mockService.getTestMethodById(methodId);
          if (method) {
            setCurrentMethod(method);
            setMethodName(method.name);
            setMethodDescription(method.description);
            setMethodVersion(method.version);
            setMethodStatus(method.status);
            setSelectedIndustries(method.industries);
            setSelectedStandards(method.standards);
            setSelectedEquipment(method.equipment);
            
            // Map parameter IDs to actual parameter objects
            const selectedParams = method.parameters.map((param: any) => {
              const fullParam = paramsData.find((p: any) => p.id === param.id) || param;
              return {
                ...fullParam,
                defaultValue: param.defaultValue,
                minValue: param.minValue,
                maxValue: param.maxValue
              };
            });
            
            setSelectedParameters(selectedParams);
            setIsViewMode(viewMode);
          }
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [location.search]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleAddParameter = (parameter: any) => {
    if (!selectedParameters.some(p => p.id === parameter.id)) {
      setSelectedParameters([...selectedParameters, parameter]);
      showSnackbar(`Added ${parameter.name} to test method`, 'success');
    } else {
      showSnackbar(`${parameter.name} is already in the test method`, 'info');
    }
  };

  const handleRemoveParameter = (parameterId: string) => {
    setSelectedParameters(selectedParameters.filter(p => p.id !== parameterId));
    showSnackbar('Parameter removed from test method', 'info');
  };

  const handleParameterValueChange = (parameterId: string, field: string, value: number) => {
    setSelectedParameters(selectedParameters.map(p => 
      p.id === parameterId ? { ...p, [field]: value } : p
    ));
  };

  const handleStandardChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedStandards(event.target.value as string[]);
  };

  const handleEquipmentChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedEquipment(event.target.value as string[]);
  };

  const handleIndustryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedIndustries(event.target.value as Industry[]);
  };

  const handleSaveDialogOpen = () => {
    setOpenSaveDialog(true);
  };

  const handleSaveDialogClose = () => {
    setOpenSaveDialog(false);
  };

  const handlePublishDialogOpen = () => {
    setOpenPublishDialog(true);
  };

  const handlePublishDialogClose = () => {
    setOpenPublishDialog(false);
  };

  const handleSaveMethod = () => {
    // In a real application, this would save the method to the database
    showSnackbar(`Test method "${methodName}" saved successfully`, 'success');
    handleSaveDialogClose();
    
    // Navigate back to test methods list after a short delay
    setTimeout(() => {
      navigate('/test-methods');
    }, 1500);
  };

  const handlePublishMethod = () => {
    // In a real application, this would publish the method to the database
    setMethodStatus(MethodStatus.ACTIVE);
    showSnackbar(`Test method "${methodName}" published successfully`, 'success');
    handlePublishDialogClose();
    
    // Navigate back to test methods list after a short delay
    setTimeout(() => {
      navigate('/test-methods');
    }, 1500);
  };

  const showSnackbar = (message: string, severity: 'success' | 'error' | 'info' | 'warning') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(selectedParameters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setSelectedParameters(items);
  };

  const filteredParameters = parameters.filter(parameter => 
    parameter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    parameter.unit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Box sx={{ width: '100%', mt: 4 }}>
        <LinearProgress />
      </Box>
    );
  }

  const isFormValid = methodName.trim() !== '' && 
                      methodDescription.trim() !== '' && 
                      selectedParameters.length > 0 && 
                      selectedStandards.length > 0 && 
                      selectedIndustries.length > 0;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          {isViewMode ? 'Test Method Details' : (currentMethod ? 'Edit Test Method' : 'Create Test Method')}
        </Typography>
        <Box>
          {!isViewMode && (
            <>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<SaveIcon />}
                onClick={handleSaveDialogOpen}
                sx={{ mr: 2 }}
                disabled={!isFormValid}
              >
                Save as Draft
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<PublishIcon />}
                onClick={handlePublishDialogOpen}
                disabled={!isFormValid}
              >
                Publish
              </Button>
            </>
          )}
          {isViewMode && (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate(`/test-method-builder?id=${currentMethod.id}`)}
            >
              Edit Method
            </Button>
          )}
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Basic Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8}>
                <TextField
                  label="Test Method Name"
                  fullWidth
                  value={methodName}
                  onChange={(e) => setMethodName(e.target.value)}
                  disabled={isViewMode}
                  required
                  error={!isViewMode && methodName.trim() === ''}
                  helperText={!isViewMode && methodName.trim() === '' ? 'Name is required' : ''}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Version"
                  fullWidth
                  value={methodVersion}
                  onChange={(e) => setMethodVersion(e.target.value)}
                  disabled={isViewMode}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  rows={3}
                  value={methodDescription}
                  onChange={(e) => setMethodDescription(e.target.value)}
                  disabled={isViewMode}
                  required
                  error={!isViewMode && methodDescription.trim() === ''}
                  helperText={!isViewMode && methodDescription.trim() === '' ? 'Description is required' : ''}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select
                    labelId="status-label"
                    value={methodStatus}
                    onChange={(e) => setMethodStatus(e.target.value as MethodStatus)}
                    label="Status"
                    disabled={isViewMode}
                  >
                    <MenuItem value={MethodStatus.DRAFT}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <DescriptionIcon sx={{ mr: 1, color: 'warning.main' }} />
                        Draft
                      </Box>
                    </MenuItem>
                    <MenuItem value={MethodStatus.ACTIVE}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <PlayArrowIcon sx={{ mr: 1, color: 'success.main' }} />
                        Active
                      </Box>
                    </MenuItem>
                    <MenuItem value={MethodStatus.ARCHIVED}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ArchiveIcon sx={{ mr: 1, color: 'text.secondary' }} />
                        Archived
                      </Box>
                    </MenuItem>
                    <MenuItem value={MethodStatus.DEPRECATED}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <WarningIcon sx={{ mr: 1, color: 'error.main' }} />
                        Deprecated
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel id="industries-label">Industries</InputLabel>
                  <Select
                    labelId="industries-label"
                    multiple
                    value={selectedIndustries}
                    onChange={handleIndustryChange}
                    label="Industries"
                    disabled={isViewMode}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {(selected as Industry[]).map((industry) => (
                          <Chip 
                            key={industry} 
                            label={industry} 
                            icon={INDUSTRY_ICONS[industry]} 
                            sx={{ 
                              bgcolor: `${INDUSTRY_COLORS[industry]}20`,
                              color: INDUSTRY_COLORS[industry]
                            }} 
                          />
                        ))}
                      </Box>
                    )}
                  >
                    <MenuItem value={Industry.AUTOMOTIVE}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <DirectionsCarIcon sx={{ mr: 1, color: INDUSTRY_COLORS[Industry.AUTOMOTIVE] }} />
                        Automotive
                      </Box>
                    </MenuItem>
                    <MenuItem value={Industry.SPORTSWEAR}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <SportsSoccerIcon sx={{ mr: 1, color: INDUSTRY_COLORS[Industry.SPORTSWEAR] }} />
                        Sportswear
                      </Box>
                    </MenuItem>
                    <MenuItem value={Industry.CAMPING}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LandscapeIcon sx={{ mr: 1, color: INDUSTRY_COLORS[Industry.CAMPING] }} />
                        Camping
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel id="standards-label">Standards</InputLabel>
                  <Select
                    labelId="standards-label"
                    multiple
                    value={selectedStandards}
                    onChange={handleStandardChange}
                    label="Standards"
                    disabled={isViewMode}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {(selected as string[]).map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                  >
                    {standards.map((standard) => (
                      <MenuItem key={standard.id} value={standard.name}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <Typography variant="body2">{standard.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {standard.title}
                          </Typography>
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel id="equipment-label">Equipment</InputLabel>
                  <Select
                    labelId="equipment-label"
                    multiple
                    value={selectedEquipment}
                    onChange={handleEquipmentChange}
                    label="Equipment"
                    disabled={isViewMode}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {(selected as string[]).map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                  >
                    {equipment.map((item) => (
                      <MenuItem key={item.id} value={item.name}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <Typography variant="body2">{item.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {item.manufacturer} - {item.type}
                          </Typography>
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>

          <Paper sx={{ mb: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="test method tabs">
                <Tab label="Parameters" {...a11yProps(0)} />
                <Tab label="Procedure" {...a11yProps(1)} disabled />
                <Tab label="Calculations" {...a11yProps(2)} disabled />
                <Tab label="Reporting" {...a11yProps(3)} disabled />
              </Tabs>
            </Box>
            <TabPanel value={tabValue} index={0}>
              <Typography variant="h6" gutterBottom>
                Test Parameters
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Drag and drop parameters to reorder them. Adjust default, minimum, and maximum values as needed.
              </Typography>

              {selectedParameters.length === 0 ? (
                <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'background.default' }}>
                  <Typography variant="body1" gutterBottom>
                    No parameters selected
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Add parameters from the list on the right
                  </Typography>
                </Paper>
              ) : (
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="parameters">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {selectedParameters.map((parameter, index) => (
                          <Draggable
                            key={parameter.id}
                            draggableId={parameter.id}
                            index={index}
                            isDragDisabled={isViewMode}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <SelectedParameterCard elevation={1}>
                                  <DragIndicatorIcon sx={{ mr: 2, color: 'text.secondary' }} />
                                  <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="subtitle1">
                                      {parameter.name} ({parameter.unit})
                                    </Typography>
                                    <Grid container spacing={2} sx={{ mt: 1 }}>
                                      <Grid item xs={4}>
                                        <TextField
                                          label="Default"
                                          type="number"
                                          size="small"
                                          fullWidth
                                          value={parameter.defaultValue}
                                          onChange={(e) => handleParameterValueChange(parameter.id, 'defaultValue', Number(e.target.value))}
                                          InputProps={{
                                            endAdornment: <InputAdornment position="end">{parameter.unit}</InputAdornment>,
                                          }}
                                          disabled={isViewMode}
                                        />
                                      </Grid>
                                      <Grid item xs={4}>
                                        <TextField
                                          label="Min"
                                          type="number"
                                          size="small"
                                          fullWidth
                                          value={parameter.minValue}
                                          onChange={(e) => handleParameterValueChange(parameter.id, 'minValue', Number(e.target.value))}
                                          InputProps={{
                                            endAdornment: <InputAdornment position="end">{parameter.unit}</InputAdornment>,
                                          }}
                                          disabled={isViewMode}
                                        />
                                      </Grid>
                                      <Grid item xs={4}>
                                        <TextField
                                          label="Max"
                                          type="number"
                                          size="small"
                                          fullWidth
                                          value={parameter.maxValue}
                                          onChange={(e) => handleParameterValueChange(parameter.id, 'maxValue', Number(e.target.value))}
                                          InputProps={{
                                            endAdornment: <InputAdornment position="end">{parameter.unit}</InputAdornment>,
                                          }}
                                          disabled={isViewMode}
                                        />
                                      </Grid>
                                    </Grid>
                                  </Box>
                                  {!isViewMode && (
                                    <IconButton 
                                      color="error" 
                                      onClick={() => handleRemoveParameter(parameter.id)}
                                      sx={{ ml: 1 }}
                                    >
                                      <DeleteIcon />
                                    </IconButton>
                                  )}
                                </SelectedParameterCard>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              )}
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <Typography variant="body1">
                Procedure content will be implemented in a future version.
              </Typography>
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <Typography variant="body1">
                Calculations content will be implemented in a future version.
              </Typography>
            </TabPanel>
            <TabPanel value={tabValue} index={3}>
              <Typography variant="body1">
                Reporting content will be implemented in a future version.
              </Typography>
            </TabPanel>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Parameter Library
            </Typography>
            <TextField
              placeholder="Search parameters..."
              variant="outlined"
              size="small"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
              disabled={isViewMode}
            />
            <Box sx={{ maxHeight: 500, overflowY: 'auto' }}>
              {filteredParameters.map((parameter) => (
                <ParameterCard key={parameter.id} elevation={1}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1">
                      {parameter.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Unit: {parameter.unit} | Default: {parameter.defaultValue} | Range: {parameter.minValue} - {parameter.maxValue}
                    </Typography>
                  </Box>
                  {!isViewMode && (
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleAddParameter(parameter)}
                      startIcon={<AddIcon />}
                      sx={{ ml: 1 }}
                    >
                      Add
                    </Button>
                  )}
                </ParameterCard>
              ))}
              {filteredParameters.length === 0 && (
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                  No parameters found matching your search
                </Typography>
              )}
            </Box>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Help & Resources
            </Typography>
            <List>
              <ListItem button>
                <ListItemIcon>
                  <HelpOutlineIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Test Method Builder Guide" 
                  secondary="Learn how to create effective test methods" 
                />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Standards Documentation" 
                  secondary="Access detailed standards information" 
                />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <BuildIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Equipment Specifications" 
                  secondary="View equipment capabilities and requirements" 
                />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <ScienceIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Parameter Guidelines" 
                  secondary="Recommendations for parameter settings" 
                />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="ISO/IEC 17025 Compliance" 
                  secondary="Ensure your methods meet compliance requirements" 
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Save Dialog */}
      <Dialog
        open={openSaveDialog}
        onClose={handleSaveDialogClose}
        aria-labelledby="save-dialog-title"
        aria-describedby="save-dialog-description"
      >
        <DialogTitle id="save-dialog-title">
          Save Test Method as Draft
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="save-dialog-description">
            This will save the test method as a draft. It will not be available for use until it is published.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSaveDialogClose}>Cancel</Button>
          <Button onClick={handleSaveMethod} color="primary" autoFocus>
            Save as Draft
          </Button>
        </DialogActions>
      </Dialog>

      {/* Publish Dialog */}
      <Dialog
        open={openPublishDialog}
        onClose={handlePublishDialogClose}
        aria-labelledby="publish-dialog-title"
        aria-describedby="publish-dialog-description"
      >
        <DialogTitle id="publish-dialog-title">
          Publish Test Method
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="publish-dialog-description">
            This will publish the test method and make it available for use. Are you sure you want to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePublishDialogClose}>Cancel</Button>
          <Button onClick={handlePublishMethod} color="primary" autoFocus>
            Publish
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TestMethodBuilder;
