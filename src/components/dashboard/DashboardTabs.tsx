'use client';

import React, { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import DashboardOverview from './DashboardOverview';
import TestResults from './TestResults';
import EquipmentOverview from './EquipmentOverview';
import Analytics from './Analytics';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `dashboard-tab-${index}`,
    'aria-controls': `dashboard-tabpanel-${index}`,
  };
}

export default function DashboardTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange} 
          aria-label="dashboard tabs"
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 500,
            }
          }}
        >
          <Tab label="Overview" {...a11yProps(0)} />
          <Tab label="Test Results" {...a11yProps(1)} />
          <Tab label="Equipment" {...a11yProps(2)} />
          <Tab label="Analytics" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <DashboardOverview />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TestResults />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <EquipmentOverview />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Analytics />
      </TabPanel>
    </Box>
  );
}
