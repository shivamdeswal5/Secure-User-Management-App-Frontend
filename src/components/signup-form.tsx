'use client'

import React from 'react'
import { TextField, Button, Box, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store/store'
import { signupUser } from '../store/auth-slice'
import { toast } from 'react-toastify'
import { redirect } from 'next/navigation'

import Link from 'next/link'

type SignupFormInputs = {
  firstName: string
  lastName: string
  email: string
  password: string
}

const SignupForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>()

  const onSubmit = async (data: SignupFormInputs) => {
    const result = await dispatch(signupUser(data))
    if (signupUser.fulfilled.match(result)) {
      toast.success('OTP sent to your email!');
      redirect('/login');
    } else {
      toast.error(result.payload as string)
    }
  }

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
      <Typography variant="h5" mb={3}>Sign Up</Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          fullWidth
          label="First Name"
          {...register('firstName', { required: 'First name is required' })}
          margin="normal"
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
        />

        <TextField
          fullWidth
          label="Last Name"
          {...register('lastName', { required: 'Last name is required' })}
          margin="normal"
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
        />

        <TextField
          fullWidth
          label="Email"
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' },
          })}
          margin="normal"
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 6, message: 'Minimum 6 characters' },
          })}
          margin="normal"
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Button type="submit" variant="contained" fullWidth disabled={loading} sx={{ mt: 2 }}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </Button>
      </form>
       <Box mt={2}>
        <Typography variant="body2">
          Already have an account?{' '}
          <Link href="/login" style={{ color: '#1976d2', textDecoration: 'underline' }}>
            Login here
          </Link>
        </Typography>
      </Box>
    </Box>
  )
}

export default SignupForm
