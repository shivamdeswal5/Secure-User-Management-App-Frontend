'use client'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store/store'
import { fetchUserProfile } from '../store/profile-slice'
import { Box, Typography, Button, Avatar, CircularProgress } from '@mui/material'
import { useRouter } from 'next/navigation'
import defaultProfile from '../assets/profile.jpg'
import { logoutUser } from '../store/auth-slice'
import { redirect } from 'next/navigation';

const ProfileComponent = () => {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const { loading, error, profile } = useSelector((state: RootState) => state.profile)

  useEffect(() => {
    dispatch(fetchUserProfile())
  }, [dispatch])

  const handleEdit = () => {
    redirect('/edit-profile');
  }

  const handleLogout = () => {
    dispatch(logoutUser())
    router.push('/login')
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box mt={10} textAlign="center">
        <Typography color="error">{error}</Typography>
      </Box>
    )
  }

  return (
    <Box
      maxWidth={400}
      mx="auto"
      mt={10}
      p={4}
      bgcolor="white"
      boxShadow={3}
      borderRadius={4}
    >
      <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
        User Profile
      </Typography>

      <Box display="flex" justifyContent="center" mb={3}>
        <Avatar
          src={profile?.profileImg || defaultProfile.src}
          alt="Profile"
          sx={{ width: 100, height: 100 }}
        />
      </Box>

      <Box textAlign="center" mb={2}>
        <Typography><b>Name:</b> {profile?.firstName || profile?.lastName ? `${profile?.firstName ?? ''} ${profile?.lastName ?? ''}` : 'N/A'}</Typography>
        <Typography><b>Email:</b> {profile?.email || 'N/A'}</Typography>
        <Typography>
          <b>Status:</b>{' '}
          <span style={{ color: profile?.accountStatus === 'verified' ? 'green' : 'orange' }}>
            {profile?.accountStatus || 'Unverified'}
          </span>
        </Typography>
      </Box>

      <Box display="flex" justifyContent="center" gap={2} mt={3}>
        <Button variant="contained" color="primary" onClick={handleEdit}>
          Edit Profile
        </Button>
        <Button variant="outlined" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Box>
  )
}

export default ProfileComponent
