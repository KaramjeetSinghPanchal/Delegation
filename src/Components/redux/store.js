import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './dataSlice'

const store = configureStore({
  reducer: {
    data: dataReducer, // Matches the slice name in your reducer
  },
});

export default store;
