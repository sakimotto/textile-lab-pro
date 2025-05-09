'use client';

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  LinearProgress,
} from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import KPICard from '@/components/common/KPICard';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ScienceIcon from '@mui/icons-material/Science';
import TimerIcon from '@mui/icons-material/Timer';
import BuildIcon from '@mui/icons-material/Build';

// Mock data for test status
const testStatusData = [
  { name: 'Completed', value: 540, color: '#4caf50' },
  { name: 'In Progress', value: 210, color: '#2196f3' },
  { name: 'Pending', value: 175, color: '#ff9800' },
  { name: 'Failed', value: 45, color: '#f44336' },
  { name: 'Cancelled', value: 30, color: '#9e9e9e' },
];

// Mock data for Industry KPIs
const industryKPIs = [
  {
    sector: 'Automotive',
    metrics: [
      { label: 'Tests Completed', value: 124 },
      { label: 'Pass Rate', value: '92%' },
      { label: 'Avg. TAT', value: '48h' },
    ],
  },
  {
    sector: 'Sportswear',
    metrics: [
      { label: 'Tests Completed', value: 89 },
      { label: 'Pass Rate', value: '88%' },
      { label: 'Avg. TAT', value: '36h' },
    ],
  },
  {
    sector: 'Camping',
    metrics: [
      { label: 'Tests Completed', value: 67 },
      { label: 'Pass Rate', value: '94%' },
      { label: 'Avg. TAT', value: '24h' },
    ],
  },
];

export default function DashboardOverview() {
  const totalTests = testStatusData.reduce((sum, item) => sum + item.value, 0);
  const completedTests = testStatusData.find(item => item.name === 'Completed')?.value || 0;
  const completionRate = ((completedTests / totalTests) * 100).toFixed(1);

  return (
    <Box>
      <Grid container spacing={3}>
        {/* KPI Cards */}
        <Grid item xs={12} md={6} lg={3}>
          <KPICard 
            title="Tests Completed" 
            value={completedTests}
            subtitle={`${completionRate}% completion rate`}
            icon={CheckCircleIcon}
            color="#4caf50"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <KPICard
            title="Active Tests"
            value={testStatusData.find(item => item.name === 'In Progress')?.value || 0}
            subtitle="Currently in progress"
            icon={ScienceIcon}
            color="#2196f3"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <KPICard
            title="Average TAT"
            value="24h"
            subtitle="Turnaround time"
            icon={TimerIcon}
            color="#ff9800"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <KPICard
            title="Equipment Status"
            value="92%"
            subtitle="Operational rate"
            icon={BuildIcon}
            color="#9c27b0"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Test Status Distribution" />
            <CardContent>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={testStatusData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                    >
                      {testStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </Box>
              <Box sx={{ mt: 2 }}>
                {testStatusData.map((entry) => (
                  <Box key={entry.name} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        backgroundColor: entry.color,
                        mr: 1,
                      }}
                    />
                    <Typography variant="body2" sx={{ mr: 2 }}>
                      {entry.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {entry.value} tests
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Industry KPIs" />
            <CardContent>
              {industryKPIs.map((industry) => (
                <Box key={industry.sector} sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    {industry.sector}
                  </Typography>
                  {industry.metrics.map((metric) => (
                    <Box key={metric.label} sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          {metric.label}
                        </Typography>
                        <Typography variant="body2">
                          {metric.value}
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={typeof metric.value === 'string' ? parseInt(metric.value) : (metric.value / 200) * 100}
                        sx={{ height: 6, borderRadius: 3 }}
                      />
                    </Box>
                  ))}
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
