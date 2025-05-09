'use client'

import { useState } from 'react'
import { Task, TaskFormValues, TASK_PRIORITIES, TASK_STATUSES } from '@/lib/schemas/task'
import { 
  Box, 
  Button, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  FormHelperText,
  Stack,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Autocomplete,
  CircularProgress
} from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import CloseIcon from '@mui/icons-material/Close'
import SaveIcon from '@mui/icons-material/Save'
import { format } from 'date-fns'

interface TaskFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (task: TaskFormValues) => void
  initialValues?: Partial<Task>
  title?: string
}

export default function TaskForm({ 
  open, 
  onClose, 
  onSubmit, 
  initialValues,
  title = 'Add New Task'
}: TaskFormProps) {
  const [values, setValues] = useState<TaskFormValues>({
    title: initialValues?.title || '',
    description: initialValues?.description || '',
    status: initialValues?.status || 'Todo',
    priority: initialValues?.priority || 'Medium',
    dueDate: initialValues?.dueDate || '',
    assignedTo: initialValues?.assignedTo || '',
    relatedSampleId: initialValues?.relatedSampleId || '',
    tags: initialValues?.tags || []
  })
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [tagInput, setTagInput] = useState('')
  const [loading, setLoading] = useState(false)
  
  const handleChange = (field: keyof TaskFormValues, value: any) => {
    setValues({ ...values, [field]: value })
    // Clear error when field is edited
    if (errors[field]) {
      const newErrors = { ...errors }
      delete newErrors[field]
      setErrors(newErrors)
    }
  }
  
  const handleSubmit = () => {
    // Basic validation
    const newErrors: Record<string, string> = {}
    
    if (!values.title.trim()) {
      newErrors.title = 'Title is required'
    } else if (values.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters'
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    setLoading(true)
    onSubmit(values)
    onClose()
    setLoading(false)
  }
  
  const handleAddTag = () => {
    if (tagInput.trim() && !values.tags.includes(tagInput.trim())) {
      handleChange('tags', [...values.tags, tagInput.trim()])
      setTagInput('')
    }
  }
  
  const handleDeleteTag = (tagToDelete: string) => {
    handleChange('tags', values.tags.filter(tag => tag !== tagToDelete))
  }
  
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {title}
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <TextField
            label="Task Title"
            value={values.title}
            onChange={(e) => handleChange('title', e.target.value)}
            fullWidth
            error={!!errors.title}
            helperText={errors.title}
            required
          />
          
          <TextField
            label="Description"
            value={values.description}
            onChange={(e) => handleChange('description', e.target.value)}
            fullWidth
            multiline
            rows={3}
          />
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={values.status}
                label="Status"
                onChange={(e) => handleChange('status', e.target.value)}
              >
                {TASK_STATUSES.map(status => (
                  <MenuItem key={status} value={status}>{status}</MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                value={values.priority}
                label="Priority"
                onChange={(e) => handleChange('priority', e.target.value)}
              >
                {TASK_PRIORITIES.map(priority => (
                  <MenuItem key={priority} value={priority}>{priority}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Due Date"
              value={values.dueDate ? new Date(values.dueDate) : null}
              onChange={(newValue) => {
                handleChange('dueDate', newValue ? format(newValue, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx") : '')
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: 'outlined'
                }
              }}
            />
          </LocalizationProvider>
          
          <TextField
            label="Related Sample ID"
            value={values.relatedSampleId}
            onChange={(e) => handleChange('relatedSampleId', e.target.value)}
            fullWidth
            placeholder="e.g., TL-2023-45"
          />
          
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Tags
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
              {values.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => handleDeleteTag(tag)}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleAddTag()
                  }
                }}
                placeholder="Add a tag"
                size="small"
                fullWidth
              />
              <Button 
                variant="outlined" 
                onClick={handleAddTag}
                disabled={!tagInput.trim()}
                sx={{
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: 2
                  }
                }}
              >
                Add
              </Button>
            </Box>
          </Box>
        </Stack>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          type="submit"
          variant="contained" 
          startIcon={<SaveIcon />}
          onClick={handleSubmit}
          sx={{
            mt: 2,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-1px)',
              boxShadow: 2
            }
          }}
        >
          {loading ? <CircularProgress size={24} /> : 'Save Task'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
