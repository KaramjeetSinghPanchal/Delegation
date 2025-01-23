import {createSlice} from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'data',
  initialState: {items: []},
  reducers: {
    setResultData: (state, action) => {
      console.warn("action===>",action);
      
      state.items = action.payload;
    },
    setListingData: (state, action) => {
      
      state.items = action.payload;
    },
    setuserData: (state, action) => {
      
      state.items = action.payload;
    },
  },
});

export const {setResultData,setListingData,setuserData} = dataSlice.actions;
export default dataSlice.reducer;
