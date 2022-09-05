import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export const appSlice = createSlice({
    name: "app",
    initialState: {
        initialized: false,
        moderate: false
    },
    reducers: {
        setInitialized(state, action: PayloadAction<{ initialized: boolean }>) {
            state.initialized = action.payload.initialized
        },
        setModerate(state, action: PayloadAction<{moderate: boolean}>){
            state.moderate = action.payload.moderate
        }
    }
})

export const { setInitialized, setModerate } = appSlice.actions
export const appReducer = appSlice.reducer