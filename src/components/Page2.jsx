import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { page2Schema } from '../utils/schema'
import useStore from './../store/index'
import CustomTextField from './Generic/CustomTextField'

const Page2 = ({ setPage }) => {
  const data = useStore((state) => state.data)
  const setData = useStore((state) => state.setInfoData)
  const [open, setOpen] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [isSelected, setSelected] = useState(false)
  const [initialValues, setInitialValues] = useState({
    addressline: '',
    addressline2: '',
    city: '',
    state: '',
    zip: '',
    lat: '',
    lng: '',
    ...data.address
  })

  const fetchSuggestions = async (inputValue) => {
    try {
      const response = await fetch(`https://us-central1-stamp-2c915.cloudfunctions.net/getPlaceSuggestions?inputQuery=${inputValue.target.value}`, {
        method: 'GET'
      })
      const data = await response.json()
      setSuggestions(data.results)
    } catch (error) {
      console.error('Error fetching suggestions:', error)
    }
  }

  const fetchLatlng = async (inputValue) => {
    try {
      const response = await fetch(`https://us-central1-stamp-2c915.cloudfunctions.net/getLatLng?address=${inputValue}`, {
        method: 'GET'
      })
      if (!response.ok) {
        throw new Error('Network response was not ok.')
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching suggestions:', error)
    }
  }

  return (
    <div className="relative flex-1">
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={page2Schema}
        onSubmit={async (fields, { resetForm }) => {
          if ((!fields.lat || !fields.lng) && !isSelected) {
            let data = await fetchLatlng(fields.addressline)
            if (!data) {
              return toast.error('Address not found in Google. Select from the suggestions or enter valid address', {
                duration: 4000
              })
            } else {
              console.log(data)
              let newFields = {
                ...fields,
                lat: data?.lat,
                lng: data?.lng
              }
              setData({ ...data, address: newFields })
              setPage(3)
            }
          } else {
            setData({ ...data, address: fields })
            setPage(3)
          }
        }}>
        {({ errors, touched, values, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
          <Form onClick={() => console.log(values)} autoComplete="off">
            <div className="my-8 flex flex-col">
              {/* Contact Info */}
              <div style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }} className="mt-8 flex flex-col gap-8 rounded-3xl p-8">
                <span className="flex w-full items-center gap-2  font-[700]">
                  <svg width={32} height={32} viewBox="0 0 24 24" fill="#46BCAA" data-name="Material--MarkunreadMailbox">
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M10 12H6V8H4v12h16V8H10z" opacity="0.3"></path>
                    <path d="M20 6H10v2h10v12H4V8h2v4h2V4h6V0H6v6H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"></path>
                  </svg>
                  Address
                </span>
                <div className="flex flex-col ">
                  <div className="relative flex w-full flex-col">
                    <CustomTextField
                      label="Address Line"
                      onChange={(e) => {
                        handleChange(e)
                        !open && setOpen(true)
                        fetchSuggestions(e)
                      }}
                      onBlur={(e) => {
                        handleBlur(e)
                        // fetchLatlng(values.addressline)
                        setOpen(false)
                      }}
                      value={values.addressline}
                      error={touched.addressline && Boolean(errors.addressline)}
                      helperText={touched.addressline && errors.addressline}
                      id="addressline"
                      variant="filled"
                    />
                    {open && suggestions.length > 0 && (
                      <div
                        style={{
                          boxShadow: '4px 4px 6px 0px rgba(55, 48, 163, 0.20)'
                        }}
                        className="absolute top-[55px] z-[1000] flex max-h-[220px] w-full flex-col divide-y-2 divide-[#eae9e9] overflow-auto rounded-lg border border-blue-500 bg-white p-2">
                        {suggestions.map((v, i) => (
                          <div
                            onMouseDown={() => {
                              setFieldValue('addressline', v.formatted_address)
                              setFieldValue('lat', v.geometry.location.lat)
                              setFieldValue('lng', v.geometry.location.lng)
                              setSelected(true)
                            }}
                            className="flex flex-col gap-1 px-1  py-2 hover:cursor-pointer hover:bg-[#f9f7f7]"
                            key={i}>
                            <div className="text-sm font-[600] text-blue-500">{v.name}</div>
                            <div className="text-xs font-semibold ">{v.formatted_address}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="mt-8 flex w-full flex-col">
                    <CustomTextField
                      label="Address Line 2"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.addressline2}
                      error={touched.addressline2 && Boolean(errors.addressline2)}
                      helperText={touched.addressline2 && errors.addressline2}
                      id="addressline2"
                      variant="filled"
                    />
                  </div>
                  <div className="mt-8 flex gap-8">
                    <CustomTextField
                      className="w-1/2"
                      label="City"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.city}
                      error={touched.city && Boolean(errors.city)}
                      helperText={touched.city && errors.city}
                      id="city"
                      variant="filled"
                    />
                    <div className="flex w-1/2 gap-4">
                      <CustomTextField
                        label="State"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.state}
                        error={touched.state && Boolean(errors.state)}
                        helperText={touched.state && errors.state}
                        className="w-1/2"
                        id="state"
                        variant="filled"
                      />
                      <CustomTextField
                        className="w-1/2"
                        label="ZIP"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.zip}
                        error={touched.zip && Boolean(errors.zip)}
                        helperText={touched.zip && errors.zip}
                        id="zip"
                        variant="filled"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0  mt-8 flex w-full flex-1 items-center justify-between">
                <h1
                  onClick={() => {
                    setPage(1)
                  }}
                  className="cursor-pointer font-bold text-[#4D69FA]">
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
    </div>
  )
}

export default Page2
