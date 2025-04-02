import { Avatar, Box, Button, TextField, Typography, FormControl, InputLabel, Select, MenuItem, Switch } from '@mui/material';

export default function SettingsPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Settings</Typography>

      {/* User Profile Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>Profile</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ width: 64, height: 64 }} />
          <Button variant="contained">Change Photo</Button>
        </Box>

        <Box sx={{ mt: 2, maxWidth: 400 }}>
          <TextField
            fullWidth
            label="Full Name"
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Phone Number"
            margin="normal"
            variant="outlined"
          />
          <Button variant="contained" sx={{ mt: 2 }}>Save Changes</Button>
        </Box>
      </Box>

      {/* Application Preferences Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>Application Preferences</Typography>

        {/* Theme Selection */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>Theme</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography>Light</Typography>
            <Switch defaultChecked />
            <Typography>Dark</Typography>
          </Box>
        </Box>

        {/* Language Preferences */}
        <Box sx={{ mb: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Language</InputLabel>
            <Select label="Language" defaultValue="en">
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="es">Spanish</MenuItem>
              <MenuItem value="fr">French</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Default View Settings */}
        <Box>
          <FormControl fullWidth>
            <InputLabel>Default Dashboard View</InputLabel>
            <Select label="Default Dashboard View" defaultValue="overview">
              <MenuItem value="overview">Overview</MenuItem>
              <MenuItem value="detailed">Detailed</MenuItem>
              <MenuItem value="minimal">Minimal</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Notification Settings Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>Notification Settings</Typography>

        {/* Email Notifications */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>Email Notifications</Typography>
          <Switch defaultChecked />
        </Box>

        {/* Push Notifications */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>Push Notifications</Typography>
          <Switch defaultChecked />
        </Box>

        {/* Notification Frequency */}
        <Box>
          <FormControl fullWidth>
            <InputLabel>Notification Frequency</InputLabel>
            <Select label="Notification Frequency" defaultValue="daily">
              <MenuItem value="immediate">Immediate</MenuItem>
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
}
