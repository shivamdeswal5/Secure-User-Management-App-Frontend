"use client";

import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { updateUserProfile } from "../store/profile-slice";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

type EditProfileForm = {
  firstName: string;
  lastName: string;
};

const EditProfileComponent = () => {

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { profile, loading } = useSelector((state: RootState) => state.profile);

  const [file, setFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileForm>({
    defaultValues: {
      firstName: profile?.firstName || "",
      lastName: profile?.lastName || "",
    },
  });

  const onSubmit = async (data: EditProfileForm) => {
    await dispatch(updateUserProfile({ ...data, file }));
    router.push("/profile");
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          mt: 10,
          p: 4,
          boxShadow: 3,
          borderRadius: 4,
          backgroundColor: "white",
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Edit Profile
        </Typography>

        <TextField
          fullWidth
          label="First Name"
          margin="normal"
          {...register("firstName", { required: "First name is required" })}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
        />

        <TextField
          fullWidth
          label="Last Name"
          margin="normal"
          {...register("lastName", { required: "Last name is required" })}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
        />

        <Button variant="outlined" component="label" fullWidth sx={{ mt: 2 }}>
          Upload Profile Picture
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </Button>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Update Profile"
          )}
        </Button>
      </Box>
    </Container>
  );
};

export default EditProfileComponent;
