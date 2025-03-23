'use client';

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
