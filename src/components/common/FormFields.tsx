import { MenuItem, Select, SelectChangeEvent, FormControl, InputLabel, Chip, Box } from '@mui/material'

interface SelectFieldProps {
  label: string
  value: string
  options: string[]
  onChange: (value: string) => void
  required?: boolean
}

export function SelectField({ label, value, options, onChange, required }: SelectFieldProps) {
  return (
    <FormControl fullWidth required={required}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        label={label}
        onChange={(e: SelectChangeEvent) => onChange(e.target.value)}
      >
        {options.map(option => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

interface MultiSelectFieldProps {
  label: string
  value: string[]
  options: string[]
  onChange: (values: string[]) => void
}

export function MultiSelectField({ label, value, options, onChange }: MultiSelectFieldProps) {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        value={value}
        label={label}
        onChange={(e: SelectChangeEvent<string[]>) => onChange(e.target.value as string[])}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
