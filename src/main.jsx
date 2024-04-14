import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { router } from './routes/routes'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material'
import { Toaster } from 'react-hot-toast'

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif'
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Poppins, sans-serif';
        }
      `
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  </React.StrictMode>
)
