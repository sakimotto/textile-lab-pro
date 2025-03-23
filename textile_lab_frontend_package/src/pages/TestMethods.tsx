import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigate } from 'react-router-dom';

// Icons
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ScienceIcon from '@mui/icons-material/Science';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import LandscapeIcon from '@mui/icons-material/Landscape';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import WarningIcon from '@mui/icons-material/Warning';

// Mock Data
import { mockService } from '../services/mockData';
import { Industry, MethodStatus } from '../types';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[10],
  },
}));

const MethodCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[10],
  },
}));

const STATUS_COLORS = {
  [MethodStatus.ACTIVE]: '#4CAF50',
  [MethodStatus.DRAFT]: '#FF9800',
  [MethodStatus.ARCHIVED]: '#9E9E9E',
  [MethodStatus.DEPRECATED]: '#F44336',
};

const STATUS_ICONS = {
  [MethodStatus.ACTIVE]: <CheckCircleIcon />,
  [MethodStatus.DRAFT]: <PendingIcon />,
  [MethodStatus.ARCHIVED]: <VisibilityIcon />,
  [MethodStatus.DEPRECATED]: <WarningIcon />,
};

const INDUSTRY_COLORS = {
  [Industry.AUTOMOTIVE]: '#1976D2',
  [Industry.SPORTSWEAR]: '#00C853',
  [Industry.CAMPING]: '#FF9800'
};

