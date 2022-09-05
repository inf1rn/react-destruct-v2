import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    image: null as File | null
}

export const newUserSlice = createSlice({
    name: "newUser",
    initialState,
    reducers: {
        setImageFile(state, action: PayloadAction<{ file: File | null }>) {
            state.image = action.payload.file
        }
    }
})

export const { setImageFile } = newUserSlice.actions