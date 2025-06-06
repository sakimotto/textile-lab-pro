'use client'

import { useEffect, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Box, Button, Card, CardContent, CardHeader, Dialog, DialogTitle, DialogContent, IconButton, TextField, Chip } from '@mui/material'
import { Add as AddIcon, Search as SearchIcon, MoreVert as MoreVertIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'
import { useStore } from '@/lib/store'
import SampleSubmissionForm, { SampleFormData } from '@/components/samples/SampleSubmissionForm'

// Full sample interface that matches what's expected by the store
interface Sample extends SampleFormData {
  id: string
  submissionDate: string
}

// Export SampleFormData so it can be reused elsewhere
export { SampleFormData }

// Type for adding a new sample (omits id which is generated)
type NewSample = Omit<Sample, 'id'>

// Mock type to match what the store expects (if we don't have access to store.ts)
type StoreAddSampleParam = SampleFormData & { submissionDate: string }

export default function SamplesPage() {
  const { samples, loading, fetchSamples, addSample, updateSample, deleteSample } = useStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedSample, setSelectedSample] = useState<Sample | null>(null)

  useEffect(() => {
    fetchSamples()
  }, [fetchSamples])

  const handleSearch = (term: string) => {
    setSearchTerm(term)
  }

  const handleAddSample = async (formData: SampleFormData) => {
    if (selectedSample) {
      // Update existing sample
      try {
        await updateSample(selectedSample.id, {
          ...formData,
          submissionDate: selectedSample.submissionDate,
        } as Sample)
      } catch (error) {
        console.error('Error updating sample:', error)
        // You can add a UI alert here, e.g., set an error state
      }
    } else {
      // Create a new sample with required fields
      try {
        await addSample({
          ...formData,
          submissionDate: new Date().toISOString(),
        } as StoreAddSampleParam)
      } catch (error) {
        console.error('Error adding sample:', error)
        // You can add a UI alert here, e.g., set an error state
      }
    }
    setIsDialogOpen(false)
  }

  const handleOpenDialog = (sample: Sample | null) => {
    setSelectedSample(sample)
    setIsDialogOpen(true)
  }

  const handleDeleteSample = async (id: string) => {
    try {
      await deleteSample(id)
    } catch (error) {
      console.error('Error deleting sample:', error)
      // Handle error, e.g., show a message
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'warning'
      case 'In Progress':
        return 'info'
      case 'Completed':
        return 'success'
      default:
        return 'default'
    }
  }

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Sample Name', flex: 1 },
    { field: 'clientName', headerName: 'Client', flex: 1 },
    { field: 'type', headerName: 'Type', flex: 1 },
    { field: 'submissionDate', headerName: 'Submission Date', flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={getStatusColor(params.value)}
          size="small"
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleOpenDialog(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteSample(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ]

  const filteredSamples = Array.isArray(samples)
    ? samples.filter(sample =>
        Object.values(sample).some(value =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : []

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            placeholder="Search samples..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
            sx={{ mr: 2 }}
          />
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog(null)}
        >
          Add Sample
        </Button>
      </Box>

      <Card>
        <CardHeader title="Sample List" />
        <CardContent>
          <DataGrid
            rows={filteredSamples}
            columns={columns}
            loading={loading.samples}
            autoHeight
            disableRowSelectionOnClick
            pageSizeOptions={[5, 10, 25, 50]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
          />
        </CardContent>
      </Card>

      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedSample ? 'Edit Sample' : 'Add New Sample'}
        </DialogTitle>
        <DialogContent>
          <SampleSubmissionForm
            initialData={selectedSample ? {
              name: selectedSample.name,
              clientName: selectedSample.clientName,
              type: selectedSample.type,
              status: selectedSample.status,
            } : undefined}
            onSubmit={handleAddSample}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </Box>
  )
}
