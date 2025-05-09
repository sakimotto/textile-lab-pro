'use client';

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

const monthlyData = [
  { month: 'Jan', tests: 120, samples: 85, turnaround: 36 },
  { month: 'Feb', tests: 150, samples: 95, turnaround: 32 },
  { month: 'Mar', tests: 180, samples: 120, turnaround: 28 },
  { month: 'Apr', tests: 165, samples: 110, turnaround: 30 },
  { month: 'May', tests: 190, samples: 130, turnaround: 24 },
];

export default function Analytics() {
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Monthly Test Volume" />
            <CardContent>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="tests" name="Tests" fill="#1976d2" />
                    <Bar dataKey="samples" name="Samples" fill="#2196f3" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardHeader title="Average Turnaround Time (Hours)" />
            <CardContent>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="turnaround"
                      name="Turnaround Time"
                      stroke="#4caf50"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
