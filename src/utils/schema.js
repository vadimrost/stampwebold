import * as yup from 'yup'

export const page1Schema = yup.object({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  displayName: yup.string().required('Display Name is required'),
  phoneNumber: yup.number('Must be a number').nullable(),
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required')
})

export const page2Schema = yup.object({
  addressline: yup.string().required('Address is required')
})

export const page3Schema = yup.object({
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'), // Adding the min length validation
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export const loginSchema = yup.object({
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'), // Adding the min length validation
});
