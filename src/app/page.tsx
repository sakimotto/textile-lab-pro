'use client';

import React from 'react';
import { Box, Container, Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardTabs from '@/components/dashboard/DashboardTabs';
import Header from '@/components/layouts/Header';

export default function Home() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
            <Button
              startIcon={<RefreshIcon />}
              sx={{ mr: 2 }}
              variant="outlined"
            >
              Refresh
            </Button>
            <Button
              startIcon={<SettingsIcon />}
              variant="contained"
            >
              Customize
            </Button>
          </Box>
          
          <DashboardTabs />
        </Container>
      </Box>
    </Box>
  );
}