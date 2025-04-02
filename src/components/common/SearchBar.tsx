'use client'

import { useState, useEffect } from 'react'
import { Box, TextField, InputAdornment } from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'

interface SearchBarProps {
  onSearch: (term: string) => void
  placeholder?: string
  debounceMs?: number
}

export default function SearchBar({ 
  onSearch, 
  placeholder = 'Search...', 
  debounceMs = 300 
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm)
    }, debounceMs)

    return () => clearTimeout(timer)
  }, [searchTerm, onSearch, debounceMs])

  return (
    <Box>
      <TextField
        fullWidth
        placeholder={placeholder}
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
  )
}
