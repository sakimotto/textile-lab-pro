'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Stack,
  Chip,
} from '@mui/material'
import {
  Science as ScienceIcon,
  Assignment as AssignmentIcon,
  People as PeopleIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material'
import { useStore } from '@/lib/store'

interface TestRequest {
  client: string
  test: string
  date: Date
}

const INITIAL_REQUESTS: TestRequest[] = [
  { client: 'DenimCo', test: 'Colorfastness Test', date: new Date() },
  { client: 'TechWear', test: 'Abrasion Resistance', date: new Date() },
  { client: 'SustainableFabrics', test: 'Environmental Impact Assessment', date: new Date() }
]

export function DashboardContent() {
  const { tests, samples, clients } = useStore()

  const stats = [
    {
      title: 'Active Tests',
      value: tests.filter((t) => t.status === 'In Progress').length,
      icon: <ScienceIcon />,
      color: '#2196f3',
    },
    {
      title: 'Pending Samples',
      value: samples.filter((s) => s.status === 'Pending').length,
      icon: <AssignmentIcon />,
      color: '#ff9800',
    },
    {
      title: 'Total Clients',
      value: clients.length,
      icon: <PeopleIcon />,
      color: '#4caf50',
    },
  ]

  const recentTests = tests
    .sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime())
    .slice(0, 5)

  const [latestRequests] = useState<TestRequest[]>(INITIAL_REQUESTS)
  const [jobsInWork] = useState<TestRequest[]>(INITIAL_REQUESTS.slice(0, 2))

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Advanced Textile Testing Laboratory
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={4} key={stat.title}>
            <Card>
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: stat.color + '20',
                      color: stat.color,
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Box>
                    <Typography variant="h5">{stat.value}</Typography>
                    <Typography color="text.secondary">{stat.title}</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Latest Requests
            </Typography>
            <List>
              {latestRequests.map((request, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <ScheduleIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={request.client}
                    secondary={request.test}
                  />
                  <Chip
                    label={format(request.date, 'MMM dd')}
                    color="info"
                    size="small"
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Jobs in Work
            </Typography>
            <List>
              {jobsInWork.map((job, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <ScheduleIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={job.client}
                    secondary={job.test}
                  />
                  <Chip
                    label={format(job.date, 'MMM dd')}
                    color="info"
                    size="small"
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
