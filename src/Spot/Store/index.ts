import { configureStore } from '@reduxjs/toolkit';
import tracksReducer from '../Reducers/tracks'; // Import your slice reducer
import authReducer from '../Reducers/authSlice'; // Import your slice reducer


const store = configureStore({
    reducer: {
      tracks: tracksReducer,
      auth: authReducer,

    },
  });
  
  // Types for RootState and AppDispatch
  export type RootState = ReturnType<typeof store.getState>;
  
  export type AppDispatch = typeof store.dispatch;
  
  export default store;