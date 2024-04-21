import { createAsyncThunk } from '@reduxjs/toolkit';


import {
    SET_TRACK,
    ADD_TRACK,
  } from '../Utils/Constants';

  import { get } from '../Utils/Api';
  export const setTracks = (track : any) => ({
    type: SET_TRACK,
    track
  });
  export const addTracks = (track : any) => ({
    type: ADD_TRACK,
    track
  });

  export const initiateGetResult = createAsyncThunk(
    'tracks/getResult',
    async (searchTerm: string, { rejectWithValue }) => {
      try {
        const API_URL = `https://api.spotify.com/v1/search?query=${encodeURIComponent(searchTerm)}&type=track`;
        const response = await get(API_URL); // Changed from fetch to axios
        console.log('response', response.tracks);
        return response.tracks;  // Assuming 'data.tracks' contains the track data
      } catch (error) {
        console.error('Error fetching data:', error);
        return rejectWithValue('Failed to fetch tracks');
      }
    }
  );