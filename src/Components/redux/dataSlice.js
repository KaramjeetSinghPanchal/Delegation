import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [], // Initial state for your data
  total: 0,
  currentPage: 1,
  hasMoreData: true,
  loading: false,
  error: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    appendData: (state, action) => {
      
      state.data = [...state.data, ...action.payload];
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setHasMoreData: (state, action) => {
      state.hasMoreData = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Export actions
export const {
  setData,
  appendData,
  setTotal,
  setCurrentPage,
  setHasMoreData,
  setLoading,
  setError,
} = dataSlice.actions;

// Export reducer
export default dataSlice.reducer; // This is your `dataReducer`
