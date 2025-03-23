# Material UI Implementation Guide

## Getting Started

This guide provides step-by-step instructions for implementing the Material UI design from the `textile_lab_frontend_package` into our existing Next.js application.

## Prerequisites

Before beginning, ensure your development environment meets these requirements:
- Node.js 18.x or higher installed
- Next.js project running on port 3002
- Access to both the existing Next.js app and the Material UI package

## Step 1: Install Dependencies

First, install all necessary Material UI dependencies in your Next.js project:

```bash
cd c:\Users\Archie\Desktop\textile-lab-pro
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
npm install recharts
```

## Step 2: Set Up Material UI with Next.js App Router

### Create Theme Configuration

Create a new theme file at `src/theme.ts`:

```typescript
// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0088FE',
      light: '#33a4fe',
      dark: '#005fb1',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#00C49F',
      light: '#33d0b2',
      dark: '#00896f',
      contrastText: '#ffffff',
    },
    error: {
      main: '#F44336',
    },
    warning: {
      main: '#FF9800',
    },
    info: {
      main: '#2196F3',
    },
    success: {
      main: '#4CAF50',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#6c757d',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
    h1: {
      fontWeight: 500,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 500,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 500,
      fontSize: '1.75rem',
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

export default theme;
```

### Create Emotion Cache for SSR

Create an emotion cache file at `src/createEmotionCache.ts`:

```typescript
// src/createEmotionCache.ts
import createCache from '@emotion/cache';

const isBrowser = typeof document !== 'undefined';

export default function createEmotionCache() {
  let insertionPoint;

  if (isBrowser) {
    const emotionInsertionPoint = document.querySelector<HTMLElement>(
      'meta[name="emotion-insertion-point"]'
    );
    insertionPoint = emotionInsertionPoint ?? undefined;
  }

  return createCache({ key: 'mui-style', insertionPoint });
}
```

### Update Root Layout

Update your Next.js root layout at `src/app/layout.tsx`:

```tsx
// src/app/layout.tsx
import './globals.css';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="emotion-insertion-point" content="" />
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

## Step 3: Implement the MainLayout Component

Create a layout folder and implement the MainLayout component:

```tsx
// src/components/layouts/MainLayout.tsx
'use client';

import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Icons
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ScienceIcon from '@mui/icons-material/Science';
import BuildIcon from '@mui/icons-material/Build';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ConstructionIcon from '@mui/icons-material/Construction';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{
  open?: boolean;
}>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Samples', icon: <ScienceIcon />, path: '/samples' },
  { text: 'Tests', icon: <BuildIcon />, path: '/tests' },
  { text: 'Calendar', icon: <CalendarMonthIcon />, path: '/calendar' },
  { text: 'Equipment', icon: <ConstructionIcon />, path: '/equipment' },
  { text: 'Lab Assistant', icon: <SmartToyIcon />, path: '/assistant' },
];

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState<null | HTMLElement>(null);
  const pathname = usePathname();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setNotificationAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBarStyled position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Textile Testing Laboratory
          </Typography>
          <IconButton color="inherit" onClick={handleNotificationMenuOpen}>
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleProfileMenuOpen}
            sx={{ ml: 1 }}
          >
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBarStyled>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', px: 2 }}>
            <ConstructionIcon sx={{ mr: 1 }} />
            <Typography variant="h6" noWrap>
              TextileLab Pro
            </Typography>
          </Box>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton 
                component={Link}
                href={item.path}
                selected={pathname === item.path}
              >
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HelpOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Help" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
      
      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
            mt: 1.5,
            '& .MuiMenuItem-root': {
              px: 2,
              py: 1,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleProfileMenuClose}>
          <Avatar sx={{ mr: 2, width: 24, height: 24 }}>U</Avatar>
          Profile
        </MenuItem>
        <MenuItem onClick={handleProfileMenuClose}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleProfileMenuClose}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      
      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationAnchorEl}
        open={Boolean(notificationAnchorEl)}
        onClose={handleNotificationMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
            mt: 1.5,
            width: 320,
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ px: 2, py: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1">Notifications</Typography>
          <Typography variant="caption" color="text.secondary">Mark all as read</Typography>
        </Box>
        <Divider />
        <MenuItem onClick={handleNotificationMenuClose}>
          <ListItemIcon>
            <Badge color="success" variant="dot">
              <ScienceIcon fontSize="small" />
            </Badge>
          </ListItemIcon>
          <Box>
            <Typography variant="body2">Test #TL-2304 completed</Typography>
            <Typography variant="caption" color="text.secondary">Just now</Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={handleNotificationMenuClose}>
          <ListItemIcon>
            <Badge color="error" variant="dot">
              <BuildIcon fontSize="small" />
            </Badge>
          </ListItemIcon>
          <Box>
            <Typography variant="body2">Equipment #T-350 needs calibration</Typography>
            <Typography variant="caption" color="text.secondary">2 hours ago</Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={handleNotificationMenuClose}>
          <ListItemIcon>
            <ScienceIcon fontSize="small" />
          </ListItemIcon>
          <Box>
            <Typography variant="body2">New sample received from FashionCo</Typography>
            <Typography variant="caption" color="text.secondary">Yesterday</Typography>
          </Box>
        </MenuItem>
        <Divider />
        <Box sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>
          <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
            View all notifications
          </Typography>
        </Box>
      </Menu>
    </Box>
  );
};

