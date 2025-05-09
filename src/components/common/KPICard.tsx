'use client';

import React from 'react';
import { Card, CardContent, Typography, Box, SvgIcon } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: SvgIconComponent;
  color?: string;
}

export default function KPICard({ title, value, subtitle, icon: Icon, color = '#1976d2' }: KPICardProps) {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {Icon && (
            <Box sx={{ mr: 2 }}>
              <Icon sx={{ color, fontSize: 40 }} />
            </Box>
          )}
          <Box>
            <Typography variant="h6" component="div" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" component="div" sx={{ color }}>
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
