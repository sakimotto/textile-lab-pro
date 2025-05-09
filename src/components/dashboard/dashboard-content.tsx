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
  Skeleton,
  LinearProgress,
  Tooltip
} from '@mui/material'
import ChecklistIcon from '@mui/icons-material/Checklist';
import CircleIcon from '@mui/icons-material/Circle';
import { useTaskStore } from '@/lib/stores/taskStore';
import { TASK_STATUSES } from '@/lib/schemas/task';
import TaskStatusPie from './TaskStatusPie';
import TaskRecentList from './TaskRecentList';
import Link from 'next/link';
import { ErrorBoundary } from 'react-error-boundary';
import {
  Science as ScienceIcon,
  Assignment as AssignmentIcon,
  People as PeopleIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material'
import { useStore } from '@/lib/store'
import { mockTestStandards } from '@/lib/models/test-standard'
import MenuBookIcon from '@mui/icons-material/MenuBook'

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
  const { tests, samples, clients, loading, equipment, queue } = useStore()
  const { tasks } = useTaskStore();

  // Task summary stats
  const totalTasks = tasks.length;
  const taskStatusCounts = TASK_STATUSES.map(status => ({
    status,
    count: tasks.filter(task => task.status === status).length
  }));

  const stats = [
    {
      title: 'Test Standards',
      value: mockTestStandards.length,
      icon: <MenuBookIcon />,
      color: '#9c27b0',
      link: '/test-standards',
    },
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
    {
      title: 'Tasks',
      value: totalTasks,
      icon: <ChecklistIcon />,
      isTask: true,
      color: '#1976d2',
      extra: (
        <>
          {tasks.length === 0 ? (
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              No tasks found
            </Typography>
          ) : (
            <>
              <Stack direction="row" spacing={1} mt={1}>
                {taskStatusCounts.map(({ status, count }) => (
                  <Tooltip key={status} title={`Tasks with status: ${status}`}> 
                    <Chip
                      label={`${status}: ${count}`}
                      color={
                        status === 'Completed' ? 'success'
                          : status === 'Blocked' ? 'error'
                          : status === 'In Progress' ? 'info'
                          : status === 'Todo' ? 'default'
                          : 'default'
                      }
                      size="small"
                    />
                  </Tooltip>
                ))}
              </Stack>
              <Box sx={{ mt: 1 }}>
                {/* Error boundary for chart */}
                <ErrorBoundary fallback={<Typography color="error">Chart error</Typography>}>
                  <TaskStatusPie data={taskStatusCounts} />
                </ErrorBoundary>
              </Box>
              <Typography variant="subtitle2" mt={2} mb={0.5}>Recent Tasks</Typography>
              {/* Error boundary for recent list */}
              <ErrorBoundary fallback={<Typography color="error">List error</Typography>}>
                <TaskRecentList tasks={tasks.slice(-3).reverse()} />
              </ErrorBoundary>
            </>
          )}
        </>
      ),
    },
    {
      title: 'Equipment Status',
      value: equipment.isOperational ? 'Operational' : 'Maintenance',
      icon: <CircleIcon />,
      color: equipment.isOperational ? '#4caf50' : '#ff9800',
      extra: (
        <Box sx={{ mt: 1 }}>
          <Tooltip title={equipment.isOperational ? 'Last calibrated: Today' : 'Needs calibration'}>
            <Chip 
              label={equipment.isOperational ? 'Operational' : 'Maintenance'} 
              size="small"
              color={equipment.isOperational ? 'success' : 'warning'}
              icon={<CircleIcon fontSize="small" sx={{ color: equipment.isOperational ? '#4caf50' : '#ff9800' }} />}
            />
          </Tooltip>
          
          <Box sx={{ mt: 2, mb: 1 }}>
            <Typography variant="caption" color="text.secondary">
              {queue.count} samples in queue ({queue.progress}% capacity)
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={queue.progress} 
              color={queue.progress > 75 ? 'warning' : 'success'}
              sx={{ height: 8, borderRadius: 2 }}
            />
          </Box>
        </Box>
      ),
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
        {/* Add clickability to all summary cards for navigation */}
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            {stat.title === 'Tasks' ? (
              <Link href="/tasks" style={{ textDecoration: 'none' }}>
                <Card 
                  sx={{
                    cursor: 'pointer',
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: 3,
                      transform: 'translateY(-2px)',
                      backgroundColor: stat.color + '10'
                    }
                  }}
                >
                  <CardContent>
                    {loading.tests ? (
                      <Stack spacing={2}>
                        <Skeleton variant="rounded" width="60%" height={24} />
                        <Skeleton variant="text" width="40%" />
                      </Stack>
                    ) : (
                      <Stack direction="row" spacing={2} alignItems="flex-start">
                        <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: stat.color + '20', color: stat.color }}>
                          {stat.icon}
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h5">{stat.value}</Typography>
                          <Typography color="text.secondary">{stat.title}</Typography>
                          {stat.extra}
                        </Box>
                      </Stack>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ) : (
              <Link href={stat.title === 'Active Tests' ? '/tests' : stat.title === 'Pending Samples' ? '/samples' : stat.title === 'Total Clients' ? '/clients' : '/equipment'} style={{ textDecoration: 'none' }}>
                <Card 
                  sx={{
                    cursor: 'pointer',
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: 3,
                      transform: 'translateY(-2px)',
                      backgroundColor: stat.color + '10'
                    }
                  }}
                >
                  <CardContent>
                    {loading.tests ? (
                      <Stack spacing={2}>
                        <Skeleton variant="rounded" width="60%" height={24} />
                        <Skeleton variant="text" width="40%" />
                      </Stack>
                    ) : (
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: stat.color + '20', color: stat.color }}>
                          {stat.icon}
                        </Box>
                        <Box>
                          <Typography variant="h5">{stat.value}</Typography>
                          <Typography color="text.secondary">{stat.title}</Typography>
                          {stat.extra}
                        </Box>
                      </Stack>
                    )}
                  </CardContent>
                </Card>
              </Link>
            )}
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper 
            sx={{
              p: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: 3,
                transform: 'translateY(-2px)',
                backgroundColor: 'action.hover'
              }
            }}
          >
            <Typography variant="h6" gutterBottom>
              {loading.tests ? <Skeleton width="40%" /> : 'Latest Requests'}
            </Typography>
            <List>
              {loading.tests ? (
                Array(3).fill(0).map((_, i) => (
                  <ListItem key={i}>
                    <Skeleton variant="circular" width={40} height={40} />
                    <ListItemText 
                      primary={<Skeleton width="60%" />} 
                      secondary={<Skeleton width="30%" />} 
                    />
                  </ListItem>
                ))
              ) : (
                latestRequests.map((request, index) => (
                  <ListItem key={index} sx={{ cursor: 'pointer' }}>
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
                ))
              )}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper 
            sx={{
              p: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: 3,
                transform: 'translateY(-2px)',
                backgroundColor: 'action.hover'
              }
            }}
          >
            <Typography variant="h6" gutterBottom>
              {loading.tests ? <Skeleton width="40%" /> : 'Jobs in Work'}
            </Typography>
            <List>
              {loading.tests ? (
                Array(3).fill(0).map((_, i) => (
                  <ListItem key={i}>
                    <Skeleton variant="circular" width={40} height={40} />
                    <ListItemText 
                      primary={<Skeleton width="60%" />} 
                      secondary={<Skeleton width="30%" />} 
                    />
                  </ListItem>
                ))
              ) : (
                jobsInWork.map((job, index) => (
                  <ListItem key={index} sx={{ cursor: 'pointer' }}>
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
                ))
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
