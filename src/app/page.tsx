'use client';

import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import ScienceIcon from '@mui/icons-material/Science';
import BuildIcon from '@mui/icons-material/Build';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import KPICard from '@/components/dashboard/KPICard';
import ChartContainer from '@/components/charts/ChartContainer';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Sample data - Replace with API calls later
const testData = [
  { name: 'Jan', automotive: 42, sportswear: 35, camping: 28 },
  { name: 'Feb', automotive: 45, sportswear: 38, camping: 30 },
  { name: 'Mar', automotive: 52, sportswear: 43, camping: 32 },
  { name: 'Apr', automotive: 48, sportswear: 40, camping: 35 },
  { name: 'May', automotive: 50, sportswear: 45, camping: 38 },
  { name: 'Jun', automotive: 55, sportswear: 48, camping: 40 },
];

const statusData = [
  { name: 'Completed', value: 540, color: '#4CAF50' },
  { name: 'In Progress', value: 210, color: '#2196F3' },
  { name: 'Scheduled', value: 175, color: '#FF9800' },
  { name: 'Failed', value: 45, color: '#F44336' },
  { name: 'Cancelled', value: 30, color: '#9E9E9E' },
];

export default function Home() {
  return (
    <Box sx={{ py: 3 }}>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      
      {/* KPI Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6} lg={3}>
          <KPICard 
            title="Tests Completed"
            value="1,042"
            change={8.2}
            subtitle="vs previous month"
            icon={<CheckCircleIcon fontSize="small" />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <KPICard 
            title="Active Tests"
            value="87"
            change={-2.5}
            subtitle="vs previous month"
            icon={<ScienceIcon fontSize="small" />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <KPICard 
            title="Avg. Processing Time"
            value="24h"
            change={-12.3}
            subtitle="vs previous month"
            icon={<CalendarMonthIcon fontSize="small" />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <KPICard 
            title="Equipment Operational"
            value="92%"
            change={3.1}
            subtitle="vs previous month"
            icon={<BuildIcon fontSize="small" />}
          />
        </Grid>
      </Grid>
      
      {/* Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <ChartContainer 
            title="Monthly Test Volume" 
            subtitle="Test count by industry category"
            height={350}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={testData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="automotive" name="Automotive" fill="#1976D2" radius={[4, 4, 0, 0]} />
                <Bar dataKey="sportswear" name="Sportswear" fill="#00C853" radius={[4, 4, 0, 0]} />
                <Bar dataKey="camping" name="Camping" fill="#FF9800" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Grid>
        <Grid item xs={12} lg={4}>
          <ChartContainer 
            title="Test Status Distribution" 
            subtitle="Current status of all tests"
            height={350}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Grid>
      </Grid>
      
      {/* Recent Tests Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>Recent Tests</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ChartContainer 
              title="Latest Test Results" 
              subtitle="Last 5 tests conducted"
              height={200}
            >
              <Box sx={{ width: '100%', p: 2 }}>
                <Typography variant="body1" color="text.secondary" textAlign="center">
                  Test result data will be populated from API
                </Typography>
              </Box>
            </ChartContainer>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}