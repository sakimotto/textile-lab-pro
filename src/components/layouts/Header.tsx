'use client';

import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Box,
  Badge,
  useTheme,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Standardize navigation links to match sidebar destinations
const navLinks = [
  { text: 'Dashboard', href: '/' },
  { text: 'Tests', href: '/tests' },
  { text: 'Test Standards', href: '/test-standards' },
  { text: 'Reports', href: '/reports' },
  { text: 'Equipment', href: '/equipment' },
];

const Header = () => {
  const theme = useTheme();
  const pathname = usePathname();

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        backgroundColor: '#1976d2',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Toolbar sx={{ height: 64, justifyContent: 'space-between' }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontSize: '1.5rem',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              '&:hover': {
                opacity: 0.9,
              },
            }}
          >
            Textile Testing Laboratory
          </Typography>
        </Link>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {navLinks.map((link) => (
              <Link 
                key={link.text} 
                href={link.href}
                style={{ textDecoration: 'none' }}
              >
                <Button
                  color="inherit"
                  sx={{
                    textTransform: 'none',
                    fontWeight: pathname === link.href ? 600 : 400,
                    borderBottom: pathname === link.href ? '2px solid white' : 'none',
                    borderRadius: 0,
                    '&:hover': {
                      borderBottom: '2px solid rgba(255, 255, 255, 0.5)',
                    },
                  }}
                >
                  {link.text}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton color="inherit" size="large">
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.dark' }}>
              JS
            </Avatar>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
