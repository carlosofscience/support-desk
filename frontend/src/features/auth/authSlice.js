import { createSlice, createAysncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message:''
}


export const authSlice = createSlice({
  name:'auth',
  initialState,
  reducers: {},
  extraReducers: (builder)=>{ //to add cases


  }
})

export default authSlice.reducer