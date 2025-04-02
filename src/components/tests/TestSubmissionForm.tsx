'use client'

import { useState } from 'react'
import { Box, Button, FormControl, FormLabel, MenuItem, Select, Stack, TextField } from '@mui/material'

export interface TestFormData {
  name: string
  sampleId: string
  type: string
  status: string
  dueDate: string
  priority: string
  notes: string
}

export interface TestSubmissionFormProps {
  initialData?: TestFormData
  onSubmit: (data: TestFormData) => void
  onCancel: () => void
}

export default function TestSubmissionForm({ initialData, onSubmit, onCancel }: TestSubmissionFormProps) {
  const [formData, setFormData] = useState<TestFormData>({
    name: initialData?.name || '',
    sampleId: initialData?.sampleId || '',
    type: initialData?.type || '',
    status: initialData?.status || 'Pending',
    dueDate: initialData?.dueDate || new Date().toISOString().split('T')[0],
    priority: initialData?.priority || 'Normal',
    notes: initialData?.notes || ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Stack spacing={3}>
        <TextField
          label="Test Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          fullWidth
          required
        />

        <TextField
          label="Sample ID"
          value={formData.sampleId}
          onChange={(e) => setFormData({ ...formData, sampleId: e.target.value })}
          fullWidth
          required
        />

        <FormControl fullWidth>
          <FormLabel>Test Type</FormLabel>
          <Select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            required
          >
            <MenuItem value="Tensile">Tensile Strength</MenuItem>
            <MenuItem value="Tear">Tear Resistance</MenuItem>
            <MenuItem value="Abrasion">Abrasion Resistance</MenuItem>
            <MenuItem value="ColorFastness">Color Fastness</MenuItem>
            <MenuItem value="Dimensional">Dimensional Stability</MenuItem>
            <MenuItem value="Flammability">Flammability</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <FormLabel>Status</FormLabel>
          <Select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            required
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Failed">Failed</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Due Date"
          type="date"
          value={formData.dueDate}
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
        />

        <FormControl fullWidth>
          <FormLabel>Priority</FormLabel>
          <Select
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            required
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Normal">Normal</MenuItem>
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Urgent">Urgent</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          fullWidth
          multiline
          rows={4}
        />

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
          <Button type="button" onClick={onCancel} variant="outlined">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {initialData ? 'Update' : 'Create'} Test
          </Button>
        </Box>
      </Stack>
    </Box>
  )
}
