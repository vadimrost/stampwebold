import { Tooltip } from '@mui/material'
import React from 'react'

const ProgressBar = ({ page, setPage }) => {
  return (
    <div className="mt-10 flex flex-col px-2">
      <div className="flex">
        <div className="flex w-full items-center">
          <Tooltip title="Account Details" className="cursor-pointer" placement="top">
            <span
              // onClick={() => {
              //   setPage(1)
              // }}
              className={`flex h-[24px] w-[24px] items-center justify-center rounded-full text-xs ${page === 1 ? 'bg-[#4D69FA] text-white' : 'bg-[#E1E3E6] hover:bg-slate-300'}`}>
              1
            </span>
          </Tooltip>
          <div className="h-[2px] flex-1 bg-[#E1E3E6]"></div>
        </div>
        <div className="flex w-full items-center">
          <Tooltip title="Address" className="cursor-pointer" placement="top">
            <span
              // onClick={() => {
              //   setPage(2)
              // }}
              className={`flex h-[24px] w-[24px] items-center justify-center rounded-full text-xs ${page === 2 ? 'bg-[#4D69FA] text-white' : 'bg-[#E1E3E6] hover:bg-slate-300'}`}>
              2
            </span>
          </Tooltip>
          <div className="h-[2px] flex-1 bg-[#E1E3E6]"></div>
        </div>
        <div className="flex w-full items-center">
          <Tooltip title="Profile Setup" className="cursor-pointer" placement="top">
            <span
              // onClick={() => {
              //   setPage(3)
              // }}
              className={`flex h-[24px] w-[24px] items-center justify-center rounded-full text-xs ${page === 3 ? 'bg-[#4D69FA] text-white' : 'bg-[#E1E3E6]'}`}>
              3
            </span>
          </Tooltip>
          <div className="h-[2px] flex-1 bg-[#E1E3E6]"></div>
        </div>
        <div className=" flex items-center">
          <Tooltip title="Preview" className="cursor-pointer" placement="top">
            <span
              // onClick={() => {
              //   setPage(3)
              // }}
              className={`flex h-[24px] w-[24px] items-center justify-center rounded-full text-xs ${page === 4 ? 'bg-[#4D69FA] text-white' : 'bg-[#E1E3E6]'}`}>
              4
            </span>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

export default ProgressBar
