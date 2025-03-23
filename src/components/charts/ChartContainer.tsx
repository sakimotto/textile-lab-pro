'use client';

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
