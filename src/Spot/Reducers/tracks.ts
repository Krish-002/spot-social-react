import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initiateGetResult } from '../Post/Result/Results';
import { TrackItem } from '../Post/Models/track';

interface TracksState {
  items: TrackItem[];
  status: 'idle' | 'loading' | 'failed';
  selectedTrack: TrackItem | null;  // Add a field for the selected track

}

const initialState: TracksState = {
  items: [],
  status: 'idle',
  selectedTrack: null

};

const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setSelectedTrack(state, action: PayloadAction<TrackItem>) {
      state.selectedTrack = action.payload;
    },
    clearSelectedTrack(state) {
      state.selectedTrack = null;
    },
  },
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
export const { setSelectedTrack, clearSelectedTrack } = tracksSlice.actions;
export default tracksSlice.reducer;
