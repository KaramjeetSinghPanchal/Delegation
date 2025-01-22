import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './dataSlice'; // Import the correct reducer here

const store = configureStore({
  reducer: {
    data: dataReducer, // Assign the slice reducer to the `data` key in the store
  },
});

export default store;
