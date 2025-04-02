'use client'

import { useState } from 'react'
import { Box, Button, DialogActions, DialogContent, Stack, TextField } from '@mui/material'
import { SelectField, MultiSelectField } from '@/components/common/FormFields'

const fiberTypes = ['Cotton', 'Polyester', 'Wool', 'Silk', 'Nylon', 'Blend']
const fabricConstructions = ['Woven', 'Knit', 'Non-woven']
const finishTypes = ['None', 'Water repellent', 'Flame retardant', 'Anti-microbial']
const testStandards = ['AATCC', 'ASTM', 'ISO', 'BS', 'EN']
const statuses = ['Pending', 'In Progress', 'Completed']

interface SampleFormData {
  name: string
  clientName: string
  type: string
  status: string
  fiberType: string
  fabricConstruction: string
  weightGSM: number
  color: string
  finishType: string
  testStandards: string[]
}

interface SampleSubmissionFormProps {
  initialData?: Partial<SampleFormData>
  onSubmit: (data: SampleFormData) => void
  onCancel: () => void
}

export default function SampleSubmissionForm({
  initialData,
  onSubmit,
  onCancel,
}: SampleSubmissionFormProps) {
  const [formData, setFormData] = useState<SampleFormData>({
    name: initialData?.name || '',
    clientName: initialData?.clientName || '',
    type: initialData?.type || '',
    status: initialData?.status || 'Pending',
    fiberType: initialData?.fiberType || '',
    fabricConstruction: initialData?.fabricConstruction || '',
    weightGSM: initialData?.weightGSM || 0,
    color: initialData?.color || '',
    finishType: initialData?.finishType || '',
    testStandards: initialData?.testStandards || [],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <DialogContent>
        <Stack spacing={3}>
          <TextField
            label="Sample Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            fullWidth
          />
          <TextField
            label="Client Name"
            value={formData.clientName}
            onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
            required
            fullWidth
          />
          <SelectField
            label="Type"
            value={formData.type}
            options={['Sample Type 1', 'Sample Type 2', 'Sample Type 3']}
            onChange={(value) => setFormData({ ...formData, type: value })}
            required
          />
          <SelectField
            label="Status"
            value={formData.status}
            options={statuses}
            onChange={(value) => setFormData({ ...formData, status: value })}
            required
          />
          <SelectField
            label="Fiber Type"
            value={formData.fiberType}
            options={fiberTypes}
            onChange={(value) => setFormData({ ...formData, fiberType: value })}
            required
          />
          <SelectField
            label="Fabric Construction"
            value={formData.fabricConstruction}
            options={fabricConstructions}
            onChange={(value) => setFormData({ ...formData, fabricConstruction: value })}
            required
          />
          <TextField
            label="Weight (GSM)"
            type="number"
            value={formData.weightGSM}
            onChange={(e) => setFormData({ ...formData, weightGSM: Number(e.target.value) })}
            required
            fullWidth
          />
          <TextField
            label="Color"
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            required
            fullWidth
          />
          <SelectField
            label="Finish Type"
            value={formData.finishType}
            options={finishTypes}
            onChange={(value) => setFormData({ ...formData, finishType: value })}
          />
          <MultiSelectField
            label="Test Standards"
            value={formData.testStandards}
            options={testStandards}
            onChange={(values) => setFormData({ ...formData, testStandards: values })}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="contained">{initialData ? 'Update' : 'Create'} Sample</Button>
      </DialogActions>
    </Box>
  )
}