const INDUSTRY_ICONS = {
  [Industry.AUTOMOTIVE]: <DirectionsCarIcon />,
  [Industry.SPORTSWEAR]: <SportsSoccerIcon />,
  [Industry.CAMPING]: <LandscapeIcon />
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const TestMethods: React.FC = () => {
  const [methods, setMethods] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterIndustry, setFilterIndustry] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await mockService.getTestMethods();
        setMethods(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching test methods:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, methodId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedMethod(methodId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedMethod(null);
  };

  const handleDeleteDialogOpen = () => {
    handleMenuClose();
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleDeleteMethod = () => {
    // In a real application, this would call an API to delete the method
    setMethods(methods.filter(method => method.id !== selectedMethod));
    handleDeleteDialogClose();
  };

  const handleEditMethod = () => {
    handleMenuClose();
    navigate(`/test-method-builder?id=${selectedMethod}`);
  };

  const handleDuplicateMethod = () => {
    handleMenuClose();
    // In a real application, this would duplicate the method and open the builder
    navigate(`/test-method-builder?duplicate=${selectedMethod}`);
  };

  const handleCreateMethod = () => {
    navigate('/test-method-builder');
  };

  const filteredMethods = methods.filter(method => {
    const matchesSearch = method.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          method.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = filterIndustry === 'all' || method.industries.includes(filterIndustry);
    const matchesStatus = filterStatus === 'all' || method.status === filterStatus;
    
    return matchesSearch && matchesIndustry && matchesStatus;
  });

  if (loading) {
    return (
      <Box sx={{ width: '100%', mt: 4 }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Test Methods
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleCreateMethod}
        >
          Create New Method
        </Button>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
          <TextField
            placeholder="Search test methods..."
            variant="outlined"
            size="small"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ mr: 2 }}
          />
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            Filter
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl) && !selectedMethod}
            onClose={handleMenuClose}
          >
            <MenuItem>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>Industry</Typography>
            </MenuItem>
            <MenuItem onClick={() => setFilterIndustry('all')} selected={filterIndustry === 'all'}>
              All Industries
            </MenuItem>
            <MenuItem onClick={() => setFilterIndustry(Industry.AUTOMOTIVE)} selected={filterIndustry === Industry.AUTOMOTIVE}>
              <DirectionsCarIcon sx={{ mr: 1 }} /> Automotive
            </MenuItem>
            <MenuItem onClick={() => setFilterIndustry(Industry.SPORTSWEAR)} selected={filterIndustry === Industry.SPORTSWEAR}>
              <SportsSoccerIcon sx={{ mr: 1 }} /> Sportswear
            </MenuItem>
            <MenuItem onClick={() => setFilterIndustry(Industry.CAMPING)} selected={filterIndustry === Industry.CAMPING}>
              <LandscapeIcon sx={{ mr: 1 }} /> Camping
            </MenuItem>
            <Divider />
            <MenuItem>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>Status</Typography>
            </MenuItem>
            <MenuItem onClick={() => setFilterStatus('all')} selected={filterStatus === 'all'}>
              All Statuses
            </MenuItem>
            <MenuItem onClick={() => setFilterStatus(MethodStatus.ACTIVE)} selected={filterStatus === MethodStatus.ACTIVE}>
              <CheckCircleIcon sx={{ mr: 1, color: STATUS_COLORS[MethodStatus.ACTIVE] }} /> Active
            </MenuItem>
            <MenuItem onClick={() => setFilterStatus(MethodStatus.DRAFT)} selected={filterStatus === MethodStatus.DRAFT}>
              <PendingIcon sx={{ mr: 1, color: STATUS_COLORS[MethodStatus.DRAFT] }} /> Draft
            </MenuItem>
            <MenuItem onClick={() => setFilterStatus(MethodStatus.ARCHIVED)} selected={filterStatus === MethodStatus.ARCHIVED}>
              <VisibilityIcon sx={{ mr: 1, color: STATUS_COLORS[MethodStatus.ARCHIVED] }} /> Archived
            </MenuItem>
            <MenuItem onClick={() => setFilterStatus(MethodStatus.DEPRECATED)} selected={filterStatus === MethodStatus.DEPRECATED}>
              <WarningIcon sx={{ mr: 1, color: STATUS_COLORS[MethodStatus.DEPRECATED] }} /> Deprecated
            </MenuItem>
          </Menu>
        </Box>
      </Paper>

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="test methods tabs">
            <Tab label="Card View" {...a11yProps(0)} />
            <Tab label="Table View" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            {filteredMethods.map((method) => (
              <Grid item xs={12} sm={6} md={4} key={method.id}>
                <MethodCard>
                  <CardHeader
                    title={method.name}
                    subheader={`Version ${method.version}`}
                    action={
                      <IconButton aria-label="settings" onClick={(e) => handleMenuOpen(e, method.id)}>
                        <MoreVertIcon />
                      </IconButton>
                    }
                  />
                  <Divider />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', mb: 2 }}>
                      <Chip
                        icon={STATUS_ICONS[method.status]}
                        label={method.status}
                        size="small"
                        sx={{
                          bgcolor: `${STATUS_COLORS[method.status]}20`,
                          color: STATUS_COLORS[method.status],
                          mr: 1
                        }}
                      />
                      {method.industries.map((industry: Industry) => (
                        <Chip
                          key={industry}
                          icon={INDUSTRY_ICONS[industry]}
                          label={industry}
                          size="small"
                          sx={{
                            bgcolor: `${INDUSTRY_COLORS[industry]}20`,
                            color: INDUSTRY_COLORS[industry],
                            mr: 1
                          }}
                        />
                      ))}
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {method.description}
                    </Typography>
                    <Typography variant="caption" display="block" sx={{ mb: 0.5 }}>
                      <strong>Created by:</strong> {method.createdBy}
                    </Typography>
                    <Typography variant="caption" display="block" sx={{ mb: 0.5 }}>
                      <strong>Created:</strong> {new Date(method.createdAt).toLocaleDateString()}
                    </Typography>
                    <Typography variant="caption" display="block">
                      <strong>Last updated:</strong> {new Date(method.updatedAt).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                  <Divider />
                  <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" color="text.secondary">
                      <strong>Standards:</strong> {method.standards.join(', ')}
                    </Typography>
                    <Button
                      size="small"
                      onClick={() => navigate(`/test-method-builder?id=${method.id}&view=true`)}
                    >
                      View Details
                    </Button>
                  </Box>
                </MethodCard>
              </Grid>
            ))}
            {filteredMethods.length === 0 && (
              <Grid item xs={12}>
                <Paper sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="h6">No test methods found</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Try adjusting your search or filter criteria
                  </Typography>
                </Paper>
              </Grid>
            )}
          </Grid>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="test methods table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Version</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Industries</TableCell>
                  <TableCell>Created By</TableCell>
                  <TableCell>Last Updated</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredMethods
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((method) => (
                    <TableRow
                      key={method.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {method.name}
                      </TableCell>
                      <TableCell>{method.version}</TableCell>
                      <TableCell>
                        <Chip
                          icon={STATUS_ICONS[method.status]}
                          label={method.status}
                          size="small"
                          sx={{
                            bgcolor: `${STATUS_COLORS[method.status]}20`,
                            color: STATUS_COLORS[method.status]
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        {method.industries.map((industry: Industry) => (
                          <Chip
                            key={industry}
                            icon={INDUSTRY_ICONS[industry]}
                            label={industry}
                            size="small"
                            sx={{
                              bgcolor: `${INDUSTRY_COLORS[industry]}20`,
                              color: INDUSTRY_COLORS[industry],
                              mr: 0.5,
                              mb: 0.5
                            }}
                          />
                        ))}
                      </TableCell>
                      <TableCell>{method.createdBy}</TableCell>
                      <TableCell>{new Date(method.updatedAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <IconButton size="small" onClick={() => navigate(`/test-method-builder?id=${method.id}&view=true`)}>
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" onClick={() => { setSelectedMethod(method.id); handleEditMethod(); }}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" onClick={() => { setSelectedMethod(method.id); handleDuplicateMethod(); }}>
                          <ContentCopyIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" onClick={(e) => handleMenuOpen(e, method.id)}>
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                {filteredMethods.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      <Typography variant="body1">No test methods found</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Try adjusting your search or filter criteria
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredMethods.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </TabPanel>
      </Box>

      {/* Method Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl) && Boolean(selectedMethod)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditMethod}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Edit" />
        </MenuItem>
        <MenuItem onClick={handleDuplicateMethod}>
          <ListItemIcon>
            <ContentCopyIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Duplicate" />
        </MenuItem>
        <MenuItem onClick={handleDeleteDialogOpen}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ color: 'error' }} />
        </MenuItem>
      </Menu>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Test Method?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this test method? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
          <Button onClick={handleDeleteMethod} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TestMethods;
