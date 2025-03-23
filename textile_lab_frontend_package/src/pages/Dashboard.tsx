import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigate } from 'react-router-dom';

// Charts
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';

// Icons
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ScienceIcon from '@mui/icons-material/Science';
import BuildIcon from '@mui/icons-material/Build';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import ErrorIcon from '@mui/icons-material/Error';
import CancelIcon from '@mui/icons-material/Cancel';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import LandscapeIcon from '@mui/icons-material/Landscape';

// Mock Data
import { mockService } from '../services/mockData';
import { JobStatus, EquipmentStatus, Industry } from '../types';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[10],
  },
}));

const KPICard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[4],
  },
}));

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
const STATUS_COLORS = {
  [JobStatus.COMPLETED]: '#4CAF50',
  [JobStatus.IN_PROGRESS]: '#2196F3',
  [JobStatus.SCHEDULED]: '#FF9800',
  [JobStatus.FAILED]: '#F44336',
  [JobStatus.CANCELLED]: '#9E9E9E'
};

const EQUIPMENT_STATUS_COLORS = {
  [EquipmentStatus.OPERATIONAL]: '#4CAF50',
  [EquipmentStatus.MAINTENANCE]: '#FF9800',
  [EquipmentStatus.OUT_OF_SERVICE]: '#F44336',
  [EquipmentStatus.CALIBRATION]: '#2196F3'
};

const INDUSTRY_COLORS = {
  [Industry.AUTOMOTIVE]: '#1976D2',
  [Industry.SPORTSWEAR]: '#00C853',
  [Industry.CAMPING]: '#FF9800'
};

const INDUSTRY_ICONS = {
  [Industry.AUTOMOTIVE]: <DirectionsCarIcon />,
  [Industry.SPORTSWEAR]: <SportsSoccerIcon />,
  [Industry.CAMPING]: <LandscapeIcon />
};