export default MainLayout;
```

## Step 4: Implement Dashboard Components

Create a new KPI Card component:

```tsx
// src/components/dashboard/KPICard.tsx
import React from 'react';
import { Paper, Box, Typography, SxProps, Theme } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: number;
  icon?: React.ReactNode;
  sx?: SxProps<Theme>;
}

const KPICard: React.FC<KPICardProps> = ({ 
  title, 
  value, 
  subtitle, 
  change, 
  icon,
  sx = {} 
}) => {
  const isPositiveChange = change && change > 0;
  
  return (
    <Paper 
      elevation={0}
      sx={{
        p: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
        },
        ...sx
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Typography variant="subtitle2" color="text.secondary">
          {title}
        </Typography>
        {icon && (
          <Box 
            sx={{ 
              p: 1, 
              bgcolor: 'primary.light', 
              borderRadius: '50%', 
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {icon}
          </Box>
        )}
      </Box>
      <Typography variant="h4" sx={{ mb: 0.5, fontWeight: 'bold' }}>
        {value}
      </Typography>
      {(subtitle || change !== undefined) && (
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 'auto' }}>
          {change !== undefined && (
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                color: isPositiveChange ? 'success.main' : 'error.main',
                mr: 1
              }}
            >
              {isPositiveChange ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
              <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                {Math.abs(change)}%
              </Typography>
            </Box>
          )}
          {subtitle && (
            <Typography variant="caption" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
      )}
    </Paper>
  );
};

export default KPICard;
```

Create a reusable chart container:

```tsx
// src/components/charts/ChartContainer.tsx
import React from 'react';
import { Paper, Typography, Box, IconButton, SxProps, Theme } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface ChartContainerProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  height?: number | string;
  sx?: SxProps<Theme>;
  action?: React.ReactNode;
}

const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  subtitle,
  children,
  height = 300,
  sx = {},
  action
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
        },
        ...sx
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box>
          <Typography variant="h6">{title}</Typography>
          {subtitle && (
            <Typography variant="caption" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
        {action || (
          <IconButton size="small">
            <MoreVertIcon />
          </IconButton>
        )}
      </Box>
      <Box sx={{ height, flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </Box>
    </Paper>
  );
};

export default ChartContainer;
```

## Step 5: Create Dashboard Page

Implement the main dashboard page with Material UI components:

```tsx
// src/app/page.tsx
'use client';

import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import ScienceIcon from '@mui/icons-material/Science';
import BuildIcon from '@mui/icons-material/Build';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import KPICard from '@/components/dashboard/KPICard';
import ChartContainer from '@/components/charts/ChartContainer';
import MainLayout from '@/components/layouts/MainLayout';
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
    <MainLayout>
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
      </Box>
    </MainLayout>
  );
}
```

## Step 6: Adapting NextAuth.js and App Router

Ensure that the Material UI components work correctly with NextAuth.js and the App Router:

```tsx
// src/app/api/auth/[...nextauth]/route.ts - Update auth configuration
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        // Add additional user data as needed
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

This guide provides a starting point for implementing the Material UI design in your Next.js application. Follow the steps in order, and make adjustments as needed for your specific requirements.
