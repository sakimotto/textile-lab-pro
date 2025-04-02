'use client'

import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material'
import { useStore } from '@/lib/store'
import TestSubmissionForm, { TestFormData } from '@/components/tests/TestSubmissionForm'
import SearchBar from '@/components/common/SearchBar'

interface Test {
  id: string
  name: string
  sampleId: string
  type: string
  status: string
  dueDate: string
  priority: string
  notes: string
}

export default function TestsPage() {
  const { tests, loading, fetchTests, addTest, updateTest, deleteTest } = useStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedTest, setSelectedTest] = useState<Test | null>(null)

  useEffect(() => {
    fetchTests()
  }, [fetchTests])

  const handleSearch = (term: string) => {
    setSearchTerm(term)
  }

  const handleAddTest = async (formData: TestFormData) => {
    if (selectedTest) {
      await updateTest(selectedTest.id, formData)
    } else {
      await addTest(formData)
    }
    setIsDialogOpen(false)
  }

  const handleOpenDialog = (test: Test | null) => {
    setSelectedTest(test)
    setIsDialogOpen(true)
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'success.main'
      case 'in progress':
        return 'info.main'
      case 'failed':
        return 'error.main'
      default:
        return 'warning.main'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'urgent':
        return 'error.main'
      case 'high':
        return 'warning.main'
      case 'normal':
        return 'info.main'
      default:
        return 'success.main'
    }
  }

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Test Name', width: 200 },
    { field: 'sampleId', headerName: 'Sample ID', width: 130 },
    { field: 'type', headerName: 'Test Type', width: 150 },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => (
        <Box
          sx={{
            backgroundColor: getStatusColor(params.value),
            color: 'white',
            px: 1,
            py: 0.5,
            borderRadius: 1,
            fontSize: '0.875rem',
          }}
        >
          {params.value}
        </Box>
      ),
    },
    { field: 'dueDate', headerName: 'Due Date', width: 130 },
    {
      field: 'priority',
      headerName: 'Priority',
      width: 130,
      renderCell: (params) => (
        <Box
          sx={{
            backgroundColor: getPriorityColor(params.value),
            color: 'white',
            px: 1,
            py: 0.5,
            borderRadius: 1,
            fontSize: '0.875rem',
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 130,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button size="small" onClick={() => handleOpenDialog(params.row)}>
            Edit
          </Button>
          <Button size="small" color="error" onClick={() => deleteTest(params.row.id)}>
            Delete
          </Button>
        </Stack>
      ),
    },
  ]

  const filteredTests = Array.isArray(tests) 
    ? tests.filter(
        (test) =>
          test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          test.sampleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          test.type.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h4">Tests</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog(null)}
        >
          Add Test
        </Button>
      </Stack>

      <Paper sx={{ mb: 3, p: 2 }}>
        <SearchBar onSearch={handleSearch} />
      </Paper>

      <Paper sx={{ height: 600 }}>
        <DataGrid
          rows={filteredTests}
          columns={columns}
          loading={loading.tests}
          disableRowSelectionOnClick
          getRowId={(row) => row.id}
        />
      </Paper>

      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h6">{selectedTest ? 'Edit Test' : 'Add New Test'}</Typography>
            <IconButton onClick={() => setIsDialogOpen(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <TestSubmissionForm
            initialData={selectedTest || undefined}
            onSubmit={handleAddTest}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </Box>
  )
}
