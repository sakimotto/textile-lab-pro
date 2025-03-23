'use client';

import React from 'react';
import ThemeRegistry from '@/components/providers/ThemeRegistry';
import ThemeModeProvider from '@/components/providers/ThemeContext';
import MainLayout from '@/components/layouts/MainLayout';

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeRegistry>
      <ThemeModeProvider>
        <MainLayout>{children}</MainLayout>
      </ThemeModeProvider>
    </ThemeRegistry>
  );
}
