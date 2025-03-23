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
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Tooltip from '@mui/material/Tooltip';
import LinearProgress from '@mui/material/LinearProgress';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useNavigate, useParams } from 'react-router-dom';

// Icons
import ChatIcon from '@mui/icons-material/Chat';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import HelpIcon from '@mui/icons-material/Help';
import ScienceIcon from '@mui/icons-material/Science';
import BuildIcon from '@mui/icons-material/Build';
import DescriptionIcon from '@mui/icons-material/Description';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageIcon from '@mui/icons-material/Image';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import SmartToyIcon from '@mui/icons-material/SmartToy';

// Mock Data
import { mockService } from '../services/mockData';

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

const ChatContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: 'calc(100vh - 300px)',
  minHeight: '500px',
}));

const MessagesContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  overflowY: 'auto',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
}));

const MessageInputContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}));

const UserMessage = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: theme.spacing(2),
}));

const UserMessageContent = styled(Box)(({ theme }) => ({
  maxWidth: '70%',
  padding: theme.spacing(1.5),
  borderRadius: '18px 18px 4px 18px',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

const BotMessage = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  marginBottom: theme.spacing(2),
}));

const BotMessageContent = styled(Box)(({ theme }) => ({
  maxWidth: '70%',
  padding: theme.spacing(1.5),
  borderRadius: '18px 18px 18px 4px',
  backgroundColor: theme.palette.grey[100],
  color: theme.palette.text.primary,
}));

const BotAvatar = styled(Avatar)(({ theme }) => ({
  marginRight: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
}));

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

interface Message {
  id: string;
  sender: 'user' | 'bot';
  content: string;
  timestamp: Date;
  attachments?: string[];
}

