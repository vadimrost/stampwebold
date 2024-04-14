import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Page1 from '../components/Page1'
import Page2 from '../components/Page2'
import Page3 from '../components/Page3'
import Page4 from '../components/Page4'
import ProgressBar from '../components/ProgressBar'
import { useNavigate } from 'react-router-dom'

const OnBoarding = () => {
  const [page, setPage] = useState(1)
  const navigate = useNavigate()

  const renderPage = {
    1: <Page1 setPage={setPage} />,
    2: <Page2 setPage={setPage} />,
    3: <Page3 setPage={setPage} />,
    4: <Page4 setPage={setPage} />
  }

  useEffect(() => {
    const refreshed = sessionStorage.getItem('refreshed')

    if (refreshed) {
      // Navigate to a different page after the refresh
      navigate('/')
      // Clear the sessionStorage flag
      sessionStorage.removeItem('refreshed')
    }

    const handleRefresh = (event) => {
      if (event.type === 'beforeunload') {
        sessionStorage.setItem('refreshed', 'true')
      }
    }

    window.addEventListener('beforeunload', handleRefresh)

    return () => {
      window.removeEventListener('beforeunload', handleRefresh)
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-[#F3F5F9]">
      <Navbar />
      <div className="ml-6 mt-[80px] flex h-full max-w-[1200px] flex-1 flex-col rounded-[60px] bg-white p-10">
        {/* Header */}
        <div className="flex items-center gap-3">
          <svg height={34} width={34} viewBox="0 0 24 24" fill="#4D69FA" data-name="Material--Assignment">
            <path d="M0 0h24v24H0V0z" fill="none"></path>
            <path d="M5 5v14h14V5H5zm9 12H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" opacity="0.3"></path>
            <path d="M7 15h7v2H7zm0-4h10v2H7zm0-4h10v2H7zm12-4h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04a2.008 2.008 0 00-1.44 1.19c-.1.24-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zM19 19H5V5h14v14z"></path>
          </svg>
          <h1 className="text-2xl font-[600]">Onboarding</h1>
        </div>

        {/* Progress Bar */}
        <ProgressBar page={page} setPage={setPage} />

        {renderPage[page]}
      </div>
    </div>
  )
}

export default OnBoarding
