import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export const accountSlice = createSlice({
    name: "account",
    initialState: {
        jwt: "" 
    },
    reducers: {
        setJwt(state, action: PayloadAction<{ jwt: string }>) {
            state.jwt = action.payload.jwt
        }
    }
})

export const { setJwt } = accountSlice.actions
export const accountReducer = accountSlice.reducer