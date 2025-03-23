'use client'

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  IconButton,
  Chip,
  Divider,
  Stack,
  Avatar,
  InputAdornment,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import SampleSubmissionForm, { SampleData } from '@/components/samples/SampleSubmissionForm';

// Mock sample data for initial state
const mockSamples = [
  { 
    id: 'SAM001', 
    clientName: 'FashionCo Industries', 
    sampleName: 'Summer Cotton Blend',
    materialType: 'cotton', 
    receivedDate: new Date('2025-03-15').toISOString(),
    status: 'pending',
    priority: 'normal',
    tests: ['tensile', 'colorfastness']
  },
  { 
    id: 'SAM002', 
    clientName: 'Sportswear International', 
    sampleName: 'Performance Polyester',
    materialType: 'polyester', 
    receivedDate: new Date('2025-03-18').toISOString(),
    status: 'in_testing',
    priority: 'high',
    tests: ['abrasion', 'dimensional']
  },
  { 
    id: 'SAM003', 
    clientName: 'EcoFabrics Co', 
    sampleName: 'Organic Cotton Sample',
    materialType: 'cotton', 
    receivedDate: new Date('2025-03-10').toISOString(),
    status: 'completed',
    priority: 'normal',
    tests: ['tear', 'flammability']
  },
  { 
    id: 'SAM004', 
    clientName: 'Luxury Textiles', 
    sampleName: 'Silk Satin',
    materialType: 'silk', 
    receivedDate: new Date('2025-03-20').toISOString(),
    status: 'received',
    priority: 'normal',
    tests: ['colorfastness', 'tensile']
  },
  { 
    id: 'SAM005', 
    clientName: 'Textile Innovations Ltd', 
    sampleName: 'Technical Nylon',
    materialType: 'nylon', 
    receivedDate: new Date('2025-03-12').toISOString(),
    status: 'report_pending',
    priority: 'urgent',
    tests: ['tear', 'abrasion', 'dimensional']
  }
];

// Status definitions with colors
const statusOptions = [
  { value: 'submitted', label: 'Submitted', color: '#FFA726' }, // Orange
  { value: 'received', label: 'Received', color: '#42A5F5' },   // Blue
  { value: 'pending', label: 'In Queue', color: '#BDBDBD' },    // Gray
  { value: 'in_testing', label: 'In Testing', color: '#7E57C2' }, // Purple
  { value: 'completed', label: 'Testing Complete', color: '#66BB6A' }, // Green
  { value: 'report_pending', label: 'Report Pending', color: '#26A69A' }, // Teal
  { value: 'reported', label: 'Reported', color: '#2196F3' },   // Blue
  { value: 'archived', label: 'Archived', color: '#9E9E9E' }    // Gray
];

// Priority definitions with colors
const priorityOptions = [
  { value: 'low', label: 'Low', color: '#9E9E9E' }, // Gray
  { value: 'normal', label: 'Normal', color: '#2196F3' }, // Blue
  { value: 'high', label: 'High', color: '#FFA726' }, // Orange
  { value: 'urgent', label: 'Urgent', color: '#F44336' } // Red
];

// Material type definitions
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

// Styled components
const StatusChip = styled(Chip)(({ theme }) => ({
  fontWeight: 600,
  '& .MuiChip-label': {
    padding: '0 10px',
  }
}));

