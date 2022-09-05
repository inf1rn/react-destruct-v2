import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    form: {
        email: "",
        password: ""
    }
}

export const registrationSlice = createSlice({
    name: "registration",
    initialState,
    reducers: {
        setPassword(state, action: PayloadAction<{ password: string }>) {
            state.form.password = action.payload.password
        },
        setEmail(state, action: PayloadAction<{ email: string }>) {
            state.form.email = action.payload.email
        }
    }
})

export const { setEmail, setPassword } = registrationSlice.actions
export const registrationReducer = registrationSlice.reducer