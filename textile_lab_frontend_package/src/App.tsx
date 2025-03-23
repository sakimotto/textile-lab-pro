import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import TestMethods from './pages/TestMethods';
import TestMethodBuilder from './pages/TestMethodBuilder';
import Calendar from './pages/Calendar';
import JobDetails from './pages/JobDetails';
import Equipment from './pages/Equipment';
import Chatbot from './pages/Chatbot';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="test-methods" element={<TestMethods />} />
            <Route path="test-method-builder" element={<TestMethodBuilder />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="jobs/:jobId" element={<JobDetails />} />
            <Route path="equipment" element={<Equipment />} />
            <Route path="chatbot" element={<Chatbot />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