export default function SamplesPage() {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [samples, setSamples] = useState(mockSamples);
  const [filteredSamples, setFilteredSamples] = useState(mockSamples);
  
  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // Filter states
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    materialType: '',
    priority: ''
  });

  // Apply filters when filter state changes
  useEffect(() => {
    let result = [...samples];
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(sample => 
        sample.id.toLowerCase().includes(searchLower) ||
        sample.clientName.toLowerCase().includes(searchLower) ||
        sample.sampleName.toLowerCase().includes(searchLower)
      );
    }
    
    if (filters.status) {
      result = result.filter(sample => sample.status === filters.status);
    }
    
    if (filters.materialType) {
      result = result.filter(sample => sample.materialType === filters.materialType);
    }
    
    if (filters.priority) {
      result = result.filter(sample => sample.priority === filters.priority);
    }
    
    setFilteredSamples(result);
    setPage(0); // Reset to first page when filters change
  }, [filters, samples]);

  // Handle filter changes
  const handleFilterChange = (field: string, value: string) => {
    setFilters({
      ...filters,
      [field]: value
    });
  };

  // Handle pagination changes
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle form submission for creating a new sample
  const handleSubmitSample = async (data: SampleData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate sample ID (in real app, this would come from the backend)
      const sampleId = `SAM${String(samples.length + 6).padStart(3, '0')}`;
      
      // Create new sample object
      const newSample = {
        id: sampleId,
        clientName: data.clientId === '1' ? 'FashionCo Industries' : 
                   data.clientId === '2' ? 'Textile Innovations Ltd' :
                   data.clientId === '3' ? 'EcoFabrics Co' :
                   data.clientId === '4' ? 'Sportswear International' : 'Luxury Textiles',
        sampleName: data.sampleName,
        materialType: data.materialType,
        receivedDate: data.receivedDate?.toISOString() || new Date().toISOString(),
        status: 'submitted',
        priority: data.priority,
        tests: data.selectedTests
      };
      
      // Update samples list
      setSamples([...samples, newSample]);
      setShowForm(false);
      
      // TODO: Display success message
    } catch (error) {
      console.error('Error submitting sample:', error);
      // TODO: Display error message
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get status object for a sample
  const getStatusObject = (statusValue: string) => {
    return statusOptions.find(option => option.value === statusValue) || statusOptions[0];
  };

  // Get priority object for a sample
  const getPriorityObject = (priorityValue: string) => {
    return priorityOptions.find(option => option.value === priorityValue) || priorityOptions[1];
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Sample Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setShowForm(true)}
        >
          Register New Sample
        </Button>
      </Box>

      {showForm ? (
        <Box sx={{ mb: 4 }}>
          <SampleSubmissionForm
            onSubmit={handleSubmitSample}
            onCancel={() => setShowForm(false)}
            isLoading={isSubmitting}
          />
        </Box>
      ) : (
        <>
          {/* Filters */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    placeholder="Search samples..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <FormControl fullWidth size="small">
                        <InputLabel>Status</InputLabel>
                        <Select
                          value={filters.status}
                          label="Status"
                          onChange={(e) => handleFilterChange('status', e.target.value)}
                          displayEmpty
                        >
                          <MenuItem value="">All Statuses</MenuItem>
                          {statusOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    
                    <Grid item xs={4}>
                      <FormControl fullWidth size="small">
                        <InputLabel>Material</InputLabel>
                        <Select
                          value={filters.materialType}
                          label="Material"
                          onChange={(e) => handleFilterChange('materialType', e.target.value)}
                          displayEmpty
                        >
                          <MenuItem value="">All Materials</MenuItem>
                          {materialTypes.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    
                    <Grid item xs={4}>
                      <FormControl fullWidth size="small">
                        <InputLabel>Priority</InputLabel>
                        <Select
                          value={filters.priority}
                          label="Priority"
                          onChange={(e) => handleFilterChange('priority', e.target.value)}
                          displayEmpty
                        >
                          <MenuItem value="">All Priorities</MenuItem>
                          {priorityOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Samples Table */}
          <Card>
            <CardContent sx={{ px: 0 }}>
              <TableContainer>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Sample ID</TableCell>
                      <TableCell>Sample Name</TableCell>
                      <TableCell>Client</TableCell>
                      <TableCell>Material</TableCell>
                      <TableCell>Received</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Priority</TableCell>
                      <TableCell>Tests</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredSamples
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((sample) => {
                        const statusObj = getStatusObject(sample.status);
                        const priorityObj = getPriorityObject(sample.priority);
                        
                        return (
                          <TableRow key={sample.id} hover>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar 
                                  sx={{ 
                                    bgcolor: statusObj.color + '20', 
                                    color: statusObj.color,
                                    width: 32, 
                                    height: 32,
                                    mr: 1.5,
                                    fontSize: '0.875rem'
                                  }}
                                >
                                  {sample.id.substring(3, 5)}
                                </Avatar>
                                <Typography variant="body2" fontWeight="500">
                                  {sample.id}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>{sample.sampleName}</TableCell>
                            <TableCell>{sample.clientName}</TableCell>
                            <TableCell>
                              {materialTypes.find(m => m.value === sample.materialType)?.label || sample.materialType}
                            </TableCell>
                            <TableCell>
                              {new Date(sample.receivedDate).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <StatusChip 
                                label={statusObj.label}
                                size="small"
                                sx={{ 
                                  bgcolor: `${statusObj.color}20`,
                                  color: statusObj.color
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                {priorityObj.value === 'urgent' && (
                                  <PriorityHighIcon 
                                    fontSize="small" 
                                    sx={{ color: priorityObj.color, mr: 0.5 }} 
                                  />
                                )}
                                <Typography 
                                  variant="body2" 
                                  sx={{ 
                                    color: priorityObj.color,
                                    fontWeight: priorityObj.value === 'urgent' || priorityObj.value === 'high' ? 600 : 400
                                  }}
                                >
                                  {priorityObj.label}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Stack direction="row" spacing={0.5} flexWrap="wrap">
                                {sample.tests.slice(0, 2).map((test, index) => (
                                  <Chip 
                                    key={`${sample.id}-${test}-${index}`}
                                    label={test}
                                    size="small"
                                    variant="outlined"
                                    sx={{ 
                                      height: 20, 
                                      fontSize: '0.7rem', 
                                      '& .MuiChip-label': { px: 1 } 
                                    }}
                                  />
                                ))}
                                {sample.tests.length > 2 && (
                                  <Chip
                                    label={`+${sample.tests.length - 2}`}
                                    size="small"
                                    variant="outlined"
                                    sx={{ 
                                      height: 20, 
                                      fontSize: '0.7rem', 
                                      '& .MuiChip-label': { px: 1 } 
                                    }}
                                  />
                                )}
                              </Stack>
                            </TableCell>
                            <TableCell align="right">
                              <IconButton 
                                size="small" 
                                color="primary"
                                aria-label="view sample details"
                              >
                                <VisibilityIcon fontSize="small" />
                              </IconButton>
                              <IconButton 
                                size="small"
                                aria-label="more options"
                              >
                                <MoreVertIcon fontSize="small" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {filteredSamples.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={9} align="center" sx={{ py: 3 }}>
                          <Box sx={{ textAlign: 'center' }}>
                            <AssignmentIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
                            <Typography variant="h6" color="text.secondary" gutterBottom>
                              No samples found
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Try adjusting your filters or create a new sample
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredSamples.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </CardContent>
          </Card>
          
          {/* Sample Cards View (Alternative) */}
          {/* <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>Recent Samples</Typography>
            <Grid container spacing={2}>
              {filteredSamples.slice(0, 4).map(sample => {
                const statusObj = getStatusObject(sample.status);
                return (
                  <Grid item xs={12} sm={6} md={3} key={sample.id}>
                    <Card sx={{ height: '100%' }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                          <Typography variant="h6">{sample.id}</Typography>
                          <StatusChip 
                            label={statusObj.label}
                            size="small"
                            sx={{ 
                              bgcolor: `${statusObj.color}20`,
                              color: statusObj.color
                            }}
                          />
                        </Box>
                        <Typography gutterBottom>{sample.sampleName}</Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {sample.clientName}
                        </Typography>
                        <Divider sx={{ my: 1.5 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="caption" color="text.secondary">
                            {new Date(sample.receivedDate).toLocaleDateString()}
                          </Typography>
                          <Button size="small" color="primary">
                            Details
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Box> */}
        </>
      )}
    </Box>
  );
}
