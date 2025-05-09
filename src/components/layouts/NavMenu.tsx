'use client';

import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ScienceIcon from '@mui/icons-material/Science';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import Link from 'next/link';

interface NavMenuProps {
  open: boolean;
}

import ChecklistIcon from '@mui/icons-material/Checklist';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const navItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, href: '/' },
  { text: 'Tests', icon: <ScienceIcon />, href: '/tests' },
  { text: 'Test Standards', icon: <MenuBookIcon />, href: '/test-standards' },
  { text: 'Reports', icon: <AssessmentIcon />, href: '/reports' },
  { text: 'Tasks', icon: <ChecklistIcon />, href: '/tasks' },
  { text: 'Settings', icon: <SettingsIcon />, href: '/settings' },
];

const NavMenu: React.FC<NavMenuProps> = ({ open }) => {
  return (
    <List>
      {navItems.map((item, index) => (
        <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
          <Link href={item.href} style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </Link>
        </ListItem>
      ))}
    </List>
  );
};

export default NavMenu;
