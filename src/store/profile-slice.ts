import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

interface ProfileState {
  loading: boolean;
  error: string | null;
  profile: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    accountStatus: string;
    profileImg?: string;
  } | null;
}

const initialState: ProfileState = {
  loading: false,
  error: null,
  profile: null,
};

export const fetchUserProfile = createAsyncThunk(
  "profile/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:4000/users/profile", {
        withCredentials: true,
      });
      return res.data;
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to fetch profile";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "profile/updateUserProfile",
  async (
    {
      firstName,
      lastName,
      file,
    }: {
      firstName: string;
      lastName: string;
      file?: File | null;
    },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      if (file) formData.append("file", file);

      const response = await axios.patch(
        "http://localhost:4000/users/profile",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Profile update failed"
      );
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfileState(state) {
      state.error = null;
      state.profile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearProfileState } = profileSlice.actions;
export default profileSlice.reducer;
