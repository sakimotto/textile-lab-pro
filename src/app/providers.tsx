'use client';

import React from 'react';
import ThemeRegistry from '@/components/providers/ThemeRegistry';
import ThemeModeProvider from '@/components/providers/ThemeContext';
import { Box } from '@mui/material';

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeRegistry>
      <ThemeModeProvider>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          {children}
        </Box>
      </ThemeModeProvider>
    </ThemeRegistry>
  );
}
