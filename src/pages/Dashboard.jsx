import React, { useEffect } from 'react'
import useStore from '../store'

const Dashboard = () => {
  const data = useStore((state) => state.user)
  const setData = useStore((state) => state.setUserData)

  const logout = () => {
    setData({})
  }

  return (
    <div className='flex justify-between p-10'>
      <div>Dashboard</div>
      <div onClick={logout} className="cursor-pointer">Logout</div>
    </div>
  )
}

export default Dashboard