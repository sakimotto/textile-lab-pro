import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';

// Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import ScienceIcon from '@mui/icons-material/Science';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import DescriptionIcon from '@mui/icons-material/Description';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import SettingsIcon from '@mui/icons-material/Settings';
import BuildIcon from '@mui/icons-material/Build';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  ...theme.mixins.toolbar,
}));

const Logo = styled('img')({
  height: 40,
  marginRight: 12,
});

const UserSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

interface SidebarProps {
  drawerWidth: number;
  mobileOpen: boolean;
  onDrawerToggle: () => void;
}

interface NavItem {
  title: string;
  path: string;
  icon: React.ReactNode;
  divider?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ drawerWidth, mobileOpen, onDrawerToggle }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems: NavItem[] = [
    { title: 'Dashboard', path: '/', icon: <DashboardIcon /> },
    { title: 'Test Methods', path: '/test-methods', icon: <ScienceIcon /> },
    { title: 'Method Builder', path: '/test-methods/builder', icon: <BuildIcon /> },
    { title: 'Calendar', path: '/calendar', icon: <CalendarMonthIcon /> },
    { title: 'Jobs', path: '/jobs', icon: <AssignmentIcon /> },
    { title: 'Equipment', path: '/equipment', icon: <PrecisionManufacturingIcon /> },
    { title: 'Reports', path: '/reports', icon: <DescriptionIcon />, divider: true },
    { title: 'Knowledge Base', path: '/knowledge-base', icon: <MenuBookIcon /> },
    { title: 'Chatbot', path: '/chatbot', icon: <SmartToyIcon />, divider: true },
    { title: 'Settings', path: '/settings', icon: <SettingsIcon /> },
  ];

  const drawer = (
    <>
      <LogoContainer>
        <Logo src="/logo.svg" alt="Textile Testing Lab" />
        <Typography variant="h6" noWrap component="div">
          Textile Testing Lab
        </Typography>
      </LogoContainer>
      <Divider />
      <UserSection>
        <Avatar sx={{ width: 40, height: 40, marginRight: 2 }}>JD</Avatar>
        <Box>
          <Typography variant="subtitle1" noWrap>
            John Doe
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            Lab Manager
          </Typography>
        </Box>
      </UserSection>
      <List>
        {navItems.map((item) => (
          <React.Fragment key={item.title}>
            <ListItem disablePadding>
              <Tooltip title={item.title} placement="right" arrow>
                <ListItemButton
                  selected={location.pathname === item.path}
                  onClick={() => {
                    navigate(item.path);
                    if (mobileOpen) {
                      onDrawerToggle();
                    }
                  }}
                  sx={{
                    minHeight: 48,
                    px: 2.5,
                    my: 0.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: 2,
                      justifyContent: 'center',
                      color: location.pathname === item.path ? theme.palette.primary.main : 'inherit',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.title} 
                    primaryTypographyProps={{
                      fontWeight: location.pathname === item.path ? 600 : 400,
                    }}
                  />
                </ListItemButton>
              </Tooltip>
            </ListItem>
            {item.divider && <Divider sx={{ my: 1 }} />}
          </React.Fragment>
        ))}
      </List>
    </>
  );

  return (
    <>
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth,
            boxShadow: theme.shadows[8],
          },
        }}
      >
        <DrawerHeader>
          <IconButton onClick={onDrawerToggle}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        {drawer}
      </Drawer>
      
      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth,
            boxShadow: theme.shadows[2],
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Sidebar;
