'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  CardHeader, 
  TextField, 
  Typography, 
  Grid, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  FormHelperText,
  Divider,
  IconButton,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Alert,
  CircularProgress
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { styled } from '@mui/material/styles';

// Material types options
const materialTypes = [
  { value: 'cotton', label: 'Cotton' },
  { value: 'polyester', label: 'Polyester' },
  { value: 'silk', label: 'Silk' },
  { value: 'wool', label: 'Wool' },
  { value: 'nylon', label: 'Nylon' },
  { value: 'linen', label: 'Linen' },
  { value: 'rayon', label: 'Rayon' },
  { value: 'blend', label: 'Blend' },
  { value: 'other', label: 'Other' }
];

// Test types
const testTypes = [
  { value: 'tensile', label: 'Tensile Strength', category: 'physical' },
  { value: 'tear', label: 'Tear Resistance', category: 'physical' },
  { value: 'abrasion', label: 'Abrasion Resistance', category: 'physical' },
  { value: 'colorfastness', label: 'Color Fastness to Washing', category: 'colorfastness' },
  { value: 'lightfastness', label: 'Color Fastness to Light', category: 'colorfastness' },
  { value: 'dimensional', label: 'Dimensional Stability', category: 'stability' },
  { value: 'pilling', label: 'Pilling Resistance', category: 'appearance' },
  { value: 'flammability', label: 'Flammability', category: 'safety' }
];

// Mock clients (would come from API in real implementation)
const clients = [
  { id: '1', name: 'FashionCo Industries' },
  { id: '2', name: 'Textile Innovations Ltd' },
  { id: '3', name: 'EcoFabrics Co' },
  { id: '4', name: 'SportswearInternational' },
  { id: '5', name: 'LuxuryTextiles' }
];

