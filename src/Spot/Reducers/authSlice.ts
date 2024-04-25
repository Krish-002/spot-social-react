// Import statements
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as client from '../Login/client'; // Adjust this import path to match where your login client functions are defined
import User from "../Interfaces/User"; // Adjust this import path to your User interface

// Define the type for the initial state
interface AuthState {
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state for the auth slice
const initialState: AuthState = {
  user: null,
  status: 'idle',
  error: null
};

// Create an asynchronous thunk for user authentication
export const authenticateUser = createAsyncThunk<
  User,  // Return type on fulfillment
  Pick<User, 'username' | 'password'>,  // Argument type
  { rejectValue: string }  // Type for error handling
>(
  'auth/authenticateUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await client.signin(credentials);
      return response;  // Assuming that client.signin returns a User object
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Unable to login');
    }
  }
);

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to manually set the user (for use in scenarios like refreshing the user data without a new login)
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    // Action to log out the user
    logoutUser(state) {
      state.user = null;
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = null;
        state.user = null;
      });
  }
});

// Export actions and the reducer
export const { logoutUser, setUser } = authSlice.actions;
export default authSlice.reducer;
