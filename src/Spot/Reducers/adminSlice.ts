// Import statements
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import Admin from "../Interfaces/Admin"; // Use or adjust this import path to your Admin interface if different
import * as client from '../Admin/client'; // Import your client functions
// Define the type for the initial state for admin
interface AdminState {
  admin: Admin | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state for the admin slice
const initialState: AdminState = {
  admin: null,
  status: 'idle',
  error: null
};

// Create an asynchronous thunk for admin authentication
export const authenticateAdmin = createAsyncThunk<
Admin,  // Return type on fulfillment
  Pick<Admin, 'username' | 'password'>,  // Argument type
  { rejectValue: string }  // Type for error handling
>(
  'admin/authenticateAdmin',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await client.adminSignin(credentials); // Ensure you have a specific admin signin function
      return response;  // Assuming that client.adminSignin returns an Admin object
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Unable to login');
    }
  }
);

// Create the admin slice
const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdmin(state, action: PayloadAction<Admin | null>) {
      state.admin = action.payload;
    },
    logoutAdmin(state) {
      state.admin = null;
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateAdmin.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(authenticateAdmin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.admin = action.payload;
        state.error = null;
      })
      .addCase(authenticateAdmin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
        state.admin = null;
      });
  }
});

// Export actions and the reducer
export const { logoutAdmin, setAdmin } = adminSlice.actions;
export default adminSlice.reducer;
