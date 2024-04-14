import { TextField } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'
import React from 'react'

const StyledTextField = styled((props) => <TextField InputProps={{ disableUnderline: true }} {...props} />)(({ theme }) => ({
  '& .MuiFilledInput-root': {
    overflow: 'hidden',
    borderRadius: 12,
    height: 50,
    backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
    border: '1px solid',
    borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
    transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
    '&:hover': {
      backgroundColor: 'transparent'
    },
    '&.Mui-focused': {
      backgroundColor: 'transparent',
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main
    },
    '&.Mui-error': {
      borderColor: theme.palette.error.main,
      boxShadow: `${alpha(theme.palette.error.main, 0.25)} 0 0 0 2px`
    },
    fontSize: '14px',
    fontWeight: '600',
    '&.MuiOutlinedInput-notchedOutline': { fontSize: '10px' }
  },
  '& .MuiFormHelperText-root': {
    marginLeft: '1px'
  },
  '& .MuiInputLabel-root': {
    fontSize: 14,
    fontWeight: '500'
  }
}))

const CustomTextField = ({ onChange, onBlur, value, error, helperText, ...props }) => {
  return <StyledTextField sx={{ overflow: 'hidden' }} onChange={onChange} onBlur={onBlur} value={value} error={error} helperText={helperText} {...props} />
}

export default CustomTextField