const STATUS_ICONS = {
  [JobStatus.COMPLETED]: <CheckCircleIcon />,
  [JobStatus.IN_PROGRESS]: <HourglassEmptyIcon />,
  [JobStatus.SCHEDULED]: <CalendarMonthIcon />,
  [JobStatus.FAILED]: <ErrorIcon />,
  [JobStatus.CANCELLED]: <CancelIcon />
};

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [equipmentData, setEquipmentData] = useState<any[]>([]);
  const [jobsData, setJobsData] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await mockService.getDashboardData();
        const equipment = await mockService.getEquipment();
        const jobs = await mockService.getJobs();
        
        setDashboardData(data);
        setEquipmentData(equipment);
        setJobsData(jobs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleJobClick = (jobId: string) => {
    navigate(`/jobs/${jobId}`);
  };

  if (loading) {
    return (
      <Box sx={{ width: '100%', mt: 4 }}>
        <LinearProgress />
      </Box>
    );
  }

  // Prepare data for charts
  const testsByIndustryData = dashboardData?.testsByIndustry || [];
  const testsByStatusData = dashboardData?.testsByStatus || [];
  const equipmentStatusData = dashboardData?.equipmentStatus || [];

  // Equipment utilization data
  const equipmentUtilizationData = equipmentData
    .filter(item => item.status === EquipmentStatus.OPERATIONAL)
    .map(item => ({
      name: item.name,
      utilization: item.utilization
    }));

  // Upcoming jobs data
  const upcomingJobsData = jobsData
    .filter(job => job.status === JobStatus.SCHEDULED)
    .sort((a, b) => new Date(a.scheduledStart).getTime() - new Date(b.scheduledStart).getTime())
    .slice(0, 5);

  // Monthly test volume data (mock data)
  const monthlyTestVolumeData = [
    { name: 'Jan', automotive: 42, sportswear: 35, camping: 28 },
    { name: 'Feb', automotive: 45, sportswear: 38, camping: 30 },
    { name: 'Mar', automotive: 52, sportswear: 43, camping: 32 },
    { name: 'Apr', automotive: 48, sportswear: 40, camping: 35 },
    { name: 'May', automotive: 50, sportswear: 45, camping: 38 },
    { name: 'Jun', automotive: 55, sportswear: 48, camping: 40 },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      {/* KPI Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard elevation={2}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Tests Completed
                </Typography>
                <Typography variant="h4">
                  {dashboardData?.testsCompleted.current}
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                <ScienceIcon />
              </Avatar>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              {dashboardData?.testsCompleted.change >= 0 ? (
                <ArrowUpwardIcon fontSize="small" color="success" />
              ) : (
                <ArrowDownwardIcon fontSize="small" color="error" />
              )}
              <Typography variant="body2" sx={{ ml: 1 }}>
                {Math.abs(dashboardData?.testsCompleted.change)}% from last {dashboardData?.testsCompleted.period}
              </Typography>
            </Box>
          </KPICard>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <KPICard elevation={2}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Equipment Utilization
                </Typography>
                <Typography variant="h4">
                  {dashboardData?.equipmentUtilization.current}%
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: 'secondary.main' }}>
                <BuildIcon />
              </Avatar>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              {dashboardData?.equipmentUtilization.change >= 0 ? (
                <ArrowUpwardIcon fontSize="small" color="success" />
              ) : (
                <ArrowDownwardIcon fontSize="small" color="error" />
              )}
              <Typography variant="body2" sx={{ ml: 1 }}>
                {Math.abs(dashboardData?.equipmentUtilization.change)}% from last {dashboardData?.equipmentUtilization.period}
              </Typography>
            </Box>
          </KPICard>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <KPICard elevation={2}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Pending Tests
                </Typography>
                <Typography variant="h4">
                  {dashboardData?.pendingTests.current}
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: 'warning.main' }}>
                <HourglassEmptyIcon />
              </Avatar>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              {dashboardData?.pendingTests.change < 0 ? (
                <ArrowDownwardIcon fontSize="small" color="success" />
              ) : (
                <ArrowUpwardIcon fontSize="small" color="error" />
              )}
              <Typography variant="body2" sx={{ ml: 1 }}>
                {Math.abs(dashboardData?.pendingTests.change)}% from last {dashboardData?.pendingTests.period}
              </Typography>
            </Box>
          </KPICard>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <KPICard elevation={2}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Avg. Test Duration
                </Typography>
                <Typography variant="h4">
                  {dashboardData?.averageTestDuration.current} {dashboardData?.averageTestDuration.unit}
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: 'info.main' }}>
                <CalendarMonthIcon />
              </Avatar>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              {dashboardData?.averageTestDuration.change < 0 ? (
                <ArrowDownwardIcon fontSize="small" color="success" />
              ) : (
                <ArrowUpwardIcon fontSize="small" color="error" />
              )}
              <Typography variant="body2" sx={{ ml: 1 }}>
                {Math.abs(dashboardData?.averageTestDuration.change)}% from last {dashboardData?.averageTestDuration.period}
              </Typography>
            </Box>
          </KPICard>
        </Grid>
      </Grid>
      
      {/* Charts Row 1 */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <StyledCard>
            <CardHeader 
              title="Monthly Test Volume by Industry" 
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <Divider />
            <CardContent sx={{ flexGrow: 1, height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyTestVolumeData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="automotive" name="Automotive" fill={INDUSTRY_COLORS[Industry.AUTOMOTIVE]} />
                  <Bar dataKey="sportswear" name="Sportswear" fill={INDUSTRY_COLORS[Industry.SPORTSWEAR]} />
                  <Bar dataKey="camping" name="Camping" fill={INDUSTRY_COLORS[Industry.CAMPING]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </StyledCard>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <StyledCard>
            <CardHeader 
              title="Tests by Industry" 
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <Divider />
            <CardContent sx={{ flexGrow: 1, height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={testsByIndustryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="industry"
                    label={({ industry, count, percent }) => `${industry}: ${count} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {testsByIndustryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={INDUSTRY_COLORS[entry.industry] || COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
      
      {/* Charts Row 2 */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <StyledCard>
            <CardHeader 
              title="Tests by Status" 
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <Divider />
            <CardContent sx={{ flexGrow: 1, height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={testsByStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="status"
                    label={({ status, count, percent }) => `${status}: ${count} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {testsByStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.status] || COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </StyledCard>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <StyledCard>
            <CardHeader 
              title="Equipment Utilization" 
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <Divider />
            <CardContent sx={{ flexGrow: 1, height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={equipmentUtilizationData}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis type="category" dataKey="name" width={100} />
                  <Tooltip />
                  <Bar dataKey="utilization" name="Utilization (%)" fill="#2196F3">
                    {equipmentUtilizationData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={
                          entry.utilization > 80 ? '#4CAF50' : 
                          entry.utilization > 50 ? '#2196F3' : 
                          entry.utilization > 30 ? '#FF9800' : '#F44336'
                        } 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
      
      {/* Recent Tests and Upcoming Jobs */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardHeader 
              title="Recent Tests" 
              action={
                <Button size="small" color="primary">
                  View All
                </Button>
              }
            />
            <Divider />
            <CardContent sx={{ flexGrow: 1, p: 0 }}>
              <List>
                {dashboardData?.recentTests.map((test: any) => (
                  <React.Fragment key={test.id}>
                    <ListItem 
                      button 
                      onClick={() => handleJobClick(test.id)}
                      secondaryAction={
                        <Chip 
                          label={test.status} 
                          size="small" 
                          sx={{ 
                            bgcolor: STATUS_COLORS[test.status],
                            color: 'white'
                          }} 
                        />
                      }
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: STATUS_COLORS[test.status] }}>
                          {STATUS_ICONS[test.status]}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary={test.title} 
                        secondary={`${test.technician} • ${new Date(test.completedAt).toLocaleString()}`} 
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </StyledCard>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardHeader 
              title="Upcoming Jobs" 
              action={
                <Button size="small" color="primary" onClick={() => navigate('/calendar')}>
                  View Calendar
                </Button>
              }
            />
            <Divider />
            <CardContent sx={{ flexGrow: 1, p: 0 }}>
              <List>
                {upcomingJobsData.map((job) => (
                  <React.Fragment key={job.id}>
                    <ListItem 
                      button 
                      onClick={() => handleJobClick(job.id)}
                      secondaryAction={
                        <Chip 
                          icon={INDUSTRY_ICONS[job.industry]}
                          label={job.industry} 
                          size="small" 
                          sx={{ 
                            bgcolor: INDUSTRY_COLORS[job.industry],
                            color: 'white'
                          }} 
                        />
                      }
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          <CalendarMonthIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary={job.title} 
                        secondary={`${job.technician} • ${new Date(job.scheduledStart).toLocaleString()}`} 
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
                {upcomingJobsData.length === 0 && (
                  <ListItem>
                    <ListItemText 
                      primary="No upcoming jobs" 
                      secondary="All scheduled jobs have been completed" 
                    />
                  </ListItem>
                )}
              </List>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
