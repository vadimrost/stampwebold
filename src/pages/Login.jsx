import React, { useState } from 'react'
import CustomTextField from '../components/Generic/CustomTextField'
import { loginSchema } from '../utils/schema'
import { Form, Formik } from 'formik'
import loader from './../assets/loader.svg'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../utils/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import useStore from '../store'

const Login = () => {
  const [initialValues, setInitialValues] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const setData = useStore((state) => state.setUserData)

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      const result = await signInWithEmailAndPassword(auth, data.email, data.password);
      const userRef = doc(db, "web-users", result.user.uid);
      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        userData.id = result.user.uid
        localStorage.setItem('userData', JSON.stringify({ userData }));

        setData(userData)
        navigate('/dashboard')
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div className='bg-[#1F2128] py-10 flex justify-center items-center h-screen'>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={async (fields, { resetForm }) => {
          handleSubmit(fields);
        }}>
        {({ errors, touched, values, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
          <Form autoComplete="off" className='flex flex-col items-center w-[427px] h-full rounded-3xl bg-white px-6'>
            <h1 className="text-4xl font-semibold leading-[54.66px] mt-[58px]">Stamps</h1>
            <h1 className='mt-20 font-bold text-2xl'>Welcome,</h1>
            <h1 className='text-lg'>Sign in to continue</h1>
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
            <div className="mt-8  flex w-full flex-col">
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
            <button type="submit" className="flex justify-center items-center mt-10 rounded-xl bg-[#EDF0FF] w-full h-[47px] font-bold text-[#4D69FA]">
              {loading ? <img className="h-[25px] w-[25px]" src={loader} alt="loader" /> : 'Login'}
            </button>
          </Form>)}
      </Formik>
    </div>
  )
}

export default Login