'use client'

import { useEffect, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Box, Button, Card, CardContent, CardHeader, Dialog, DialogTitle, DialogContent, IconButton, TextField, Chip } from '@mui/material'
import { Add as AddIcon, Search as SearchIcon, MoreVert as MoreVertIcon } from '@mui/icons-material'
import { useStore } from '@/lib/store'
import { ClientForm } from '@/components/clients/client-form'

interface Client {
  id: string
  name: string
  contactPerson: string
  email: string
  phone: string
  activeTests: number
  status: 'Active' | 'Inactive'
}

type ClientFormData = Omit<Client, 'id' | 'activeTests'> & {
  activeTests?: number
}

export default function ClientsPage() {
  const { clients, loading, fetchClients, addClient, updateClient, deleteClient } = useStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)

  useEffect(() => {
    fetchClients()
  }, [fetchClients])

  const handleSearch = (term: string) => {
    setSearchTerm(term)
  }

  const handleAddClient = async (formData: ClientFormData) => {
    const clientData = {
      ...formData,
      activeTests: formData.activeTests || 0,
    }
    
    if (selectedClient) {
      await updateClient(selectedClient.id, clientData)
    } else {
      await addClient(clientData)
    }
    setIsDialogOpen(false)
  }

  const handleOpenDialog = (client: Client | null) => {
    setSelectedClient(client)
    setIsDialogOpen(true)
  }

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Company Name', flex: 1 },
    { field: 'contactPerson', headerName: 'Contact Person', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'phone', headerName: 'Phone', flex: 1 },
    { field: 'activeTests', headerName: 'Active Tests', width: 120 },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === 'Active' ? 'success' : 'default'}
          size="small"
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          onClick={(e) => {
            e.stopPropagation()
            handleOpenDialog(params.row)
          }}
        >
          <MoreVertIcon />
        </IconButton>
      ),
    },
  ]

  const filteredClients = Array.isArray(clients)
    ? clients.filter(client =>
        Object.values(client).some(value =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : []

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            placeholder="Search clients..."
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
          Add Client
        </Button>
      </Box>

      <Card>
        <CardHeader title="Client List" />
        <CardContent>
          <DataGrid
            rows={filteredClients}
            columns={columns}
            loading={loading.clients}
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
          {selectedClient ? 'Edit Client' : 'Add New Client'}
        </DialogTitle>
        <DialogContent>
          <ClientForm
            initialData={selectedClient ? {
              name: selectedClient.name,
              contactPerson: selectedClient.contactPerson,
              email: selectedClient.email,
              phone: selectedClient.phone,
              status: selectedClient.status,
            } : undefined}
            onSubmit={handleAddClient}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </Box>
  )
}