// Priority levels
const priorityLevels = [
  { value: 'low', label: 'Low' },
  { value: 'normal', label: 'Normal' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' }
];

// Styled components for file upload
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

// Form steps
const steps = ['Sample Information', 'Test Selection', 'Additional Details', 'Review & Submit'];

export interface SampleData {
  clientId: string;
  sampleName: string;
  receivedDate: string;
  materialType: string;
  color: string;
  fabricConstruction: string;
  weight: string;
  width: string;
  batchNumber: string;
  selectedTests: string[];
  priority: string;
  dueDate: string;
  specialInstructions: string;
  images: File[];
}

interface SampleSubmissionFormProps {
  onSubmit: (data: SampleData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function SampleSubmissionForm({ onSubmit, onCancel, isLoading = false }: SampleSubmissionFormProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<SampleData>({
    clientId: '',
    sampleName: '',
    receivedDate: '',
    materialType: '',
    color: '',
    fabricConstruction: '',
    weight: '',
    width: '',
    batchNumber: '',
    selectedTests: [],
    priority: 'normal',
    dueDate: '',
    specialInstructions: '',
    images: []
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadedImagePreviews, setUploadedImagePreviews] = useState<string[]>([]);

  // Handle form field changes
  const handleChange = (field: keyof SampleData, value: any) => {
    setFormData({ ...formData, [field]: value });
    
    // Clear error when field is edited
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;
    
    const newFiles = Array.from(event.target.files);
    const updatedImages = [...formData.images, ...newFiles].slice(0, 5); // Limit to 5 images
    
    // Create preview URLs
    const newPreviews = newFiles.map(file => URL.createObjectURL(file));
    setUploadedImagePreviews([...uploadedImagePreviews, ...newPreviews]);
    
    setFormData({ ...formData, images: updatedImages });
  };

  // Remove an uploaded image
  const handleRemoveImage = (index: number) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    
    const newPreviews = [...uploadedImagePreviews];
    URL.revokeObjectURL(newPreviews[index]); // Free memory
    newPreviews.splice(index, 1);
    
    setFormData({ ...formData, images: newImages });
    setUploadedImagePreviews(newPreviews);
  };

  // Handle test selection
  const handleTestSelection = (testValue: string) => {
    const currentTests = [...formData.selectedTests];
    const testIndex = currentTests.indexOf(testValue);
    
    if (testIndex === -1) {
      currentTests.push(testValue);
    } else {
      currentTests.splice(testIndex, 1);
    }
    
    setFormData({ ...formData, selectedTests: currentTests });
  };

  // Validate current step
  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    
    if (activeStep === 0) {
      if (!formData.clientId) newErrors.clientId = 'Client is required';
      if (!formData.sampleName) newErrors.sampleName = 'Sample name is required';
      if (!formData.materialType) newErrors.materialType = 'Material type is required';
    } else if (activeStep === 1) {
      if (!formData.selectedTests.length) newErrors.selectedTests = 'At least one test must be selected';
    } else if (activeStep === 2) {
      if (!formData.priority) newErrors.priority = 'Priority is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Navigate to next step
  const handleNext = () => {
    if (validateStep()) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  // Navigate to previous step
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep()) {
      await onSubmit(formData);
    }
  };

  return (
    <Card elevation={2}>
      <CardHeader 
        title="Register New Sample" 
        titleTypographyProps={{ variant: 'h5' }}
        action={
          <IconButton onClick={onCancel}>
            <CloseIcon />
          </IconButton>
        }
      />
      <CardContent>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box component="form" onSubmit={handleSubmit}>
          {activeStep === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={!!errors.clientId}>
                  <InputLabel id="client-select-label">Client</InputLabel>
                  <Select
                    labelId="client-select-label"
                    value={formData.clientId}
                    label="Client"
                    onChange={(e) => handleChange('clientId', e.target.value)}
                  >
                    {clients.map((client) => (
                      <MenuItem key={client.id} value={client.id}>{client.name}</MenuItem>
                    ))}
                  </Select>
                  {errors.clientId && <FormHelperText>{errors.clientId}</FormHelperText>}
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  label="Received Date"
                  type="date"
                  value={formData.receivedDate}
                  onChange={(e) => handleChange('receivedDate', e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  label="Sample Name"
                  fullWidth
                  value={formData.sampleName}
                  onChange={(e) => handleChange('sampleName', e.target.value)}
                  error={!!errors.sampleName}
                  helperText={errors.sampleName}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={!!errors.materialType}>
                  <InputLabel id="material-select-label">Material Type</InputLabel>
                  <Select
                    labelId="material-select-label"
                    value={formData.materialType}
                    label="Material Type"
                    onChange={(e) => handleChange('materialType', e.target.value)}
                  >
                    {materialTypes.map((material) => (
                      <MenuItem key={material.value} value={material.value}>{material.label}</MenuItem>
                    ))}
                  </Select>
                  {errors.materialType && <FormHelperText>{errors.materialType}</FormHelperText>}
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  label="Color"
                  fullWidth
                  value={formData.color}
                  onChange={(e) => handleChange('color', e.target.value)}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  label="Fabric Construction"
                  fullWidth
                  placeholder="e.g., Plain Weave, Twill, etc."
                  value={formData.fabricConstruction}
                  onChange={(e) => handleChange('fabricConstruction', e.target.value)}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  label="Weight (g/m²)"
                  fullWidth
                  type="number"
                  value={formData.weight}
                  onChange={(e) => handleChange('weight', e.target.value)}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  label="Width (cm)"
                  fullWidth
                  type="number"
                  value={formData.width}
                  onChange={(e) => handleChange('width', e.target.value)}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  label="Batch/Lot Number"
                  fullWidth
                  value={formData.batchNumber}
                  onChange={(e) => handleChange('batchNumber', e.target.value)}
                />
              </Grid>
            </Grid>
          )}

          {activeStep === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Select Required Tests
              </Typography>
              {errors.selectedTests && (
                <Alert severity="error" sx={{ mb: 2 }}>{errors.selectedTests}</Alert>
              )}
              
              <Grid container spacing={2}>
                {testTypes.map((test) => (
                  <Grid item xs={12} sm={6} md={4} key={test.value}>
                    <Paper
                      elevation={formData.selectedTests.includes(test.value) ? 3 : 1}
                      sx={{
                        p: 2,
                        border: formData.selectedTests.includes(test.value) ? 2 : 1,
                        borderColor: formData.selectedTests.includes(test.value) ? 'primary.main' : 'divider',
                        borderRadius: 1,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          borderColor: 'primary.main',
                        },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                      onClick={() => handleTestSelection(test.value)}
                    >
                      <Box>
                        <Typography variant="subtitle1">{test.label}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Category: {test.category}
                        </Typography>
                      </Box>
                      {formData.selectedTests.includes(test.value) && (
                        <CheckCircleOutlineIcon color="primary" />
                      )}
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {activeStep === 2 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={!!errors.priority}>
                  <InputLabel id="priority-select-label">Priority</InputLabel>
                  <Select
                    labelId="priority-select-label"
                    value={formData.priority}
                    label="Priority"
                    onChange={(e) => handleChange('priority', e.target.value)}
                  >
                    {priorityLevels.map((priority) => (
                      <MenuItem key={priority.value} value={priority.value}>{priority.label}</MenuItem>
                    ))}
                  </Select>
                  {errors.priority && <FormHelperText>{errors.priority}</FormHelperText>}
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  label="Due Date"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => handleChange('dueDate', e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  label="Special Instructions"
                  fullWidth
                  multiline
                  rows={4}
                  value={formData.specialInstructions}
                  onChange={(e) => handleChange('specialInstructions', e.target.value)}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Upload Sample Images (maximum 5)
                </Typography>
                
                <Box sx={{ mb: 2 }}>
                  <Button
                    component="label"
                    variant="outlined"
                    startIcon={<CloudUploadIcon />}
                    disabled={formData.images.length >= 5}
                  >
                    Upload Images
                    <VisuallyHiddenInput 
                      type="file" 
                      onChange={handleImageUpload} 
                      accept="image/*"
                      multiple
                    />
                  </Button>
                  <FormHelperText>
                    {formData.images.length}/5 images uploaded
                  </FormHelperText>
                </Box>
                
                {uploadedImagePreviews.length > 0 && (
                  <Grid container spacing={1}>
                    {uploadedImagePreviews.map((preview, index) => (
                      <Grid item key={index} xs={6} sm={4} md={3}>
                        <Paper
                          sx={{
                            position: 'relative',
                            height: 140,
                            overflow: 'hidden',
                            borderRadius: 1
                          }}
                        >
                          <Box
                            component="img"
                            src={preview}
                            sx={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover'
                            }}
                          />
                          <IconButton
                            size="small"
                            sx={{
                              position: 'absolute',
                              top: 4,
                              right: 4,
                              backgroundColor: 'rgba(255,255,255,0.7)',
                              '&:hover': {
                                backgroundColor: 'rgba(255,255,255,0.9)',
                              }
                            }}
                            onClick={() => handleRemoveImage(index)}
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Grid>
            </Grid>
          )}

          {activeStep === 3 && (
            <Box>
              <Typography variant="h6" gutterBottom>Review Sample Information</Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="subtitle1" color="primary" gutterBottom>
                      Basic Information
                    </Typography>
                    <Typography variant="body2">
                      <strong>Client:</strong> {clients.find(c => c.id === formData.clientId)?.name || 'Not selected'}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Sample Name:</strong> {formData.sampleName}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Received Date:</strong> {formData.receivedDate}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Material Type:</strong> {materialTypes.find(m => m.value === formData.materialType)?.label || 'Not selected'}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Color:</strong> {formData.color || 'Not provided'}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Batch/Lot:</strong> {formData.batchNumber || 'Not provided'}
                    </Typography>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="subtitle1" color="primary" gutterBottom>
                      Testing Details
                    </Typography>
                    <Typography variant="body2">
                      <strong>Selected Tests:</strong> {formData.selectedTests.length === 0 
                        ? 'None selected' 
                        : formData.selectedTests.map(t => 
                            testTypes.find(test => test.value === t)?.label).join(', ')}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Priority:</strong> {priorityLevels.find(p => p.value === formData.priority)?.label || 'Normal'}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Due Date:</strong> {formData.dueDate || 'Not specified'}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Images:</strong> {formData.images.length} uploaded
                    </Typography>
                    <Typography variant="body2">
                      <strong>Special Instructions:</strong> {formData.specialInstructions || 'None provided'}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
              
              {uploadedImagePreviews.length > 0 && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" color="primary" gutterBottom>Sample Images</Typography>
                  <Grid container spacing={1}>
                    {uploadedImagePreviews.map((preview, index) => (
                      <Grid item key={index} xs={6} sm={3} md={2}>
                        <Paper
                          sx={{
                            height: 100,
                            overflow: 'hidden',
                            borderRadius: 1
                          }}
                        >
                          <Box
                            component="img"
                            src={preview}
                            sx={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover'
                            }}
                          />
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
            </Box>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              variant="outlined"
              onClick={activeStep === 0 ? onCancel : handleBack}
              startIcon={activeStep > 0 ? <NavigateBeforeIcon /> : undefined}
            >
              {activeStep === 0 ? 'Cancel' : 'Back'}
            </Button>
            
            <Box>
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isLoading}
                  endIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : undefined}
                >
                  Submit Sample
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  endIcon={<NavigateNextIcon />}
                >
                  Next
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
