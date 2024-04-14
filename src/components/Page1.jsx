import { Form, Formik } from 'formik'
import React, { useRef } from 'react'
import { page1Schema } from '../utils/schema'
import useStore from './../store/index'
import CustomTextField from './Generic/CustomTextField'
import { useNavigate } from 'react-router-dom'
import CustomSelect from './Generic/CustomSelect'

const Page1 = ({ setPage }) => {
  const data = useStore((state) => state.data)
  const fileInputRef = useRef(null)
  const setData = useStore((state) => state.setInfoData)
  const navigate = useNavigate()

  const handleDivClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e, setFieldValue) => {
    const selectedFile = e.target.files[0]
    setFieldValue('imageBlob', selectedFile)
  }

  const initialValues = {
    imageBlob: null,
    firstName: '',
    lastName: '',
    displayName: '',
    phoneNumber: null,
    email: '',
    category: '',
    ...data.info
  }

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={page1Schema}
      onSubmit={(fields) => {
        setData({ ...data, info: fields })
        setPage(2)
      }}>
      {({ errors, touched, values, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
        <Form autoComplete="off">
          <div className="my-8 flex flex-col">
            {/* Image Section */}
            <div style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }} className="flex gap-8 rounded-3xl p-8">
              <img
                src={values.imageBlob ? URL.createObjectURL(values.imageBlob) : null}
                className={`h-[114px] w-[114px] rounded-full ${values?.imageBlob ? '' : 'bg-black'}`}
                alt=""
              />
              <div className="flex flex-col justify-center gap-5">
                <div
                  style={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px' }}
                  className="flex h-[34px] cursor-pointer items-center rounded-full bg-[#F8F9FA] "
                  onClick={handleDivClick}>
                  <p className="flex h-full items-center rounded-l-full border-r-2 px-2 py-1 text-xs font-[500] hover:bg-[#efefe9]">Choose File</p>
                  <div className="w-[200px] pl-2 text-xs font-[500]">{values.imageBlob?.name ? values.imageBlob.name : 'No file choosen'}</div>
                  <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => handleFileChange(e, setFieldValue)} />
                </div>
                <div className="font-[300] text-[#797979]">Avatar helps your teammates get to know you</div>
              </div>
            </div>

            {/* Personal Info */}
            <div style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }} className="mt-8 flex flex-col gap-8 rounded-3xl p-8">
              <span className="flex w-full items-center gap-2  font-[700]">
                <svg width={32} height={32} viewBox="0 0 24 24" fill="#FFCF52" class="svg-icon--material svg-icon card-icon text-warning" data-name="Material--Edit">
                  <path d="M0 0h24v24H0V0z" fill="none"></path>
                  <path d="M5 18.08V19h.92l9.06-9.06-.92-.92z" opacity="0.3"></path>
                  <path d="M20.71 7.04a.996.996 0 000-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83zM3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19z"></path>
                </svg>
                Personal Information
              </span>
              <div className="flex flex-col ">
                <div className="flex w-full gap-4">
                  <div className="flex w-1/2 flex-col">
                    <CustomTextField
                      label="First Name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstName}
                      error={touched.firstName && Boolean(errors.firstName)}
                      helperText={touched.firstName && errors.firstName}
                      id="firstName"
                      variant="filled"
                    />
                  </div>
                  <div className="flex w-1/2 flex-col">
                    <CustomTextField
                      label="Last Name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastName}
                      error={touched.lastName && Boolean(errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                      id="lastName"
                      variant="filled"
                    />
                  </div>
                </div>
                <div className="mt-8 flex w-full flex-col">
                  <CustomTextField
                    label="Display Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.displayName}
                    error={touched.displayName && Boolean(errors.displayName)}
                    helperText={touched.displayName && errors.displayName}
                    id="displayName"
                    variant="filled"
                  />
                </div>
                <span className="mt-2 pl-[2px] text-xs text-[#797979]">This will be how your name will be displayed in the account section and in reviews</span>
              </div>
            </div>

            {/* Contact Info */}
            <div style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }} className="mt-8 flex flex-col gap-8 rounded-3xl p-8">
              <span className="flex w-full items-center gap-2  font-[700]">
                <svg width={32} height={32} viewBox="0 0 24 24" fill="#46BCAA" data-name="Material--MarkunreadMailbox">
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M10 12H6V8H4v12h16V8H10z" opacity="0.3"></path>
                  <path d="M20 6H10v2h10v12H4V8h2v4h2V4h6V0H6v6H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"></path>
                </svg>
                Contact Information
              </span>
              <div className="flex flex-col ">
                <div className="flex w-full flex-col">
                  <CustomTextField
                    label="Phone Number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="number"
                    value={values.phoneNumber}
                    error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                    id="phoneNumber"
                    variant="filled"
                  />
                </div>
                <div className="mt-8 flex w-full flex-col">
                  <CustomTextField
                    label="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    id="email"
                    variant="filled"
                  />
                </div>
              </div>
            </div>

            {/* Category */}
            <div style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }} className="mt-8 flex flex-col gap-8 rounded-3xl p-8">
              <span className="flex w-full items-center gap-2  font-[700]">
                <svg width={32} height={32} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <title>category-list-solid</title>
                  <g id="Layer_2" data-name="Layer 2">
                    <g id="invisible_box" data-name="invisible box">
                      <rect width="48" height="48" fill="none" />
                    </g>
                    <g id="icons_Q2" data-name="icons Q2">
                      <path d="M24,10h0a2,2,0,0,1,2-2H42a2,2,0,0,1,2,2h0a2,2,0,0,1-2,2H26A2,2,0,0,1,24,10Z" />
                      <path d="M24,24h0a2,2,0,0,1,2-2H42a2,2,0,0,1,2,2h0a2,2,0,0,1-2,2H26A2,2,0,0,1,24,24Z" />
                      <path d="M24,38h0a2,2,0,0,1,2-2H42a2,2,0,0,1,2,2h0a2,2,0,0,1-2,2H26A2,2,0,0,1,24,38Z" />
                      <path d="M12,2a2.1,2.1,0,0,0-1.7,1L4.2,13a2.3,2.3,0,0,0,0,2,1.9,1.9,0,0,0,1.7,1H18a2.1,2.1,0,0,0,1.7-1,1.8,1.8,0,0,0,0-2l-6-10A1.9,1.9,0,0,0,12,2Z" />
                      <path d="M12,30a6,6,0,1,1,6-6A6,6,0,0,1,12,30Z" />
                      <path d="M16,44H8a2,2,0,0,1-2-2V34a2,2,0,0,1,2-2h8a2,2,0,0,1,2,2v8A2,2,0,0,1,16,44Z" />
                    </g>
                  </g>
                </svg>
                Stamp Category
              </span>
              <div className="flex flex-col ">
                <div className="flex w-full flex-col">
                  <select
                    name="category"
                    id="category"
                    value={values.category}
                    onChange={handleChange}
                    className="h-[56px] rounded-[12px] border bg-[#F3F6F9] p-2 text-sm font-semibold focus:border-blue-500">
                    <option value="retail">Retail</option>
                    <option value="grocery">Grocery</option>
                    <option value="cafes">Cafes</option>
                    <option value="bars">Bars</option>
                    <option value="restaurants">Restaurants</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="beauty">Beauty</option>
                    <option value="pet">Pet</option>
                    <option value="pet">Sports</option>
                  </select>
                </div>
              </div>
            </div>

            <div className=" bottom-0  mt-10 flex w-full flex-1 items-center justify-between">
              <h1 onClick={() => navigate('/')} className="cursor-pointer font-bold text-[#4D69FA]">
                Previous
              </h1>
              <button type="submit" className="self-end rounded-xl bg-[#EDF0FF] px-[2rem] py-[6.5px] font-bold text-[#4D69FA]">
                Next
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default Page1
