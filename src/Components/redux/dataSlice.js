import {createSlice} from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'data',
  initialState: {items: []},
  reducers: {
    setResultData: (state, action) => {  
      state.items = action.payload;
    },
    setListingData: (state, action) => {
      
      state.listingDataa = action.payload;
    },
    setuserData: (state, action) => {
      
      state.userData = action.payload;
    },
    setExapmle: (state, action) => {
      state.exapmle = action.payload + 1; // Rule: Add 1 to whatever number is sent
    },
    setlanguages: (state = 'ENGLISH',action)=>{
         state.language = action.payload;
    }
  },
});

export const {setResultData,setListingData,setuserData,setExapmle,setlanguages} = dataSlice.actions;
export default dataSlice.reducer;

