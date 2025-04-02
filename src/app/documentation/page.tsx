'use client'

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
  Stack,
} from '@mui/material'
import {
  Science as ScienceIcon,
  Assignment as AssignmentIcon,
  People as PeopleIcon,
  Schedule as ScheduleIcon,
  Settings as SettingsIcon,
  Description as DescriptionIcon,
  Code as CodeIcon,
  Storage as StorageIcon,
  ViewQuilt as ViewQuiltIcon,
} from '@mui/icons-material'

export default function DocumentationPage() {
  const sections = [
    {
      title: 'Core Features',
      icon: <ScienceIcon />,
      items: [
        {
          title: 'Sample Management',
          description: 'Create, track, and manage textile samples',
        },
        {
          title: 'Test Procedures',
          description: 'Standard test methods and procedures',
        },
        {
          title: 'Report Generation',
          description: 'Automated report creation and management',
        },
      ],
    },
    {
      title: 'User Interface',
      icon: <ViewQuiltIcon />,
      items: [
        {
          title: 'Dashboard',
          description: 'Overview of lab activities and metrics',
        },
        {
          title: 'Data Grids',
          description: 'Sortable and filterable data tables',
        },
        {
          title: 'Forms',
          description: 'Input validation and submission handling',
        },
      ],
    },
    {
      title: 'Data Management',
      icon: <StorageIcon />,
      items: [
        {
          title: 'Client Records',
          description: 'Client information and history',
        },
        {
          title: 'Test Results',
          description: 'Storing and retrieving test data',
        },
        {
          title: 'Report Archives',
          description: 'Historical report access',
        },
      ],
    },
  ]

  return (
    <Box sx={{ p: 3 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" gutterBottom>
          TextileLab Pro Documentation
        </Typography>

        <Typography variant="body1" paragraph sx={{ mb: 4 }}>
          Welcome to the TextileLab Pro documentation. This guide will help you understand and
          effectively use all features of the system.
        </Typography>

        <Grid container spacing={4}>
          {sections.map((section) => (
            <Grid item xs={12} key={section.title}>
              <Paper sx={{ p: 3 }}>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 1,
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                    }}
                  >
                    {section.icon}
                  </Box>
                  <Typography variant="h5">{section.title}</Typography>
                </Stack>

                <Grid container spacing={3}>
                  {section.items.map((item) => (
                    <Grid item xs={12} md={4} key={item.title}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            {item.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Additional Resources
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <CodeIcon />
              </ListItemIcon>
              <ListItemText
                primary="API Documentation"
                secondary="Complete API reference for developers"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText
                primary="User Guides"
                secondary="Step-by-step guides for common tasks"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText
                primary="Configuration"
                secondary="System settings and customization options"
              />
            </ListItem>
          </List>
        </Box>
      </Container>
    </Box>
  )
}
