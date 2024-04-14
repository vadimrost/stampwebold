import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { page3Schema } from '../utils/schema'
import useStore from './../store/index'
import CustomTextField from './Generic/CustomTextField'

const Page3 = ({ setPage }) => {
  const data = useStore((state) => state.data)
  const setData = useStore((state) => state.setInfoData)

  const [initialValues, setInitialValues] = useState({
    password: '',
    confirmPassword: '',
    ...data.password
  })

  return (
    <div className="relative flex-1">
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={page3Schema}
        onSubmit={(fields, { resetForm }) => {
          setData({ ...data, password: fields })
          setPage(4)
        }}>
        {({ errors, touched, values, handleBlur, handleChange, handleSubmit }) => (
          <Form autoComplete="off">
            <div className="my-8 flex flex-col">
              {/* Contact Info */}
              <div style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }} className="mt-8 flex flex-col gap-8 rounded-3xl p-8">
                <span className="flex w-full items-center gap-2  font-[700]">
                  <svg width={32} height={32} viewBox="0 0 24 24" fill="#46BCAA" data-name="Material--MarkunreadMailbox">
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M10 12H6V8H4v12h16V8H10z" opacity="0.3"></path>
                    <path d="M20 6H10v2h10v12H4V8h2v4h2V4h6V0H6v6H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"></path>
                  </svg>
                  Password
                </span>
                <div className="flex flex-col ">
                  <div className="flex w-full flex-col">
                    <CustomTextField
                      label="Password"
                      type="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                      id="password"
                      variant="filled"
                    />
                  </div>
                  <div className="mt-8 flex w-full flex-col">
                    <CustomTextField
                      label="Confirm Password"
                      type="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confirmPassword}
                      error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                      helperText={touched.confirmPassword && errors.confirmPassword}
                      id="confirmPassword"
                      variant="filled"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0  mt-8 flex w-full flex-1 items-center justify-between">
                <h1 onClick={() => setPage(2)} className="cursor-pointer font-bold text-[#4D69FA]">
                  Previous
                </h1>
                <button onClick={handleSubmit} type="submit" className="self-end rounded-xl bg-[#EDF0FF] px-[2rem] py-[6.5px] font-bold text-[#4D69FA]">
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

export default Page3
