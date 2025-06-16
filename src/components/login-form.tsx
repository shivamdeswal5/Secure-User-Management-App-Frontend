'use client'

import React, { useState } from 'react'
import {
  TextField,
  Button,
  Box,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { loginUser, requestOtp } from '@/store/auth-slice'
import { toast } from 'react-toastify'
import { redirect } from 'next/navigation'

interface LoginFormInputs {
  email: string
  password: string
  otp?: string
}

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { loading } = useSelector((state: RootState) => state.auth)
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<LoginFormInputs>()

  const onSubmit = async (data: LoginFormInputs) => {
    const result = await dispatch(loginUser(data))

    if (loginUser.fulfilled.match(result)) {
      toast.success(result.payload.message || 'Logged in successfully')
      redirect('/profile');
    } else {
      toast.error(result.payload as string)
    }
    
  }

  const handleRequestOtp = async () => {
    const email = getValues('email')
    if (!email) {
      toast.error('Please enter your email to request OTP')
      return
    }

    const result = await dispatch(requestOtp(email))
    if (requestOtp.fulfilled.match(result)) {
      toast.success('OTP sent to your email!')
    } else {
      toast.error(result.payload as string)
    }
  }

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
      <Typography variant="h5" mb={3}>Login</Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          {...register('email', { required: 'Email is required' })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          {...register('password', { required: 'Password is required' })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <TextField
          fullWidth
          label="OTP (if not verified)"
          margin="normal"
          {...register('otp')}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>

        <Button
          variant="text"
          color="primary"
          onClick={handleRequestOtp}
          fullWidth
          sx={{ mt: 1 }}
        >
          Request OTP Again
        </Button>
      </form>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Don't have an account? <Link href="/signup">Sign up</Link>
        </Typography>
    </Box>
  )
}

export default LoginForm
