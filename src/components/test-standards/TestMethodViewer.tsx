'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Card,
  CardContent,
  Grid,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Science as ScienceIcon,
  Straighten as StraightenIcon,
  Assignment as AssignmentIcon,
  Warning as WarningIcon,
  ExpandMore as ExpandMoreIcon,
  Description as DescriptionIcon,
  Timer as TimerIcon,
  Print as PrintIcon,
  Save as SaveIcon,
  Share as ShareIcon,
} from '@mui/icons-material';
import { TestMethod } from '@/lib/models/test-method';
import { TestStandard } from '@/lib/models/test-standard';

interface TestMethodViewerProps {
  method: TestMethod;
  standard: TestStandard;
  onClose: () => void;
}

export default function TestMethodViewer({ method, standard, onClose }: TestMethodViewerProps) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const getTotalDuration = (): string => {
    if (method.estimatedDuration < 60) {
      return `${method.estimatedDuration} minutes`;
    } else {
      const hours = Math.floor(method.estimatedDuration / 60);
      const minutes = method.estimatedDuration % 60;
      return `${hours} hour${hours > 1 ? 's' : ''} ${minutes > 0 ? `${minutes} minutes` : ''}`;
    }
  };

  const renderMethodHeader = () => (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4">
          {method.name}
        </Typography>
        <Box>
          <Button startIcon={<PrintIcon />} variant="outlined" sx={{ mr: 1 }}>
            Print
          </Button>
          <Button startIcon={<SaveIcon />} variant="outlined" sx={{ mr: 1 }}>
            Save
          </Button>
          <Button variant="contained" color="primary" onClick={onClose}>
            Close
          </Button>
        </Box>
      </Box>
      
      <Typography variant="h6" color="text.secondary" gutterBottom>
        {standard.code} - {standard.name}
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
        <Chip 
          icon={<ScienceIcon />} 
          label={standard.organization} 
          color="primary" 
        />
        <Chip 
          label={standard.category} 
        />
        <Chip 
          icon={<TimerIcon />} 
          label={getTotalDuration()} 
          variant="outlined" 
        />
        <Chip 
          label={`Difficulty: ${method.difficulty}`} 
          color={method.difficulty === 'Basic' ? 'success' : method.difficulty === 'Intermediate' ? 'warning' : 'error'} 
          variant="outlined" 
        />
      </Box>
      
      <Typography variant="body1" paragraph>
        {method.description}
      </Typography>
      
      <Typography variant="body1" paragraph>
        <strong>Purpose:</strong> {method.purpose}
      </Typography>
    </Box>
  );

  const renderSampleRequirements = () => (
    <Card variant="outlined" sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Sample Requirements
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <StraightenIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Size"
                  secondary={method.sampleRequirements.size}
                />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Quantity"
                  secondary={`${method.sampleRequirements.quantity} specimens`}
                />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <ScienceIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Conditioning"
                  secondary={method.sampleRequirements.conditioning}
                />
              </ListItem>
            </List>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" gutterBottom>
              Sample Preparation
            </Typography>
            
            <List dense>
              {method.sampleRequirements.preparation.map((step, index) => (
                <ListItem key={index}>
                  <ListItemText 
                    primary={`${index + 1}. ${step}`}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
          
          {method.sampleRequirements.specialRequirements && (
            <Grid item xs={12}>
              <Alert severity="info">
                <Typography variant="subtitle2">
                  Special Requirements
                </Typography>
                <Typography variant="body2">
                  {method.sampleRequirements.specialRequirements}
                </Typography>
              </Alert>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );

  const renderEquipmentAndChemicals = () => (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Equipment & Chemicals
      </Typography>
      
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Equipment Requirements</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Equipment</TableCell>
                  <TableCell>Specifications</TableCell>
                  <TableCell>Calibration</TableCell>
                  <TableCell>Alternatives</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {method.equipmentRequirements.map((equipment, index) => (
                  <TableRow key={index}>
                    <TableCell>{equipment.name}</TableCell>
                    <TableCell>{equipment.specifications}</TableCell>
                    <TableCell>
                      {equipment.calibrationRequired ? 
                        <Chip size="small" label="Required" color="warning" /> : 
                        <Chip size="small" label="Not Required" />
                      }
                    </TableCell>
                    <TableCell>{equipment.alternatives?.join(', ') || '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
      
      {method.chemicalRequirements.length > 0 && (
        <Accordion defaultExpanded sx={{ mt: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Chemical Requirements</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Chemical</TableCell>
                    <TableCell>Concentration</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Hazard Level</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {method.chemicalRequirements.map((chemical, index) => (
                    <TableRow key={index}>
                      <TableCell>{chemical.name}</TableCell>
                      <TableCell>{chemical.concentration}</TableCell>
                      <TableCell>{chemical.quantity}</TableCell>
                      <TableCell>
                        <Chip 
                          size="small" 
                          label={chemical.hazardLevel} 
                          color={
                            chemical.hazardLevel === 'Low' ? 'success' : 
                            chemical.hazardLevel === 'Medium' ? 'warning' : 'error'
                          } 
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      )}
    </Box>
  );

  const renderProcedure = () => (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Test Procedure
      </Typography>
      
      <Stepper orientation="vertical" sx={{ mt: 2 }}>
        {method.procedure.map((step, index) => (
          <Step key={index} active={true}>
            <StepLabel>
              <Typography variant="subtitle1">
                Step {step.stepNumber}: {step.duration && `(${step.duration} min)`}
              </Typography>
            </StepLabel>
            <StepContent>
              <Typography paragraph>
                {step.description}
              </Typography>
              
              {(step.criticalParameters || step.temperature || step.warningNotes) && (
                <Box sx={{ mt: 1, mb: 2 }}>
                  {step.temperature && (
                    <Chip 
                      size="small" 
                      label={`Temperature: ${step.temperature}°C`} 
                      sx={{ mr: 1, mb: 1 }} 
                    />
                  )}
                  
                  {step.criticalParameters && Object.entries(step.criticalParameters).map(([key, value]) => (
                    <Chip 
                      key={key}
                      size="small" 
                      label={`${key}: ${value}`} 
                      sx={{ mr: 1, mb: 1 }} 
                    />
                  ))}
                </Box>
              )}
              
              {step.warningNotes && (
                <Alert severity="warning" sx={{ mt: 1 }}>
                  <Typography variant="body2">
                    {step.warningNotes}
                  </Typography>
                </Alert>
              )}
              
              {step.qualityCheckpoint && (
                <Alert severity="info" sx={{ mt: 1 }}>
                  <Typography variant="body2">
                    <strong>Quality Control Point</strong> - Verification required before proceeding
                  </Typography>
                </Alert>
              )}
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );

  const renderResultsCalculation = () => (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Results Calculation & Reporting
      </Typography>
      
      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            Calculation Method
          </Typography>
          <Typography variant="body2" paragraph>
            {method.calculationMethod}
          </Typography>
          
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="subtitle1" gutterBottom>
            Reporting Requirements
          </Typography>
          <List dense>
            {method.reportingRequirements.map((requirement, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <DescriptionIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={requirement} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );

  const renderSafetyHazards = () => (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Safety & Hazards
      </Typography>
      
      {method.hazards.length > 0 ? (
        method.hazards.map((hazard, index) => (
          <Alert 
            key={index}
            severity={
              hazard.severity === 'Low' ? 'info' : 
              hazard.severity === 'Medium' ? 'warning' : 'error'
            }
            sx={{ mb: 2 }}
          >
            <Typography variant="subtitle2">
              {hazard.type} Hazard - {hazard.severity} Severity
            </Typography>
            <Typography variant="body2" paragraph>
              {hazard.description}
            </Typography>
            
            <Typography variant="subtitle2">
              Mitigation Measures:
            </Typography>
            <List dense>
              {hazard.mitigationMeasures.map((measure, idx) => (
                <ListItem key={idx} dense>
                  <ListItemText primary={`• ${measure}`} />
                </ListItem>
              ))}
            </List>
          </Alert>
        ))
      ) : (
        <Alert severity="success">
          <Typography variant="body2">
            No significant hazards associated with this test method.
          </Typography>
        </Alert>
      )}
    </Box>
  );

  const renderReferences = () => (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        References & Notes
      </Typography>
      
      {method.references.length > 0 && (
        <>
          <Typography variant="subtitle2" gutterBottom>
            References
          </Typography>
          <List dense>
            {method.references.map((reference, index) => (
              <ListItem key={index} alignItems="flex-start" sx={{ mb: 1 }}>
                <ListItemText
                  primary={reference.title}
                  secondary={
                    <>
                      {reference.authors?.join(', ')}
                      {reference.publication && ` ${reference.publication}`}
                      {reference.year && ` (${reference.year})`}
                      {reference.doi && (
                        <Typography component="span" variant="body2" sx={{ display: 'block', mt: 0.5 }}>
                          DOI: {reference.doi}
                        </Typography>
                      )}
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </>
      )}
      
      {method.notes && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Additional Notes
          </Typography>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="body2">
              {method.notes}
            </Typography>
          </Paper>
        </Box>
      )}
    </Box>
  );

  return (
    <Paper sx={{ p: 3, maxHeight: 'calc(100vh - 100px)', overflow: 'auto' }}>
      {renderMethodHeader()}
      
      <Tabs value={activeTab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto" sx={{ mb: 3 }}>
        <Tab label="Overview" />
        <Tab label="Equipment & Chemicals" />
        <Tab label="Procedure" />
        <Tab label="Results" />
        <Tab label="Safety" />
        <Tab label="References" />
      </Tabs>
      
      <Box sx={{ p: 1 }}>
        {activeTab === 0 && (
          <>
            {renderSampleRequirements()}
          </>
        )}
        
        {activeTab === 1 && (
          <>
            {renderEquipmentAndChemicals()}
          </>
        )}
        
        {activeTab === 2 && (
          <>
            {renderProcedure()}
          </>
        )}
        
        {activeTab === 3 && (
          <>
            {renderResultsCalculation()}
          </>
        )}
        
        {activeTab === 4 && (
          <>
            {renderSafetyHazards()}
          </>
        )}
        
        {activeTab === 5 && (
          <>
            {renderReferences()}
          </>
        )}
      </Box>
    </Paper>
  );
}
