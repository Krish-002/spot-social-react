import { createSlice } from '@reduxjs/toolkit';
import { initiateGetResult } from '../Post/Result/Results';
import { TrackItem } from '../Post/Models/track';

interface TracksState {
  items: TrackItem[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: TracksState = {
  items: [],
  status: 'idle'
};

const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initiateGetResult.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(initiateGetResult.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.status = 'idle';
      })
      .addCase(initiateGetResult.rejected, (state) => {
        state.status = 'failed';
      });
  }
});

export default tracksSlice.reducer;
