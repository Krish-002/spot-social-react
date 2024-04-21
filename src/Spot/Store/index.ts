import { configureStore } from '@reduxjs/toolkit';
import tracksReducer from '../Reducers/tracks'; // Import your slice reducer


const store = configureStore({
    reducer: {
      tracks: tracksReducer,
    },
  });
  
  // Types for RootState and AppDispatch
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;
  
  export default store;