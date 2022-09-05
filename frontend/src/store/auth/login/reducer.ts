import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
    name: "login",
    initialState: {},
    reducers: {
         
    }
})

export const loginReducer = loginSlice.reducer
export const loginActions = loginSlice.actions