import { configureStore } from "@reduxjs/toolkit";
import tracksReducer from "../Reducers/tracks";
export interface SpotState {
tracksReducer: {
  };
}
const store = configureStore({
  reducer: {
    tracksReducer
  }
});


export default store;