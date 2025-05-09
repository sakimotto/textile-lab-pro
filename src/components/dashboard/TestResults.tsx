'use client';

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from '@mui/material';

const mockTestResults = [
  {
    id: 'T001',
    standard: 'ISO 105-C10',
    sample: 'Cotton Fabric',
    client: 'Automotive Inc.',
    date: '2025-05-08',
    status: 'Passed',
  },
  {
    id: 'T002',
    standard: 'ASTM D1424',
    sample: 'Polyester Blend',
    client: 'SportTech Ltd.',
    date: '2025-05-08',
    status: 'Failed',
  },
  {
    id: 'T003',
    standard: 'AATCC 61',
    sample: 'Nylon',
    client: 'OutdoorGear Co.',
    date: '2025-05-07',
    status: 'Passed',
  },
];

export default function TestResults() {
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Recent Test Results" />
            <CardContent>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Test ID</TableCell>
                      <TableCell>Standard</TableCell>
                      <TableCell>Sample</TableCell>
                      <TableCell>Client</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockTestResults.map((test) => (
                      <TableRow key={test.id}>
                        <TableCell>{test.id}</TableCell>
                        <TableCell>{test.standard}</TableCell>
                        <TableCell>{test.sample}</TableCell>
                        <TableCell>{test.client}</TableCell>
                        <TableCell>{test.date}</TableCell>
                        <TableCell>
                          <Chip
                            label={test.status}
                            color={test.status === 'Passed' ? 'success' : 'error'}
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
