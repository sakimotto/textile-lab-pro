'use client';

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  Chip,
  LinearProgress,
} from '@mui/material';

const mockEquipment = [
  {
    id: 'EQ001',
    name: 'Tensile Testing Machine',
    model: 'TT-5000',
    status: 'Operational',
    nextCalibration: '2025-06-15',
    utilization: 78,
  },
  {
    id: 'EQ002',
    name: 'Color Fastness Tester',
    model: 'CF-2000',
    status: 'Maintenance',
    nextCalibration: '2025-05-20',
    utilization: 45,
  },
  {
    id: 'EQ003',
    name: 'Fabric Strength Tester',
    model: 'FS-3000',
    status: 'Operational',
    nextCalibration: '2025-07-01',
    utilization: 92,
  },
];

export default function EquipmentOverview() {
  return (
    <Box>
      <Grid container spacing={3}>
        {mockEquipment.map((equipment) => (
          <Grid item xs={12} md={4} key={equipment.id}>
            <Card>
              <CardHeader
                title={equipment.name}
                subheader={equipment.model}
                action={
                  <Chip
                    label={equipment.status}
                    color={equipment.status === 'Operational' ? 'success' : 'warning'}
                    size="small"
                  />
                }
              />
              <CardContent>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Next Calibration: {equipment.nextCalibration}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Utilization
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={equipment.utilization}
                      sx={{ flexGrow: 1 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {equipment.utilization}%
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
