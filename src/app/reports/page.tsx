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
import { Add as AddIcon, Close as CloseIcon, Download as DownloadIcon } from '@mui/icons-material'
import { useStore } from '@/lib/store'
import SearchBar from '@/components/common/SearchBar'

interface Report {
  id: string
  name: string
  type: string
  status: string
}

export default function ReportsPage() {
  const { reports, loading, fetchReports, addReport, updateReport, deleteReport } = useStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)

  useEffect(() => {
    fetchReports()
  }, [fetchReports])

  const handleSearch = (term: string) => {
    setSearchTerm(term)
  }

  const handleGenerateReport = () => {
    // TODO: Implement report generation
    console.log('Generating report...')
  }

  const handleDownload = (report: Report) => {
    // TODO: Implement report download
    console.log('Downloading report:', report.id)
  }

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 250 },
    { field: 'type', headerName: 'Type', width: 150 },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => (
        <Box
          sx={{
            backgroundColor:
              params.value === 'Completed'
                ? 'success.main'
                : params.value === 'In Progress'
                ? 'info.main'
                : 'warning.main',
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
          <IconButton size="small" onClick={() => handleDownload(params.row)}>
            <DownloadIcon />
          </IconButton>
          <Button size="small" color="error" onClick={() => deleteReport(params.row.id)}>
            Delete
          </Button>
        </Stack>
      ),
    },
  ]

  const filteredReports = Array.isArray(reports)
    ? reports.filter(
        (report) =>
          report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.type.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h4">Reports</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleGenerateReport}
        >
          Generate Report
        </Button>
      </Stack>

      <Paper sx={{ mb: 3, p: 2 }}>
        <SearchBar onSearch={handleSearch} />
      </Paper>

      <Paper sx={{ height: 600 }}>
        <DataGrid
          rows={filteredReports}
          columns={columns}
          loading={loading.reports}
          disableRowSelectionOnClick
          getRowId={(row) => row.id}
        />
      </Paper>
    </Box>
  )
}