const Chatbot: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [tabValue, setTabValue] = useState(0);
  const [knowledgeBase, setKnowledgeBase] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate fetching initial messages and knowledge base
        const initialMessages = [
          {
            id: '1',
            sender: 'bot' as const,
            content: 'Hello! I\'m your textile testing lab assistant. How can I help you today?',
            timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
          },
        ];
        
        const knowledgeBaseData = await mockService.getKnowledgeBase();
        
        setMessages(initialMessages);
        setKnowledgeBase(knowledgeBaseData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching chatbot data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages([...messages, newUserMessage]);
    setInputValue('');

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue);
      setMessages(prevMessages => [...prevMessages, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    
    if (!isListening) {
      // In a real application, this would use the Web Speech API
      // For now, we'll simulate voice recognition after a delay
      setTimeout(() => {
        setInputValue('How do I calibrate the Instron machine?');
        setIsListening(false);
      }, 2000);
    }
  };

  const generateBotResponse = (userMessage: string): Message => {
    // Simple keyword-based responses
    const lowerCaseMessage = userMessage.toLowerCase();
    let responseContent = '';
    let attachments: string[] = [];

    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
      responseContent = 'Hello! How can I assist you with your textile testing needs today?';
    } else if (lowerCaseMessage.includes('calibrate') && lowerCaseMessage.includes('instron')) {
      responseContent = 'To calibrate the Instron machine, please follow these steps:\n\n1. Ensure the machine is powered off\n2. Clean all testing surfaces\n3. Power on and wait for initialization\n4. Access the calibration menu via Settings > Calibration\n5. Follow the on-screen instructions using the calibration weights\n6. Save the calibration profile\n\nWould you like me to show you the detailed calibration manual?';
      attachments = ['instron_calibration_guide.pdf'];
    } else if (lowerCaseMessage.includes('test method') && lowerCaseMessage.includes('create')) {
      responseContent = 'You can create a new test method using our Test Method Builder. Would you like me to guide you through the process?';
    } else if (lowerCaseMessage.includes('schedule') || lowerCaseMessage.includes('calendar')) {
      responseContent = 'You can schedule tests using our Calendar feature. Would you like me to show you how to create a new test schedule?';
    } else if (lowerCaseMessage.includes('report') || lowerCaseMessage.includes('results')) {
      responseContent = 'Test reports can be generated from the Job Details page. You can export them as PDF or Excel files with compliance logos included.';
    } else if (lowerCaseMessage.includes('equipment') || lowerCaseMessage.includes('machine')) {
      responseContent = 'You can view all laboratory equipment in the Equipment section. This shows status, calibration schedules, and availability for scheduling.';
    } else if (lowerCaseMessage.includes('help')) {
      responseContent = 'I can help you with:\n\n- Creating and managing test methods\n- Scheduling tests and managing the calendar\n- Equipment information and calibration\n- Generating reports and compliance documentation\n- Finding standards and specifications\n\nWhat would you like assistance with?';
    } else {
      responseContent = 'I understand you\'re asking about ' + userMessage.substring(0, 30) + '... Let me check our knowledge base for relevant information. Is there anything specific you\'d like to know?';
    }

    return {
      id: Date.now().toString(),
      sender: 'bot',
      content: responseContent,
      timestamp: new Date(),
      attachments,
    };
  };

  const filteredKnowledgeBase = knowledgeBase.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          Lab Assistant AI
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<SettingsIcon />}
        >
          Chatbot Settings
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ mb: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="chatbot tabs">
                <Tab label="Chat" icon={<ChatIcon />} iconPosition="start" {...a11yProps(0)} />
                <Tab label="Knowledge Base" icon={<DescriptionIcon />} iconPosition="start" {...a11yProps(1)} />
                <Tab label="Help" icon={<HelpIcon />} iconPosition="start" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <TabPanel value={tabValue} index={0}>
              <ChatContainer>
                <MessagesContainer>
                  {messages.map((message) => (
                    message.sender === 'user' ? (
                      <UserMessage key={message.id}>
                        <UserMessageContent>
                          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                            {message.content}
                          </Typography>
                          <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', mt: 1, opacity: 0.7 }}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </Typography>
                        </UserMessageContent>
                      </UserMessage>
                    ) : (
                      <BotMessage key={message.id}>
                        <BotAvatar>
                          <SmartToyIcon />
                        </BotAvatar>
                        <BotMessageContent>
                          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                            {message.content}
                          </Typography>
                          {message.attachments && message.attachments.length > 0 && (
                            <Box sx={{ mt: 2 }}>
                              {message.attachments.map((attachment, index) => (
                                <Chip
                                  key={index}
                                  icon={attachment.endsWith('.pdf') ? <PictureAsPdfIcon /> : 
                                        attachment.endsWith('.jpg') || attachment.endsWith('.png') ? <ImageIcon /> : 
                                        <InsertDriveFileIcon />}
                                  label={attachment}
                                  variant="outlined"
                                  sx={{ mr: 1, mb: 1 }}
                                  onClick={() => {/* In a real app, this would open the file */}}
                                />
                              ))}
                            </Box>
                          )}
                          <Typography variant="caption" sx={{ display: 'block', mt: 1, opacity: 0.7 }}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </Typography>
                        </BotMessageContent>
                      </BotMessage>
                    )
                  ))}
                  <div ref={messagesEndRef} />
                </MessagesContainer>
                <MessageInputContainer>
                  <Grid container spacing={1}>
                    <Grid item xs>
                      <TextField
                        fullWidth
                        placeholder="Type your message here..."
                        variant="outlined"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton>
                                <AttachFileIcon />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color={isListening ? 'secondary' : 'primary'}
                        onClick={handleVoiceInput}
                        sx={{ height: '100%', minWidth: '50px' }}
                      >
                        <MicIcon />
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSendMessage}
                        disabled={inputValue.trim() === ''}
                        sx={{ height: '100%' }}
                      >
                        <SendIcon />
                      </Button>
                    </Grid>
                  </Grid>
                </MessageInputContainer>
              </ChatContainer>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <Box sx={{ mb: 3 }}>
                <TextField
                  placeholder="Search knowledge base..."
                  variant="outlined"
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
                />
              </Box>
              <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="knowledge base table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Title</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Last Updated</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredKnowledgeBase.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell component="th" scope="row">
                          <Typography variant="body1">{item.title}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {item.description}
                          </Typography>
                        </TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{new Date(item.updatedAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Button size="small" startIcon={<InfoIcon />}>
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredKnowledgeBase.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} align="center">
                          <Typography variant="body1">No knowledge base items found</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Try adjusting your search terms
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <Typography variant="h6" gutterBottom>
                How to Use the Lab Assistant AI
              </Typography>
              <Typography variant="body1" paragraph>
                The Lab Assistant AI is designed to help you with various tasks in the textile testing laboratory. Here are some examples of what you can ask:
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <ScienceIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Test Method Assistance" 
                    secondary="Ask about creating, modifying, or finding test methods for specific materials or industries" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <BuildIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Equipment Support" 
                    secondary="Get help with calibration, maintenance, or troubleshooting laboratory equipment" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <DescriptionIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Standards Information" 
                    secondary="Find information about ASTM, ISO, or other standards relevant to your testing needs" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <EventIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Scheduling Assistance" 
                    secondary="Get help with scheduling tests, finding available equipment, or managing your calendar" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Training Support" 
                    secondary="Access training materials or get guidance on laboratory procedures and best practices" 
                  />
                </ListItem>
              </List>
              <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                You can type your questions in the chat interface or use the voice input feature by clicking the microphone button. The AI will respond with relevant information and may provide attachments like manuals, guides, or reference materials when appropriate.
              </Typography>
              <Typography variant="body1">
                For more complex needs, you can also browse the Knowledge Base tab to find detailed documentation on various topics.
              </Typography>
            </TabPanel>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <StyledCard>
            <CardHeader 
              title="Quick Actions" 
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <Divider />
            <CardContent sx={{ flexGrow: 1, p: 0 }}>
              <List>
                <ListItem button onClick={() => navigate('/test-method-builder')}>
                  <ListItemIcon>
                    <ScienceIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Create Test Method" 
                    secondary="Build a new test protocol using the drag-and-drop builder" 
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem button onClick={() => navigate('/calendar')}>
                  <ListItemIcon>
                    <EventIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Schedule Test" 
                    secondary="Add a new test to the laboratory calendar" 
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem button onClick={() => navigate('/equipment')}>
                  <ListItemIcon>
                    <BuildIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Equipment Status" 
                    secondary="Check availability and calibration status of lab equipment" 
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem button>
                  <ListItemIcon>
                    <DescriptionIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Standards Library" 
                    secondary="Browse ASTM, ISO, and other textile testing standards" 
                  />
                </ListItem>
              </List>
            </CardContent>
          </StyledCard>

          <StyledCard sx={{ mt: 3 }}>
            <CardHeader 
              title="Recent Conversations" 
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <Divider />
            <CardContent sx={{ flexGrow: 1, p: 0 }}>
              <List>
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar>
                      <ChatIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary="Instron Calibration Procedure" 
                    secondary="Yesterday at 14:32" 
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar>
                      <ChatIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary="UV Resistance Test Setup" 
                    secondary="March 20, 2025" 
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar>
                      <ChatIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary="ASTM D3776 Weight Determination" 
                    secondary="March 18, 2025" 
                  />
                </ListItem>
              </List>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Chatbot;
