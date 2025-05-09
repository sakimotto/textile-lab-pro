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
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { TestStandard, mockTestStandards } from '@/lib/models/test-standard';

export default function TestStandardsPage() {
  const [standards, setStandards] = useState<TestStandard[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStandard, setSelectedStandard] = useState<TestStandard | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  useEffect(() => {
    setStandards(mockTestStandards);
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleViewDetails = (standard: TestStandard) => {
    setSelectedStandard(standard);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
  };

  const filteredStandards = standards.filter((standard) =>
    standard.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    standard.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    standard.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    standard.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Test Standards Library
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by name, code, organization, or category..."
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
        {filteredStandards.map((standard) => (
          <Grid item xs={12} sm={6} md={4} key={standard.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {standard.code}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {standard.name}
                </Typography>
                <Box sx={{ mt: 1, mb: 1 }}>
                  <Chip 
                    label={standard.organization} 
                    size="small" 
                    color="primary" 
                    sx={{ mr: 1 }} 
                  />
                  <Chip 
                    label={standard.category} 
                    size="small"
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {standard.description.substring(0, 120)}...
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  startIcon={<VisibilityIcon />}
                  onClick={() => handleViewDetails(standard)}
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={isDetailsOpen}
        onClose={handleCloseDetails}
        fullWidth
        maxWidth="md"
      >
        {selectedStandard && (
          <>
            <DialogTitle>
              <Typography variant="h6">
                {selectedStandard.code} - {selectedStandard.name}
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Description
                </Typography>
                <Typography variant="body1" paragraph>
                  {selectedStandard.description}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Organization
                    </Typography>
                    <Typography variant="body1">
                      {selectedStandard.organization}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Category
                    </Typography>
                    <Typography variant="body1">
                      {selectedStandard.category}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Version
                    </Typography>
                    <Typography variant="body1">
                      {selectedStandard.version}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Last Updated
                    </Typography>
                    <Typography variant="body1">
                      {new Date(selectedStandard.lastUpdated).toLocaleDateString()}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Required Equipment
                </Typography>
                <List>
                  {selectedStandard.equipment.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
              </Box>

              <Divider sx={{ my: 2 }} />
              
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Applicable Materials
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {selectedStandard.applicableMaterials.map((material, index) => (
                    <Chip key={index} label={material} />
                  ))}
                </Box>
              </Box>
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
